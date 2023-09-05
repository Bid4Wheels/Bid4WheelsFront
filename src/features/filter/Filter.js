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
            }}
            renderInput={(params) => <TextField {...params} label={label} />}
            onChange={(event, value) => handleItemChange(value)}
        />
    );
}

function customMinMaxField(fieldName, min, max, setMin, setMax) {
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
                        inputProps={{ maxLength: 10 }}
                        fullWidth
                        color="water_green"
                        style={{ marginRight: '8px' }}
                        value={min}
                        onChange={(event) => setMin(event.target.value)}
                    />
                    <span>-</span>
                    <TextField
                        label="Max"
                        variant="standard"
                        inputProps={{ maxLength: 10 }}
                        fullWidth
                        color="water_green"
                        style={{ marginLeft: '8px' }}
                        value={max}
                        onChange={(event) => setMax(event.target.value)}
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
            options={top100Films.map((option) => option.title)}
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

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    {
        title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    {
        title: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
    },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    {
        title: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
    },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
];
