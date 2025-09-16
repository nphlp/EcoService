"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { MouseEvent as ReactMouseEvent, ReactNode, useRef } from "react";

type PerspectiveCardProps = {
    children: ReactNode;
};

export default function PerspectiveCard(props: PerspectiveCardProps) {
    const { children } = props;

    const cardRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transformRotate = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!cardRef.current) return [0, 0];

        const rect = cardRef.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const ROTATION_RANGE = 30;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = -(mouseY / height - ROTATION_RANGE / 2);
        const rY = mouseX / width - ROTATION_RANGE / 2;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                position: "relative",
                transform: transformRotate,
                transformStyle: "preserve-3d",
            }}
            className="rounded-2xl"
        >
            <div
                style={{
                    position: "relative",
                    transform: "translateZ(0px)",
                    transformStyle: "preserve-3d",
                }}
            >
                {children}
            </div>
            <div
                style={{
                    position: "absolute",
                    transform: "translateZ(-50px)",
                    transformStyle: "preserve-3d",
                }}
                className="inset-[10px] rounded-2xl bg-black/50 blur-[8px]"
            />
        </motion.div>
    );
}
