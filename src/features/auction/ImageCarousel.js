import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import colors from '../../utils/desgin/Colors';

export function ImageCarousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        if (nextIndex !== currentIndex) {
            setIsAnimating(true);
            setDirection(nextIndex > currentIndex ? 1 : -1);
            const timeoutId = setTimeout(() => {
                setCurrentIndex(nextIndex);
                setIsAnimating(false);
            }, 500);
            return () => clearTimeout(timeoutId);
        }
    }, [nextIndex, currentIndex]);

    const handlePrevClick = () => {
        setNextIndex(Math.max(currentIndex - 2, 0));
    };

    const handleNextClick = () => {
        setNextIndex(Math.min(currentIndex + 2, images.length - 2));
    };

    if (!images || images.length === 0) {
        return null;
    }

    if (images.length === 1) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '260px',
                    width: '23vw',
                    padding: '20px',
                    margin: 'auto',
                }}
            >
                <img
                    src={images[0]}
                    alt={`Image 0`}
                    style={{
                        width: '100%',
                        height: '100%',
                        maxHeight: '100%',
                        borderRadius: '5px',
                        objectFit: 'cover',
                    }}
                />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            <IconButton
                onClick={handlePrevClick}
                disabled={isAnimating || currentIndex === 0}
                sx={{
                    backgroundColor: colors.water_green,
                    borderRadius: '50%',
                    color: 'white',
                    '&:hover': { backgroundColor: colors.on_stand_water_green },
                }}
            >
                <NavigateBeforeIcon />
            </IconButton>

            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    transform: `translateX(${direction * (currentIndex - nextIndex) * 50}%)`,
                    transition: 'transform 0.2s ease-in-out',
                }}
            >
                {images.slice(currentIndex, currentIndex + 2).map((image, index) => (
                    <div
                        key={index}
                        style={{
                            padding: '10px',
                            height: '260px',
                            width: '23vw',
                            flexBasis: 'calc(50% - 20px)',
                            opacity: isAnimating ? 0 : 1,
                            transition: 'opacity 0.5s ease-in-out',
                        }}
                    >
                        <img
                            src={image}
                            alt={`Image ${currentIndex + index}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                maxHeight: '100%',
                                maxWidth: '100%',
                                borderRadius: '5px',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                ))}
            </div>

            <IconButton
                onClick={handleNextClick}
                disabled={isAnimating || currentIndex >= images.length - 2}
                sx={{
                    backgroundColor: colors.water_green,
                    borderRadius: '50%',
                    color: 'white',
                    '&:hover': { backgroundColor: colors.on_stand_water_green },
                }}
            >
                <NavigateNextIcon />
            </IconButton>
        </Box>
    );
}
