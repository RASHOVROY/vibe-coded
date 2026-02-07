import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Using your HASEEN song!
    const musicUrl = "/music.mp3";

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.3; // Set volume to 30%
            audioRef.current.loop = true; // Loop the music
        }
    }, []);

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
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
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                title={isPlaying ? 'Pause Music' : 'Play Music'}
            >
                {isPlaying ? (
                    <Volume2 color="white" size={28} />
                ) : (
                    <VolumeX color="white" size={28} />
                )}
            </button>
            {!isPlaying && (
                <p
                    style={{
                        position: 'fixed',
                        bottom: '90px',
                        right: '10px',
                        background: 'rgba(255,255,255,0.9)',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        color: '#666',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        zIndex: 10000,
                    }}
                >
                    🎵 Click for music!
                </p>
            )}
        </>
    );
};

export default MusicPlayer;
