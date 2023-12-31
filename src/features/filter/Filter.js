import React, { useState } from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    Chip,
    CircularProgress,
    FormControlLabel,
    FormGroup,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import colors from '../../utils/desgin/Colors';
import { useGetAllTagsQuery } from '../../store/auction/tagsApi';
import {
    BRANDS,
    COLORS,
    FUEL_TYPES,
    CAR_DOORS,
    GEAR_SHIFT_TYPES,
} from '../../utils/mocks/constants';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export function Filter({ filterFunct }) {
    const [selectedCarDoors, setSelectedCarDoors] = useState('');
    const [selectedGearShiftType, setSelectedGearShiftType] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedFuelType, setSelectedFuelType] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedPriceMin, setSelectedPriceMin] = useState('');
    const [selectedPriceMax, setSelectedPriceMax] = useState('');
    const [selectedYearsMin, setSelectedYearsMin] = useState('');
    const [selectedYearsMax, setSelectedYearsMax] = useState('');
    const [selectedMileageMin, setSelectedMileageMin] = useState('');
    const [selectedMileageMax, setSelectedMileageMax] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedTagNames, setSelectedTagNames] = useState([]);

    const handleApplyFilters = () => {
        const filter = {};

        if (selectedMileageMin !== '' && selectedMileageMin !== null) {
            filter.milageMin = parseInt(selectedMileageMin);
        }

        if (selectedMileageMax !== '' && selectedMileageMax !== null) {
            filter.milageMax = parseInt(selectedMileageMax);
        }

        if (selectedYearsMin !== '' && selectedYearsMin !== null) {
            filter.modelYearMin = parseInt(selectedYearsMin);
        }

        if (selectedYearsMax !== '' && selectedYearsMax !== null) {
            filter.modelYearMax = parseInt(selectedYearsMax);
        }

        if (selectedPriceMin !== '' && selectedPriceMin !== null) {
            filter.priceMin = parseInt(selectedPriceMin);
        }

        if (selectedPriceMax !== '' && selectedPriceMax !== null) {
            filter.priceMax = parseInt(selectedPriceMax);
        }

        if (selectedBrand !== '' && selectedBrand !== null) {
            filter.brand = selectedBrand.toUpperCase();
        }

        if (selectedColor !== '' && selectedColor !== null) {
            filter.color = selectedColor.toUpperCase();
        }

        if (selectedFuelType !== '' && selectedFuelType !== null) {
            filter.gasType = selectedFuelType.toUpperCase();
        }

        if (selectedCarDoors !== '' && selectedCarDoors !== null) {
            filter.doorsAmount = parseInt(selectedCarDoors);
        }

        if (selectedGearShiftType.length > 0 && selectedGearShiftType !== null) {
            filter.gearShiftType = selectedGearShiftType[0].toUpperCase();
        }

        if (selectedModel !== '' && selectedModel !== null) {
            filter.model = selectedModel.toUpperCase();
        }

        filter.tags = selectedTags; //tags is required, even if blank

        filterFunct(filter);
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
                marginBottom: '25px',
            }}
        >
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {customAutocomplete(BRANDS, 'Brand', setSelectedBrand)}
                {customAutocomplete(COLORS, 'Color', setSelectedColor)}
                {customAutocomplete(FUEL_TYPES, 'Fuel Type', setSelectedFuelType)}
            </Box>
            <Box
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
                    sx={{
                        width: '90%',
                        maxWidth: '400px',
                        height: '56px',
                        margin: 'auto',
                    }}
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
            </Box>
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    paddingLeft: '20px',
                }}
            >
                <Box sx={{ maxHeight: '135px', overflow: 'auto' }}>
                    {customTagsAutocomplete(
                        selectedTags,
                        setSelectedTags,
                        selectedTagNames,
                        setSelectedTagNames,
                    )}
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
                    selectedGearShiftType,
                    setSelectedGearShiftType,
                )}
            </Box>
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
        <Box
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
                <Typography sx={{ textAlign: 'center' }}>{fieldName}</Typography>
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
        </Box>
    );
}

function customTagsAutocomplete(
    selectedTags,
    setSelectedTags,
    selectedTagNames,
    setSelectedTagNames,
) {
    const { data, isLoading, isError } = useGetAllTagsQuery();

    console.log('DATA', data);
    const options = data?.map((tag) => ({ label: tag.tagName, value: tag.id })) || [];

    return (
        <Autocomplete
            multiple
            id="tags-standard"
            color="water_green"
            sx={{
                width: '95%',
                maxWidth: '400px',
                marginX: 'auto',
                '&.Mui-focused .MuiInputLabel-root': {
                    color: colors.water_green,
                },
                '& .MuiFormControl-root': {
                    color: colors.water_green,
                },
            }}
            value={selectedTagNames}
            onChange={(event, values) => {
                setSelectedTagNames(values);
                setSelectedTags(values.map((v) => v.value));
            }}
            options={options}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        variant="outlined"
                        label={option.label}
                        key={index}
                        {...getTagProps({ index })}
                    />
                ))
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Tags"
                    placeholder="Tag"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: isLoading ? (
                            <CircularProgress
                                sx={{
                                    color: 'inherit',
                                    position: 'absolute',
                                    top: '5%',
                                    right: '5%',
                                }}
                                size={22}
                            />
                        ) : isError ? (
                            <ErrorOutlineIcon color="inherit" />
                        ) : null,
                    }}
                />
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
