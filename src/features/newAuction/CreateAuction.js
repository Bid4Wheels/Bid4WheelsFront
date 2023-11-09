import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import colors from '../../utils/desgin/Colors';
import { useNavigate } from 'react-router-dom';
import TechnicalInformation from './TechnicalInformation';
import AuctionInformation from './AuctionInformation';
import AuctionSuccess from './AuctionSuccess';
import { useCreateAuctionMutation, useGetImageLinksMutation } from '../../store/auction/auctionApi';
import { useSelector } from 'react-redux';
import { pushImage } from '../../utils/requests';
import { resizeFile } from '../../utils/resize';
import { useDispatch } from 'react-redux';
import { showMessage } from '../../store/success/successSlice';

const CreateAuction = () => {
    const [selectedDoors, setSelectedDoors] = useState('');
    const [selectedGear, setSelectedGear] = useState('');
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [brandValue, setBrandValue] = useState('');
    const [colorValue, setColorValue] = useState('');
    const [fuelTypeValue, setFuelTypeValue] = useState('');
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
    const [isCreateButtonDisabled, setIsCreateButtonDisabled] = useState(true);
    const [modelValue, setModelValue] = useState('');
    const [startingPrice, setStartingPrice] = useState('');
    const [years, setYears] = useState('');
    const [title, setTitle] = useState('');
    const [mileage, setMileage] = useState('');
    const [showAuctionInformation, setShowAuctionInformation] = useState(false);
    const [description, setDescription] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const [auctionCreated, setAuctionCreated] = useState(false);
    const [droppedImages, setDroppedImages] = useState([]);
    const user = useSelector((state) => state.user);
    const userId = user.userId;
    const dispatch = useDispatch();

    const [makeAuction, { data, isError, error }] = useCreateAuctionMutation();
    const [getLinks, { data: imageLinks }] = useGetImageLinksMutation();

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

    const handleAuctionCreate = () => {
        const body = {
            userId: userId,
            title: title,
            description: description,
            deadline: selectedDate,
            brand: brandValue.toUpperCase(),
            model: modelValue,
            basePrice: startingPrice,
            milage: mileage,
            gasType: fuelTypeValue.toUpperCase(),
            modelYear: years,
            color: colorValue.toUpperCase(),
            doorsAmount: selectedDoors,
            gearShiftType: selectedGear.toUpperCase(),
            tags: tags,
        };

        makeAuction(body);
        dispatch(showMessage('Auction created successfully!'));

        if (isError) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (data) {
            getLinks(data.auctionId);
            setAuctionCreated(true);
        }
    }, [data]);

    useEffect(() => {
        if (imageLinks) {
            droppedImages.forEach((image, index) => {
                resizeFile(image, 317, 204).then((result) => pushImage(imageLinks[index], result));
            });
        }
    }, [imageLinks]);

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

    useEffect(() => {
        const isInputValid = title && description && selectedDate;

        const isImageCountValid = droppedImages.length >= 1 && droppedImages.length <= 7;

        setIsCreateButtonDisabled(
            !(isInputValid && isImageCountValid && droppedImages.length !== 0),
        );
    }, [title, description, selectedDate, droppedImages]);

    const addTag = () => {
        if (inputValue.trim() === '') {
            return;
        }

        if (!tags.includes(inputValue)) {
            const newTags = [...tags, inputValue];
            setTags(newTags);
            setInputValue('');
        }
    };

    const removeTag = (tagToRemove) => {
        const updatedTags = tags.filter((tag) => tag !== tagToRemove);
        setTags(updatedTags);
    };
    const handleImageSelect = (image) => {
        setDroppedImages((prevImages) => [...prevImages, image]);
    };

    if (auctionCreated) {
        return <AuctionSuccess></AuctionSuccess>;
    }
    return (
        <Box>
            <Typography
                gutterBottom
                component={'p'}
                variant="Large"
                sx={{ marginLeft: '35px', marginTop: '20px' }}
            >
                {'New Auction'}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    borderBottomColor: colors.grey,
                    borderBottom: 'solid 1px',
                    padding: '10px 5px 5px 5px',
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
                        width="30px"
                        height="30px"
                        borderRadius="50%"
                        backgroundColor={showAuctionInformation ? colors.grey : colors.water_green}
                        color="white"
                        fontSize="24px"
                        marginRight="10px"
                        marginLeft="25px"
                    >
                        <Typography variant="SemiSmall">1</Typography>
                    </Box>
                    <Typography variant="Small">Technical Information</Typography>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width="30px"
                        height="30px"
                        borderRadius="50%"
                        backgroundColor={showAuctionInformation ? colors.water_green : colors.grey}
                        color="white"
                        fontSize="24px"
                        marginRight="10px"
                        marginLeft="20px"
                    >
                        <Typography variant="Small">2</Typography>
                    </Box>
                    <Typography variant="Small">Auction Information</Typography>
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
                    setShowAuctionInformation={setShowAuctionInformation}
                    isCreateButtonDisabled={isCreateButtonDisabled}
                    handleAuctionCreated={handleAuctionCreate}
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
                    mileage={mileage}
                    years={years}
                    model={modelValue}
                    startingPrice={startingPrice}
                    doors={selectedDoors}
                    gearType={selectedGear}
                ></TechnicalInformation>
            )}
        </Box>
    );
};

export default CreateAuction;
