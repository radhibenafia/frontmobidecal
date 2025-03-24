import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { AppBar, Toolbar, Typography } from "@mui/material";

const shapes = [
    { type: "circle", color: "red" },
    { type: "rectangle", color: "blue" },
    { type: "triangle", color: "green" }
];

const Game = () => {
    const sceneRef = useRef(null);
    const [targetShape, setTargetShape] = useState(shapes[0]);
    const [score, setScore] = useState(0);
    const engineRef = useRef(null);
    const renderRef = useRef(null);
    const shapesRef = useRef([]);

    useEffect(() => {
        const engine = Matter.Engine.create();
        engine.gravity.y = 0.2;
        engineRef.current = engine;
        const { world } = engine;

        const render = Matter.Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: 800,
                height: 400,
                wireframes: false,
                background: "#f0f8ff"
            }
        });
        renderRef.current = render;

        const ground = Matter.Bodies.rectangle(400, 380, 810, 20, { isStatic: true, render: { fillStyle: "brown" } });
        Matter.World.add(world, [ground]);

        const spawnShape = () => {
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            let body;

            if (shape.type === "circle") {
                body = Matter.Bodies.circle(Math.random() * 700 + 50, 50, 30, {
                    restitution: 0.5,
                    render: { fillStyle: shape.color },
                    label: shape.type
                });
            } else if (shape.type === "rectangle") {
                body = Matter.Bodies.rectangle(Math.random() * 700 + 50, 50, 60, 40, {
                    restitution: 0.5,
                    render: { fillStyle: shape.color },
                    label: shape.type
                });
            } else if (shape.type === "triangle") {
                body = Matter.Bodies.polygon(Math.random() * 700 + 50, 50, 3, 40, {
                    restitution: 0.5,
                    render: { fillStyle: shape.color },
                    label: shape.type
                });
            }

            shapesRef.current.push(body);
            Matter.World.add(world, body);
        };

        const interval = setInterval(() => {
            spawnShape();
        }, 3000);

        Matter.Engine.run(engine);
        Matter.Render.run(render);

        return () => {
            clearInterval(interval);
            Matter.Render.stop(render);
            Matter.World.clear(world);
            Matter.Engine.clear(engine);
            render.canvas.remove();
            render.textures = {};
        };
    }, []);

    const handleClick = (event) => {
        const rect = sceneRef.current.getBoundingClientRect();
        const mouse = { x: event.clientX - rect.left, y: event.clientY - rect.top };

        const clickedShapes = Matter.Query.point(shapesRef.current, mouse);

        if (clickedShapes.length > 0) {
            const clickedShape = clickedShapes[0];

            if (clickedShape.label === targetShape.type) {
                setScore(prevScore => prevScore + 1);
            }

            Matter.World.remove(engineRef.current.world, clickedShape);
            shapesRef.current = shapesRef.current.filter(shape => shape !== clickedShape);
        }
    };

    useEffect(() => {
        const shapeInterval = setInterval(() => {
            setTargetShape(shapes[Math.floor(Math.random() * shapes.length)]);
        }, 5000);

        return () => clearInterval(shapeInterval);
    }, []);

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Shape Game</Typography>
                </Toolbar>
            </AppBar>

            <div style={{ textAlign: "center", fontFamily: "Arial", marginTop: "60px" }}>
                <h1>Score: {score}</h1>
                <h2>
                    Cliquez sur la forme :
                    <span style={{
                        display: "inline-block",
                        width: 50,
                        height: 50,
                        backgroundColor: targetShape.color,
                        marginLeft: 10,
                        borderRadius: targetShape.type === "circle" ? "50%" : "0",
                        clipPath: targetShape.type === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : "none"
                    }}></span>
                </h2>
                <div
                    ref={sceneRef}
                    onClick={handleClick}
                    style={{
                        cursor: "pointer",
                        border: "2px solid black",
                        width: "800px",
                        height: "400px",
                        margin: "auto"
                    }}
                />
            </div>
        </div>
    );
};

export default Game;
