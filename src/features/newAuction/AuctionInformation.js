import { Box, TextField, IconButton, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import colors from '../../utils/desgin/Colors';
import { useNavigate } from 'react-router-dom';
import { addHours } from 'date-fns';

const AuctionInformation = ({
    setTitle,
    title,
    description,
    setDescription,
    selectedDate,
    handleDateChange,
    handleDeleteImage,
    handleDrop,
    droppedImages,
    handleImageSelect,
    setDroppedImages,
    setShowAuctionInformation,
    isCreateButtonDisabled,
    handleAuctionCreated,
}) => {
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSelectClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const currentDate = new Date();
    const minimumDate = addHours(currentDate, 24);

    const handleFileInputChange = (e) => {
        const files = e.target.files;
        const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));

        if (imageFiles.length > 0) {
            setDroppedImages((prevImages) => [...prevImages, ...imageFiles]);
        }
    };

    const fileInputRef = React.createRef(); // Reference to the hidden file input

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginTop: '50px',
                    marginLeft: '80px',
                    flexWrap: 'wrap',
                    width: '100%',
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ width: '469px', input: { fontSize: '32px', fontWeight: 'Bold' } }}
                        defaultValue="Title"
                        variant="standard"
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        color="water_green"
                        type="text"
                        value={title}
                    />
                    <TextField
                        label="Description"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{ maxLength: 500 }}
                        sx={{ width: '469px', marginTop: '45px' }}
                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                        variant="standard"
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        color="water_green"
                        type="text"
                        multiline
                        value={description}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            label="Date & Time"
                            sx={{ marginTop: '95px' }}
                            onChange={handleDateChange}
                            slotProps={{ textField: { variant: 'standard' } }}
                            value={selectedDate}
                            minDate={minimumDate}
                        />
                    </LocalizationProvider>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        border: '2px dashed #00d591',
                        padding: '20px',
                        minHeight: '150px',
                        marginRight: '120px',
                        width: 574,
                        height: 496,
                        alignItems: 'center',
                        justifyContent: 'center', // Center content vertically
                        textAlign: 'center', // Center text horizontally
                    }}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    {droppedImages.length === 0 ? (
                        <Box>
                            <ImageIcon
                                fontSize="large"
                                sx={{ marginBottom: '16px', transform: 'scale(3)' }}
                                size="Large"
                            />
                            <p>
                                Drop your car image here or{' '}
                                <label
                                    htmlFor="fileInput"
                                    onClick={handleSelectClick}
                                    style={{
                                        cursor: 'pointer',
                                        color: colors.water_green,
                                        textDecoration: 'underline',
                                    }}
                                >
                                    click
                                </label>{' '}
                                to select
                            </p>
                            <input
                                id="fileInput"
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                multiple
                                style={{ display: 'none' }}
                                onChange={handleFileInputChange}
                            />
                        </Box>
                    ) : (
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {droppedImages.map((file, index) => (
                                <div
                                    key={index}
                                    style={{
                                        margin: '10px',
                                        textAlign: 'center',
                                        position: 'relative',
                                    }}
                                >
                                    <IconButton
                                        color="grey"
                                        onClick={() => handleDeleteImage(index)}
                                        sx={{
                                            right: '0px',
                                            width: 21.857,
                                            height: 26.357,
                                            zIndex: 1,
                                            position: 'absolute',
                                            backgroundColor: colors.grey,
                                        }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        style={{
                                            position: 'relative',
                                            borderRadius: '10px',
                                            maxWidth: '240px',
                                            maxHeight: '175px',
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '96px',
                    marginTop: '144px',
                    gap: '30px',
                }}
            >
                <Button
                    variant="contained"
                    sx={{ paddingX: '50px', paddingY: '20px', color: 'white' }}
                    color="grey"
                    onClick={(e) => setShowAuctionInformation(false)}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    sx={{ paddingX: '50px', paddingY: '20px', color: 'white' }}
                    color="water_green"
                    disabled={isCreateButtonDisabled}
                    onClick={handleAuctionCreated}
                >
                    Create
                </Button>
            </Box>
        </Box>
    );
};

export default AuctionInformation;
