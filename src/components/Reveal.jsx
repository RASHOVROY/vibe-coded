import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const Reveal = () => {
    useEffect(() => {
        // Continuous heart confetti
        const duration = 30 * 1000;
        const animationEnd = Date.now() + duration;

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            // Regular confetti
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff4d6d', '#ff8fa3', '#ffb3c1', '#c9184a']
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff4d6d', '#ff8fa3', '#ffb3c1', '#c9184a']
            });
        }, 150);

        // Initial heart explosion
        const scalar = 2;
        const heart = confetti.shapeFromPath({
            path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z'
        });

        confetti({
            shapes: [heart],
            scalar,
            particleCount: 30,
            spread: 180,
            origin: { y: 0.6 },
            colors: ['#FF0000', '#FF69B4', '#FF1493', '#c9184a']
        });

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '3rem',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,220,230,0.95) 100%)',
                borderRadius: '40px',
                boxShadow: '0 30px 100px rgba(201, 24, 74, 0.4), 0 0 0 2px rgba(255,255,255,0.8) inset',
                maxWidth: '90%',
                backdropFilter: 'blur(10px)',
            }}
        >
            {/* Floating hearts around the card */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 2,
                        delay: i * 0.2,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    style={{
                        position: 'absolute',
                        fontSize: '2rem',
                        top: `${10 + Math.random() * 80}%`,
                        left: `${5 + Math.random() * 90}%`,
                        opacity: 0.6,
                        pointerEvents: 'none'
                    }}
                >
                    💕
                </motion.div>
            ))}

            <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontSize: '5rem', marginBottom: '1.5rem' }}
            >
                💖
            </motion.div>

            <motion.h1
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: '5rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #c9184a 0%, #ff4d6d 50%, #ff8fa3 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '1.5rem',
                    textShadow: 'none',
                    filter: 'drop-shadow(2px 4px 10px rgba(201, 24, 74, 0.3))'
                }}
            >
                I Love You!
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                style={{
                    fontSize: '1.5rem',
                    color: '#c9184a',
                    fontStyle: 'italic',
                    marginBottom: '1rem',
                    fontFamily: "'Dancing Script', cursive"
                }}
            >
                "You are my today and all of my tomorrows." 💕
            </motion.p>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                style={{
                    fontSize: '1.2rem',
                    color: '#888',
                    marginTop: '1rem'
                }}
            >
                Forever & Always ❤️
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, type: "spring" }}
                style={{
                    marginTop: '2rem',
                    padding: '1rem 2rem',
                    background: 'linear-gradient(135deg, #ff4d6d 0%, #c9184a 100%)',
                    borderRadius: '50px',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    boxShadow: '0 10px 30px rgba(201, 24, 74, 0.4)'
                }}
            >
                🥰 You said YES! 🥰
            </motion.div>
        </motion.div>
    );
};

export default Reveal;
