import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import colors from '../../utils/desgin/Colors';

export function ImageCarousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 2, 0));
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 2, images.length - 2));
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
                    width: '50%',
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
                disabled={currentIndex === 0}
                sx={{
                    backgroundColor: colors.water_green,
                    borderRadius: '50%',
                    color: 'white',
                    '&:hover': { backgroundColor: colors.on_stand_water_green },
                }}
            >
                <NavigateBeforeIcon />
            </IconButton>

            <div style={{ display: 'flex' }}>
                {images.slice(currentIndex, currentIndex + 2).map((image, index) => (
                    <div
                        key={index}
                        style={{
                            padding: '10px',
                            width: '50%',
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
                disabled={currentIndex >= images.length - 2}
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
