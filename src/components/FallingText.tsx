"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

export function FallingText() {
    const sceneRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const renderRef = useRef<Matter.Render | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);

    useEffect(() => {
        if (!sceneRef.current) return;

        // Module aliases
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint,
            Events = Matter.Events;

        // Create engine
        const engine = Engine.create();
        const world = engine.world;
        engineRef.current = engine;

        // Container dimensions
        const width = sceneRef.current.clientWidth;
        const height = sceneRef.current.clientHeight;

        // Create renderer
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width,
                height,
                background: "transparent",
                wireframes: false,
                pixelRatio: window.devicePixelRatio,
            },
        });
        renderRef.current = render;

        // Boundaries
        const ground = Bodies.rectangle(width / 2, height + 60, width, 120, {
            isStatic: true,
            render: { fillStyle: "transparent" }
        });
        const leftWall = Bodies.rectangle(-60, height / 2, 120, height, {
            isStatic: true,
            render: { fillStyle: "transparent" }
        });
        const rightWall = Bodies.rectangle(width + 60, height / 2, 120, height * 2, {
            isStatic: true,
            render: { fillStyle: "transparent" }
        });

        Composite.add(world, [ground, leftWall, rightWall]);

        // Falling Letters
        const word = "ONLINEIN";
        const letters = word.split("");
        const letterBodies: Matter.Body[] = [];

        letters.forEach((letter, i) => {
            // Randomize start position slightly
            const x = (width / 2) + ((Math.random() - 0.5) * 250);
            const y = -200 - (i * 200); // Stagger drop

            // Define letter-specific physics dimensions to minimize gaps
            // Font: 900 270px Inter (Updated)
            // Scaled up by ~10% from 250px
            let letterWidth = 220;
            let radius = 30;

            switch (letter) {
                case "I":
                    letterWidth = 80; // Scaled up
                    radius = 20;
                    break;
                case "L":
                    letterWidth = 170;
                    break;
                case "E":
                    letterWidth = 190;
                    break;
                case "O":
                    letterWidth = 240;
                    radius = 110;
                    break;
                case "N":
                    letterWidth = 220;
                    break;
                default:
                    letterWidth = 220;
            }

            const letterHeight = 230; // Scaled up

            const body = Bodies.rectangle(x, y, letterWidth, letterHeight, {
                restitution: 0.5, // Reduced bounciness slightly for stack stability
                friction: 0.2, // Increased friction to help stacking
                chamfer: { radius: radius },
                render: {
                    fillStyle: "transparent",
                    strokeStyle: "transparent",
                }
            });

            (body as any).letter = letter;

            letterBodies.push(body);
        });

        Composite.add(world, letterBodies);

        // Add Mouse Interaction
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false,
                },
            },
        });
        Composite.add(world, mouseConstraint);

        // Custom Rendering for Text
        Events.on(render, "afterRender", () => {
            const context = render.context;
            context.font = "900 270px Inter, sans-serif";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = "#ffffff"; // White Text

            letterBodies.forEach((body) => {
                const { x, y } = body.position;
                const letter = (body as any).letter;

                context.save();
                context.translate(x, y);
                context.rotate(body.angle);
                context.fillText(letter, 0, 10); // Slight offset for baseline
                context.restore();
            });
        });


        // Run the engine
        Render.run(render);
        const runner = Runner.create();
        runnerRef.current = runner;
        Runner.run(runner, engine);

        // Resize Handler
        const handleResize = () => {
            if (!renderRef.current || !sceneRef.current) return;
            const newWidth = sceneRef.current.clientWidth;
            const newHeight = sceneRef.current.clientHeight;

            renderRef.current.canvas.width = newWidth;
            renderRef.current.canvas.height = newHeight;

            // Reposition boundaries
            Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 60 });
            Matter.Body.setPosition(rightWall, { x: newWidth + 60, y: newHeight / 2 });
            // Left wall stays same
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas) render.canvas.remove();
            Composite.clear(world, false, true);
            Engine.clear(engine);
        };
    }, []);

    return (
        <div ref={sceneRef} className="w-full h-full relative" />
    );
}
