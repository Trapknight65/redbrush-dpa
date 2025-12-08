'use client';

import { useEffect, useRef } from 'react';

interface Bubble {
    x: number;
    y: number;
    size: number;
    opacity: number;
    life: number;
    maxLife: number;
    sparkle: number;
    popping: boolean;
    popProgress: number;
}

export default function SplashingParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size to window size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const bubbles: Bubble[] = [];
        const bubbleCount = 150;
        let time = 0;

        // Initialize bubbles across entire canvas
        for (let i = 0; i < bubbleCount; i++) {
            bubbles.push(createBubble());
        }

        function createBubble(): Bubble {
            return {
                x: Math.random() * canvas!.width,
                y: Math.random() * canvas!.height,
                size: Math.random() * 15 + 3,
                opacity: Math.random() * 0.25 + 0.1, // Reduced opacity
                life: Math.random() * 200,
                maxLife: 200 + Math.random() * 200,
                sparkle: Math.random() * Math.PI * 2,
                popping: false,
                popProgress: 0,
            };
        }

        function animate() {
            ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
            time += 0.02;

            // Draw foam texture background
            for (let i = 0; i < 30; i++) {
                const x = (Math.sin(time * 0.3 + i) * canvas!.width * 0.5) + canvas!.width * 0.5;
                const y = (Math.cos(time * 0.2 + i * 0.5) * canvas!.height * 0.5) + canvas!.height * 0.5;
                const size = 40 + Math.sin(time + i) * 20;

                const gradient = ctx!.createRadialGradient(x, y, 0, x, y, size);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.03)');
                gradient.addColorStop(1, 'rgba(200, 230, 255, 0)');

                ctx!.fillStyle = gradient;
                ctx!.beginPath();
                ctx!.arc(x, y, size, 0, Math.PI * 2);
                ctx!.fill();
            }

            bubbles.forEach((bubble, index) => {
                bubble.life++;
                bubble.sparkle += 0.1;

                // Start popping animation near end of life
                if (bubble.life > bubble.maxLife * 0.9 && !bubble.popping) {
                    bubble.popping = true;
                }

                if (bubble.popping) {
                    bubble.popProgress += 0.15;
                }

                // Gentle drift motion
                bubble.x += Math.sin(time + bubble.life * 0.01) * 0.3;
                bubble.y += Math.cos(time * 0.7 + bubble.life * 0.01) * 0.3;

                // Keep bubbles on screen
                if (bubble.x < 0) bubble.x = canvas!.width;
                if (bubble.x > canvas!.width) bubble.x = 0;
                if (bubble.y < 0) bubble.y = canvas!.height;
                if (bubble.y > canvas!.height) bubble.y = 0;

                const lifeFactor = 1 - (bubble.life / bubble.maxLife);
                const currentOpacity = bubble.opacity * lifeFactor;

                if (bubble.popping) {
                    // Draw pop animation - expanding ring
                    const popSize = bubble.size * (1 + bubble.popProgress * 2);
                    const popOpacity = currentOpacity * (1 - bubble.popProgress);

                    ctx!.beginPath();
                    ctx!.arc(bubble.x, bubble.y, popSize, 0, Math.PI * 2);
                    ctx!.strokeStyle = `rgba(255, 255, 255, ${popOpacity * 0.6})`;
                    ctx!.lineWidth = 3 - bubble.popProgress * 2;
                    ctx!.stroke();

                    // Small particles from pop
                    for (let i = 0; i < 6; i++) {
                        const angle = (Math.PI * 2 / 6) * i;
                        const dist = bubble.popProgress * bubble.size * 1.5;
                        const px = bubble.x + Math.cos(angle) * dist;
                        const py = bubble.y + Math.sin(angle) * dist;

                        ctx!.beginPath();
                        ctx!.arc(px, py, 2 - bubble.popProgress, 0, Math.PI * 2);
                        ctx!.fillStyle = `rgba(255, 255, 255, ${popOpacity})`;
                        ctx!.fill();
                    }
                } else {
                    // Draw main bubble
                    const bubbleGradient = ctx!.createRadialGradient(
                        bubble.x - bubble.size * 0.3,
                        bubble.y - bubble.size * 0.3,
                        0,
                        bubble.x,
                        bubble.y,
                        bubble.size
                    );
                    bubbleGradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity * 0.7})`);
                    bubbleGradient.addColorStop(0.5, `rgba(245, 250, 255, ${currentOpacity * 0.4})`);
                    bubbleGradient.addColorStop(0.8, `rgba(220, 240, 255, ${currentOpacity * 0.2})`);
                    bubbleGradient.addColorStop(1, `rgba(200, 230, 255, 0)`);

                    ctx!.beginPath();
                    ctx!.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
                    ctx!.fillStyle = bubbleGradient;
                    ctx!.fill();

                    // Add sparkle effect
                    const sparkleIntensity = Math.abs(Math.sin(bubble.sparkle));
                    if (sparkleIntensity > 0.7 && bubble.size > 5) {
                        ctx!.save();
                        ctx!.translate(bubble.x, bubble.y);
                        ctx!.rotate(bubble.sparkle);

                        ctx!.strokeStyle = `rgba(255, 255, 255, ${sparkleIntensity * currentOpacity * 0.8})`;
                        ctx!.lineWidth = 2;
                        ctx!.lineCap = 'round';

                        // Draw sparkle cross
                        ctx!.beginPath();
                        ctx!.moveTo(-bubble.size * 0.4, 0);
                        ctx!.lineTo(bubble.size * 0.4, 0);
                        ctx!.stroke();

                        ctx!.beginPath();
                        ctx!.moveTo(0, -bubble.size * 0.4);
                        ctx!.lineTo(0, bubble.size * 0.4);
                        ctx!.stroke();

                        ctx!.restore();
                    }

                    // Add bubble highlight
                    if (bubble.size > 6) {
                        ctx!.beginPath();
                        ctx!.arc(
                            bubble.x - bubble.size * 0.3,
                            bubble.y - bubble.size * 0.3,
                            bubble.size * 0.2,
                            0,
                            Math.PI * 2
                        );
                        ctx!.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.5})`;
                        ctx!.fill();
                    }

                    // Add subtle outline
                    ctx!.beginPath();
                    ctx!.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
                    ctx!.strokeStyle = `rgba(255, 255, 255, ${currentOpacity * 0.3})`;
                    ctx!.lineWidth = 1.5;
                    ctx!.stroke();
                }

                // Reset bubble when life expires or pop animation complete
                if (bubble.life >= bubble.maxLife || bubble.popProgress >= 1) {
                    bubbles[index] = createBubble();
                }
            });

            requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 1 }}
        />
    );
}
