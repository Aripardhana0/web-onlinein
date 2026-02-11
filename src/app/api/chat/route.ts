import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // The n8n Webhook URL provided by the user
        const N8N_WEBHOOK_URL = "https://n8n.qti.co.id/webhook/887dcf38-defb-4249-8d73-8119ccde4a27";

        // Forward the request to n8n from the SERVER (bypasses CORS)
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `n8n responded with status: ${response.status}` },
                { status: response.status }
            );
        }

        // Get JSON response from n8n (if any)
        // If n8n returns text/plain, handle that too? 
        // Usually "Respond to Webhook" sends JSON.
        // Read the raw text first
        const rawText = await response.text();
        console.log("n8n Raw Response:", rawText); // Log for debugging

        let data = {};
        try {
            // Try parsing as JSON first
            const n8nJson = JSON.parse(rawText);

            // Normalize the response for the frontend
            // If n8n sends { "output": "..." }, map it to { "text": "..." }
            if (n8nJson.output) {
                data = { text: n8nJson.output };
            } else if (n8nJson.text) {
                data = { text: n8nJson.text };
            } else if (n8nJson.message) {
                data = { text: n8nJson.message };
            } else {
                // If valid JSON but unknown structure, send it as is (or stringify it)
                data = n8nJson;
            }
        } catch (e) {
            // If it fails (it's raw text), just wrap it in our object structure.
            // This is Expected Behavior for "Respond With: Text" mode in n8n.
            console.log("Received raw text from n8n. Wrapping as JSON.");
            data = { text: rawText };
        }

        return NextResponse.json(data);

    } catch (error) {
        console.error("API Proxy Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
