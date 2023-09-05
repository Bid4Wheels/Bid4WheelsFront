import React, { useState } from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    Chip,
    FormControlLabel,
    FormGroup,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import colors from '../../utils/desgin/Colors';
import { BRANDS, COLORS, FUEL_TYPES, CAR_DOORS, GEAR_SHIFT_TYPES } from '../../utils/constants';

export function Filter() {
    const [selectedCarDoors, setSelectedCarDoors] = useState([]);
    const [selectedGearShiftTypes, setSelectedGearShiftTypes] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState([]);
    const [selectedColor, setSelectedColor] = useState([]);
    const [selectedFuelType, setSelectedFuelType] = useState([]);
    const [selectedModel, setSelectedModel] = useState([]);
    const [selectedPriceMin, setSelectedPriceMin] = useState('');
    const [selectedPriceMax, setSelectedPriceMax] = useState('');
    const [selectedYearsMin, setSelectedYearsMin] = useState('');
    const [selectedYearsMax, setSelectedYearsMax] = useState('');
    const [selectedMileageMin, setSelectedMileageMin] = useState('');
    const [selectedMileageMax, setSelectedMileageMax] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    const handleApplyFilters = () => {
        console.log('Selected Car Doors:', selectedCarDoors);
        console.log('Selected Gear Shift Types:', selectedGearShiftTypes);
        console.log('Selected Brand:', selectedBrand);
        console.log('Selected Color:', selectedColor);
        console.log('Selected Fuel Type:', selectedFuelType);
        console.log('Selected Model:', selectedModel);
        console.log('Selected Price Min:', selectedPriceMin);
        console.log('Selected Price Max:', selectedPriceMax);
        console.log('Selected Years Min:', selectedYearsMin);
        console.log('Selected Years Max:', selectedYearsMax);
        console.log('Selected Mileage Min:', selectedMileageMin);
        console.log('Selected Mileage Max:', selectedMileageMax);
        console.log('Selected Tags:', selectedTags);
    };

    return (
        <Grid
            container
            sx={{
                border: '1px solid',
                borderRadius: '5px',
                borderColor: colors.water_green,
                padding: '20px',
                gap: '20px',
                marginTop: '10px',
            }}
        >
            <Grid item sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {customAutocomplete(BRANDS, 'Brand', setSelectedBrand)}
                {customAutocomplete(COLORS, 'Color', setSelectedColor)}
                {customAutocomplete(FUEL_TYPES, 'Fuel Type', setSelectedFuelType)}
            </Grid>
            <Grid
                item
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    textAlign: 'center',
                }}
            >
                {customMinMaxField(
                    'Price',
                    selectedPriceMin,
                    selectedPriceMax,
                    setSelectedPriceMin,
                    setSelectedPriceMax,
                )}
                {customMinMaxField(
                    'Years',
                    selectedYearsMin,
                    selectedYearsMax,
                    setSelectedYearsMin,
                    setSelectedYearsMax,
                )}
                {customMinMaxField(
                    'Mileage',
                    selectedMileageMin,
                    selectedMileageMax,
                    setSelectedMileageMin,
                    setSelectedMileageMax,
                )}
                <TextField
                    label="Model"
                    variant="standard"
                    color="water_green"
                    sx={{ width: '95%', maxWidth: '400px', height: '56px', margin: 'auto' }}
                    onChange={(event) => setSelectedModel(event.target.value)}
                />
                <Box justifyContent="center">
                    <Button
                        variant="contained"
                        color="water_green"
                        sx={{
                            maxWidth: '100px',
                            width: '50%',
                        }}
                        onClick={handleApplyFilters}
                    >
                        Apply
                    </Button>
                </Box>
            </Grid>
            <Grid
                item
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    paddingLeft: '20px',
                }}
            >
                <Box style={{ maxHeight: '250px', overflowY: 'auto' }}>
                    {customTagsAutocomplete(selectedTags, setSelectedTags)}
                </Box>
                {customCheckBoxMapping(
                    'Car Doors',
                    CAR_DOORS,
                    selectedCarDoors,
                    setSelectedCarDoors,
                )}
                {customCheckBoxMapping(
                    'Gear Shift Type',
                    GEAR_SHIFT_TYPES,
                    selectedGearShiftTypes,
                    setSelectedGearShiftTypes,
                )}
            </Grid>
        </Grid>
    );
}

function customAutocomplete(opts, label, setConstant) {
    const handleItemChange = (value) => {
        setConstant(value);
    };

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo-brand"
            options={opts}
            color="water_green"
            sx={{
                width: '95%',
                maxWidth: '400px',
                height: '56px',
                marginX: 'auto',
                '&.Mui-focused .MuiInputLabel-outlined': {
                    color: colors.water_green,
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: colors.water_green,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: colors.water_green,
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: colors.water_green,
                },
            }}
            renderInput={(params) => <TextField {...params} label={label} />}
            onChange={(event, value) => handleItemChange(value)}
        />
    );
}

function customMinMaxField(fieldName, min, max, setMin, setMax) {
    const handleMinChange = (event) => {
        const value = event.target.value.replace(/\D/g, '');
        setMin(value);
    };

    const handleMaxChange = (event) => {
        const value = event.target.value.replace(/\D/g, '');
        setMax(value);
    };

    return (
        <Grid
            container
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyItems: 'center',
                alignItems: 'baseline',
                width: '95%',
                height: '56px',
            }}
        >
            <Grid item xs={4}>
                <Typography>{fieldName}</Typography>
            </Grid>
            <Grid item xs={8}>
                <Box display="flex" alignItems="center">
                    <TextField
                        label="Min"
                        variant="standard"
                        inputProps={{ maxLength: 10, type: 'text', style: { textAlign: 'center' } }}
                        fullWidth
                        color="water_green"
                        style={{ marginRight: '8px' }}
                        value={min}
                        onChange={handleMinChange}
                    />
                    <span>-</span>
                    <TextField
                        label="Max"
                        variant="standard"
                        inputProps={{ maxLength: 10, type: 'text', style: { textAlign: 'center' } }}
                        fullWidth
                        color="water_green"
                        style={{ marginLeft: '8px' }}
                        value={max}
                        onChange={handleMaxChange}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}

function customTagsAutocomplete(selectedTags, setSelectedTags) {
    return (
        <Autocomplete
            multiple
            freeSolo
            color="water_green"
            sx={{
                width: '95%',
                maxWidth: '400px',
                height: '56px',
                marginX: 'auto',
                '&.Mui-focused .MuiInputLabel-root': {
                    color: colors.water_green,
                },
                '& .MuiFormControl-root': {
                    color: colors.water_green,
                },
            }}
            id="tags-standard"
            options={auxList.map((option) => option)}
            value={selectedTags}
            onChange={(event, value) => setSelectedTags(value)}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        variant="outlined"
                        label={option}
                        key={index}
                        {...getTagProps({ index })}
                    />
                ))
            }
            renderInput={(params) => (
                <TextField {...params} variant="standard" label="Tags" placeholder="Tag" />
            )}
        />
    );
}

function customCheckBoxMapping(title, opts, selectedValues, setSelectedValues) {
    const handleCheckBoxChange = (value) => {
        let updatedValues;
        if (selectedValues.includes(value)) {
            updatedValues = [];
        } else {
            updatedValues = [value];
        }
        setSelectedValues(updatedValues);
    };

    return (
        <Grid
            container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '95%',
                justifyContent: 'center',
            }}
        >
            <Typography fontWeight="bold">{title}</Typography>
            <FormGroup
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 'auto',
                }}
            >
                {opts.map((opt) => (
                    <FormControlLabel
                        key={opt}
                        control={
                            <Checkbox
                                color="water_green"
                                checked={selectedValues.includes(opt)}
                                onChange={() => handleCheckBoxChange(opt)}
                            />
                        }
                        label={opt}
                    />
                ))}
            </FormGroup>
        </Grid>
    );
}

const auxList = ['test1', 'test2', 'test3'];
