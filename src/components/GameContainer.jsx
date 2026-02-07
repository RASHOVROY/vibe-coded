import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from './Reveal';
import { Heart } from 'lucide-react';

const GameContainer = () => {
    const [stage, setStage] = useState('question'); // 'question', 'confirm', 'reveal'
    const [noHasRun, setNoHasRun] = useState(false);
    const [noBtnStyle, setNoBtnStyle] = useState({});
    const [noText, setNoText] = useState("NO 💔");

    const noMessages = [
        "NO 💔",
        "Are you sure? 🥺",
        "Please? 😢",
        "Don't do this! 😭",
        "I'm running! 🏃",
        "Catch me if you can!",
        "Think again! 💭",
        "Pretty please? 🙏",
        "You're breaking my heart! 💔",
        "NOOO! 😱"
    ];

    const handleNoHover = () => {
        setNoHasRun(true);

        const buttonWidth = 180;
        const buttonHeight = 60;
        const padding = 50;

        const maxX = window.innerWidth - buttonWidth - padding;
        const maxY = window.innerHeight - buttonHeight - padding;

        const x = Math.max(padding, Math.random() * maxX);
        const y = Math.max(padding, Math.random() * maxY);

        setNoBtnStyle({
            position: 'fixed',
            top: `${y}px`,
            left: `${x}px`,
        });
        const randomIndex = Math.floor(Math.random() * noMessages.length);
        setNoText(noMessages[randomIndex]);
    };

    const handleYesClick = () => {
        if (stage === 'question') {
            setStage('confirm');
        } else if (stage === 'confirm') {
            setStage('reveal');
        }
    };

    return (
        <div className="game-wrapper">
            <AnimatePresence mode="wait">
                {stage === 'question' && (
                    <>
                        <motion.div
                            key="question"
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -100 }}
                            transition={{ duration: 0.6, type: "spring" }}
                            className="question-card"
                        >
                            <Heart className="heart-icon" fill="currentColor" />
                            <h1 className="question-title">
                                Will you be my Valentine?
                            </h1>
                            <div className="buttons-container">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="yes-button"
                                    onClick={handleYesClick}
                                >
                                    YES ❤️
                                </motion.button>

                                {/* NO button starts inside the container */}
                                {!noHasRun && (
                                    <motion.button
                                        className="no-button"
                                        onMouseEnter={handleNoHover}
                                        onTouchStart={handleNoHover}
                                        onClick={handleNoHover}
                                    >
                                        {noText}
                                    </motion.button>
                                )}
                            </div>
                        </motion.div>

                        {/* NO button moves outside when it runs away */}
                        {noHasRun && (
                            <motion.button
                                key="no-button-escaped"
                                className="no-button"
                                style={noBtnStyle}
                                onMouseEnter={handleNoHover}
                                onTouchStart={handleNoHover}
                                onClick={handleNoHover}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                {noText}
                            </motion.button>
                        )}
                    </>
                )}

                {stage === 'confirm' && (
                    <motion.div
                        key="confirm"
                        initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="question-card"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            style={{ fontSize: '4rem', marginBottom: '1rem' }}
                        >
                            💕
                        </motion.div>
                        <h1 className="question-title" style={{ fontSize: '2.5rem' }}>
                            Really? You promise? 🥺
                        </h1>
                        <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                            This means forever and ever...
                        </p>
                        <div className="buttons-container">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="yes-button"
                                onClick={handleYesClick}
                            >
                                I PROMISE! 💍
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {stage === 'reveal' && (
                    <Reveal key="reveal" />
                )}
            </AnimatePresence>
        </div>
    );
};

export default GameContainer;
