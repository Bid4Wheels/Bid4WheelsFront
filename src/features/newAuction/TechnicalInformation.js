import React from 'react';
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
import { BRANDS, COLORS, FUEL_TYPES } from '../../utils/constants';
import Autocomplete from '@mui/material/Autocomplete';
import image from '../commons/new_auction.png';
import colors from '../../utils/desgin/Colors';
const brandOptions = BRANDS;
const colorOptions = COLORS;
const fuelTypeOptions = FUEL_TYPES;

const TechnicalInformation = ({
    handleDoorsChange,
    handleGearChange,
    addTag,
    removeTag,
    setBrandValue,
    setColorValue,
    setFuelTypeValue,
    setModelValue,
    setMileage,
    setInputValue,
    setStartingPrice,
    setYears,
    isNextButtonDisabled,
    tags,
    inputValue,
    brandValue,
    colorValue,
    fuelTypeValue,
    setShowAuctionInformation,
}) => {
    return (
        <Box>
            <form>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '50px',
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
                                sx={{
                                    '&.Mui-focused .MuiInputLabel-outlined': {
                                        color: colors.water_green,
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: colors.water_green,
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                                        {
                                            borderColor: colors.water_green,
                                        },
                                }}
                                width="275px"
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
                                sx={{
                                    width: 275,
                                    marginTop: '60px',
                                    '&.Mui-focused .MuiInputLabel-outlined': {
                                        color: colors.water_green,
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: colors.water_green,
                                    },
                                }}
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
                                sx={{
                                    width: 275,
                                    marginTop: '60px',
                                    '&.Mui-focused .MuiInputLabel-outlined': {
                                        color: colors.water_green,
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: colors.water_green,
                                    },
                                }}
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
                                gap: '30px',
                            }}
                        >
                            <TextField
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label="Model"
                                sx={{ width: 300, marginTop: '10px' }}
                                variant="standard"
                                onChange={(e) => setModelValue(e.target.value)}
                                color="water_green"
                                placeholder="Model"
                            />
                            <TextField
                                label="Starting price"
                                sx={{
                                    width: 300,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                placeholder="Starting price"
                                variant="standard"
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                }}
                                onChange={(e) => {
                                    setStartingPrice(e.target.value);
                                }}
                                color="water_green"
                                type="text"
                            />

                            <TextField
                                label="Years"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                placeholder="Years"
                                type="text"
                                sx={{ width: 300 }}
                                variant="standard"
                                onChange={(e) => setYears(e.target.value)}
                                color="water_green"
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                }}
                            />
                            <TextField
                                label="Mileage"
                                sx={{ width: 300 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                placeholder="Mileage"
                                variant="standard"
                                type="text"
                                onChange={(e) => setMileage(e.target.value)}
                                color="water_green"
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                }}
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
                        onClick={(e) => setShowAuctionInformation(true)}
                    >
                        Next
                    </Button>
                </Box>
            </form>
        </Box>
    );
};
export default TechnicalInformation;
