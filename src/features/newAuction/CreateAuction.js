import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
    RadioGroup,
    Radio,
    FormControl,
    FormControlLabel,
    FormLabel,
    Fab,
    Chip,
} from '@mui/material';
import colors from '../../utils/desgin/Colors';
import image from '../commons/new_auction.png';

import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';

// Sample data sources
const brandOptions = ['Brand 1', 'Brand 2', 'Brand 3'];
const colorOptions = ['Red', 'Blue', 'Green'];
const fuelTypeOptions = ['Gasoline', 'Diesel', 'Electric'];

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
    const [mileage, setMileage] = useState('');

    const navigate = useNavigate();

    const handleCancelClick = () => {
        navigate('/user');
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
                        backgroundColor={colors.water_green}
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
                        backgroundColor={colors.grey}
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
            <form>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '60px',
                        marginLeft: '80px',
                        flexWrap: 'wrap',
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '50%',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginRight: '45px',
                            }}
                        >
                            <Autocomplete
                                disablePortal
                                id="brand-autocomplete"
                                options={brandOptions}
                                sx={{ width: 275 }}
                                renderInput={(params) => <TextField {...params} label="Brand" />}
                                value={brandValue}
                                onChange={(event, newValue) => {
                                    setBrandValue(newValue);
                                }}
                                color="water_green"
                            />

                            <Autocomplete
                                disablePortal
                                id="color-autocomplete"
                                options={colorOptions}
                                sx={{ width: 275, marginTop: '60px' }}
                                renderInput={(params) => <TextField {...params} label="Color" />}
                                value={colorValue}
                                onChange={(event, newValue) => {
                                    setColorValue(newValue);
                                }}
                                color="water_green"
                            />

                            <Autocomplete
                                disablePortal
                                id="fuel-type-autocomplete"
                                options={fuelTypeOptions}
                                sx={{ width: 275, marginTop: '60px' }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Fuel Type" />
                                )}
                                value={fuelTypeValue}
                                onChange={(event, newValue) => {
                                    setFuelTypeValue(newValue);
                                }}
                                color="water_green"
                            />

                            <FormControl sx={{ marginTop: '50px' }}>
                                <FormLabel
                                    id="demo-row-radio-buttons-group-label"
                                    sx={{ color: 'inherit', fontWeight: 'bold' }}
                                    color="water_green"
                                >
                                    Car doors
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel
                                        value="2"
                                        control={
                                            <Radio
                                                sx={{
                                                    '&.Mui-checked': {
                                                        color: colors.water_green,
                                                    },
                                                }}
                                            />
                                        }
                                        label="2"
                                        onChange={handleDoorsChange}
                                    />
                                    <FormControlLabel
                                        value="3"
                                        control={
                                            <Radio
                                                sx={{
                                                    marginLeft: '10px',
                                                    '&.Mui-checked': {
                                                        color: colors.water_green,
                                                    },
                                                }}
                                            />
                                        }
                                        label="3"
                                        onChange={handleDoorsChange}
                                    />
                                    <FormControlLabel
                                        value="4"
                                        control={
                                            <Radio
                                                sx={{
                                                    marginLeft: '10px',
                                                    '&.Mui-checked': {
                                                        color: colors.water_green,
                                                    },
                                                }}
                                            />
                                        }
                                        label="4"
                                        onChange={handleDoorsChange}
                                    />
                                    <FormControlLabel
                                        value="5"
                                        control={
                                            <Radio
                                                sx={{
                                                    marginLeft: '10px',
                                                    '&.Mui-checked': {
                                                        color: colors.water_green,
                                                    },
                                                }}
                                            />
                                        }
                                        label="5"
                                        onChange={handleDoorsChange}
                                    />
                                </RadioGroup>
                            </FormControl>
                            <FormControl sx={{ marginTop: '50px' }}>
                                <FormLabel
                                    id="demo-row-radio-buttons-group-label"
                                    sx={{ color: 'inherit', fontWeight: 'bold' }}
                                    color="water_green"
                                >
                                    Gear shift type
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel
                                        value="Manual"
                                        control={
                                            <Radio
                                                sx={{
                                                    '&.Mui-checked': {
                                                        color: colors.water_green,
                                                    },
                                                }}
                                            />
                                        }
                                        label="Manual"
                                        onChange={handleGearChange}
                                    />
                                    <FormControlLabel
                                        value="Automatic"
                                        control={
                                            <Radio
                                                sx={{
                                                    marginLeft: '10px',
                                                    '&.Mui-checked': {
                                                        color: colors.water_green,
                                                    },
                                                }}
                                            />
                                        }
                                        label="Automatic"
                                        onChange={handleGearChange}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <TextField
                                label="Model"
                                sx={{ width: 300, marginTop: '10px' }}
                                variant="standard"
                                onChange={(e) => setModelValue(e.target.value)}
                                color="water_green"
                            />
                            <TextField
                                label="Starting price"
                                sx={{
                                    width: 300,
                                    marginTop: '69px',
                                }}
                                variant="standard"
                                defaultValue="Starting price"
                                type="number"
                                onChange={(e) => setStartingPrice(e.target.value)}
                                color="water_green"
                            />
                            <TextField
                                label="Years"
                                sx={{ width: 300, marginTop: '69px' }}
                                variant="standard"
                                type="number"
                                onChange={(e) => setYears(e.target.value)}
                                color="water_green"
                            />
                            <TextField
                                label="Mileage"
                                sx={{ width: 300, marginTop: '69px' }}
                                variant="standard"
                                type="number"
                                onChange={(e) => setMileage(e.target.value)}
                                color="water_green"
                            />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '50%',
                            height: '625px',
                            alignContent: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <img src={image} alt="Auction Image" width={451} height={377} />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '50%',
                            marginBottom: '60px',
                        }}
                    >
                        <Box style={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                label="New Tag"
                                sx={{ width: '85%' }}
                                variant="standard"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                color="water_green"
                            />
                            <Fab
                                onClick={addTag}
                                size="small"
                                sx={{
                                    alignSelf: 'flex-start',
                                    marginTop: '10px',
                                    marginLeft: '30px',
                                }}
                                color="water_green"
                            >
                                +
                            </Fab>
                        </Box>
                        <Box sx={{ marginTop: '10px' }}>
                            {tags.map((tag, index) => (
                                <Chip
                                    key={index}
                                    label={tag}
                                    onDelete={() => removeTag(tag)}
                                    deleteIcon={'x'}
                                    sx={{ margin: '2px' }}
                                    color="water_green"
                                />
                            ))}
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '20px',
                    }}
                >
                    <Button
                        variant="contained"
                        disabled={isNextButtonDisabled}
                        sx={{ paddingX: '50px', paddingY: '20px', color: 'white' }}
                        color="water_green"
                    >
                        Next
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default CreateAuction;
