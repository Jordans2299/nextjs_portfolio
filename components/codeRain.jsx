import { useEffect, useRef } from 'react';
import styles from '../styles/codeRain.module.css';

const CHARS = '01{}<>/;:=+-_$#*[]()ABCDEFxfnif'.split('');

export default function CodeRain() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const fontSize = 15;
        let width, height, columns, drops;

        function setup() {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
            columns = Math.floor(width / fontSize);
            drops = new Array(columns).fill(0).map(() => Math.random() * (height / fontSize));
        }
        setup();

        function draw() {
            ctx.fillStyle = 'rgba(6, 6, 12, 0.15)';
            ctx.fillRect(0, 0, width, height);
            ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
            for (let i = 0; i < columns; i++) {
                if (Math.random() > 0.06) continue;
                const char = CHARS[Math.floor(Math.random() * CHARS.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;
                ctx.fillStyle = 'rgba(255, 45, 45, 0.55)';
                ctx.fillText(char, x, y);
                if (y > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i] += 0.35;
            }
        }
        const interval = setInterval(draw, 60);

        const onResize = () => setup();
        window.addEventListener('resize', onResize);
        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
