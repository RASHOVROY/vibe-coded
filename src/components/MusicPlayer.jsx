import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const audioRef = useRef(null);

    // Using your HASEEN song!
    const musicUrl = "/music.mp3";

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.3;
            audioRef.current.loop = true;
        }

        // Auto-play on first user interaction (required by browsers)
        const playOnInteraction = () => {
            if (audioRef.current && !hasInteracted) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                    setHasInteracted(true);
                }).catch((e) => {
                    console.log('Autoplay prevented:', e);
                });
            }
        };

        // Listen for any user interaction
        document.addEventListener('click', playOnInteraction, { once: true });
        document.addEventListener('touchstart', playOnInteraction, { once: true });

        return () => {
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
        };
    }, [hasInteracted]);

    const toggleMusic = (e) => {
        e.stopPropagation();
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    return (
        <>
            <audio ref={audioRef} src={musicUrl} />
            <button
                onClick={toggleMusic}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: isPlaying
                        ? 'linear-gradient(135deg, #ff4d6d 0%, #c9184a 100%)'
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.25)',
                    zIndex: 10000,
                    transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                title={isPlaying ? 'Mute Music' : 'Play Music'}
            >
                {isPlaying ? (
                    <Volume2 color="white" size={28} />
                ) : (
                    <VolumeX color="white" size={28} />
                )}
            </button>
        </>
    );
};

export default MusicPlayer;
