import { useEffect, useRef } from 'react';
import '../styles/CustomCursor.css';

export const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const isCoarse = window.matchMedia('(pointer: coarse)').matches;

        if (isCoarse) return;

        const cursor = cursorRef.current;
        if (!cursor) return;

        cursor.style.backgroundImage = "url('./assets/ui/cursor-default.webp')";

        const move = (e: MouseEvent) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        };

        document.addEventListener('mousemove', move);

        return () => {
            document.removeEventListener('mousemove', move);
        };
    }, []);

    return <div ref={cursorRef} id="custom-cursor" />;
};