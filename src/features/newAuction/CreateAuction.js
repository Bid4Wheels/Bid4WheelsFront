import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import colors from '../../utils/desgin/Colors';
import { useNavigate } from 'react-router-dom';
import TechnicalInformation from './TechnicalInformation';
import AuctionInformation from './AuctionInformation';

const CreateAuction = () => {
    const [selectedDoors, setSelectedDoors] = useState('2');
    const [selectedGear, setSelectedGear] = useState('');
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [brandValue, setBrandValue] = useState('');
    const [colorValue, setColorValue] = useState('');
    const [fuelTypeValue, setFuelTypeValue] = useState('');
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
    const [modelValue, setModelValue] = useState('');
    const [startingPrice, setStartingPrice] = useState('');
    const [years, setYears] = useState('');
    const [title, setTitle] = useState('');
    const [mileage, setMileage] = useState('');
    const [showAuctionInformation, setShowAuctionInformation] = useState(false);
    const [description, setDescription] = useState();
    const [selectedDate, setSelectedDate] = useState();

    const [droppedImages, setDroppedImages] = useState([]);

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        const imageFiles = files.filter((file) => file.type.startsWith('image/'));

        setDroppedImages((prevImages) => [...prevImages, ...imageFiles]);
    };

    const handleDeleteImage = (index) => {
        const updatedImages = [...droppedImages];
        updatedImages.splice(index, 1);
        setDroppedImages(updatedImages);
    };

    const navigate = useNavigate();

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleCancelClick = () => {
        navigate('/');
    };

    const handleDoorsChange = (event) => {
        setSelectedDoors(event.target.value);
    };
    const handleGearChange = (event) => {
        setSelectedGear(event.target.value);
    };
    useEffect(() => {
        setIsNextButtonDisabled(
            !brandValue ||
                !colorValue ||
                !fuelTypeValue ||
                !selectedDoors ||
                !selectedGear ||
                !modelValue ||
                !startingPrice ||
                !years ||
                !mileage,
        );
    }, [
        brandValue,
        colorValue,
        fuelTypeValue,
        selectedDoors,
        selectedGear,
        startingPrice,
        modelValue,
        years,
        mileage,
    ]);

    const addTag = () => {
        if (inputValue.trim() === '') return;
        setTags([...tags, inputValue]);
        setInputValue('');
    };

    const removeTag = (tagToRemove) => {
        const updatedTags = tags.filter((tag) => tag !== tagToRemove);
        setTags(updatedTags);
    };
    const handleImageSelect = (imageFile) => {
        setDroppedImages((prevImages) => [...prevImages, imageFile]);
    };
    return (
        <Box>
            <Typography
                gutterBottom
                component={'p'}
                variant="XxLarge"
                sx={{ marginLeft: '35px', marginTop: '50px', marginBottom: '50px' }}
            >
                {'New Auction'}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    borderBottomColor: colors.grey,
                    borderBottom: 'solid 1px',
                    padding: '10px',
                    justifyContent: 'space-between',
                    marginLeft: '35px',
                    marginRight: '20px',
                }}
            >
                <Box sx={{ display: 'flex', justifySelf: 'flex-start', alignItems: 'center' }}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width="36px"
                        height="36px"
                        borderRadius="50%"
                        backgroundColor={showAuctionInformation ? colors.grey : colors.water_green}
                        color="white"
                        fontSize="24px"
                        marginRight="10px"
                        marginLeft="25px"
                    >
                        <Typography variant="SemiSmall">1</Typography>
                    </Box>
                    <Typography variant="SemiSmall">Technical Information</Typography>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width="36px"
                        height="36px"
                        borderRadius="50%"
                        backgroundColor={showAuctionInformation ? colors.water_green : colors.grey}
                        color="white"
                        fontSize="24px"
                        marginRight="10px"
                        marginLeft="20px"
                    >
                        <Typography variant="SemiSmall">2</Typography>
                    </Box>
                    <Typography variant="SemiSmall">Auction Information</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifySelf: 'flex-end',
                        alignItems: 'center',
                        marginRight: '20px',
                    }}
                >
                    <Button
                        variant="text"
                        sx={{ color: colors.water_green }}
                        onClick={handleCancelClick}
                        color="water_green"
                    >
                        <Typography variant="SemiSmall">X Cancel</Typography>
                    </Button>
                </Box>
            </Box>
            {showAuctionInformation ? (
                <AuctionInformation
                    setTitle={setTitle}
                    title={title}
                    description={description}
                    setDescription={setDescription}
                    selectedDate={selectedDate}
                    handleDateChange={handleDateChange}
                    handleDeleteImage={handleDeleteImage}
                    handleDrop={handleDrop}
                    droppedImages={droppedImages}
                    handleImageSelect={handleImageSelect}
                    setDroppedImages={setDroppedImages}
                ></AuctionInformation>
            ) : (
                <TechnicalInformation
                    handleDoorsChange={handleDoorsChange}
                    handleGearChange={handleGearChange}
                    addTag={addTag}
                    removeTag={removeTag}
                    setBrandValue={setBrandValue}
                    setColorValue={setColorValue}
                    setFuelTypeValue={setFuelTypeValue}
                    setInputValue={setInputValue}
                    setMileage={setMileage}
                    setModelValue={setModelValue}
                    setStartingPrice={setStartingPrice}
                    setYears={setYears}
                    tags={tags}
                    inputValue={inputValue}
                    isNextButtonDisabled={isNextButtonDisabled}
                    brandValue={brandValue}
                    colorValue={colorValue}
                    fuelTypeValue={fuelTypeValue}
                    setShowAuctionInformation={setShowAuctionInformation}
                ></TechnicalInformation>
            )}
        </Box>
    );
};

export default CreateAuction;
