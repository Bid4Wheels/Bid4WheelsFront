import React, { useState } from 'react';
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
} from '@mui/material';
import colors from '../../utils/desgin/Colors';
import image from '../commons/new_auction.png';

import Autocomplete from '@mui/material/Autocomplete';

// Sample data sources
const brandOptions = ['Brand 1', 'Brand 2', 'Brand 3'];
const colorOptions = ['Red', 'Blue', 'Green'];
const fuelTypeOptions = ['Gasoline', 'Diesel', 'Electric'];

const CreateAuction = () => {
    const [selectedDoors, setSelectedDoors] = useState('2');
    const [selectedGear, setSelectedGear] = useState('');
    const handleDoorsChange = (event) => {
        setSelectedDoors(event.target.value);
    };
    const handleGearChange = (event) => {
        setSelectedGear(event.target.value);
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
                    <Button variant="text" sx={{ color: colors.water_green }}>
                        <Typography variant="SemiSmall">X Cancel</Typography>
                    </Button>
                </Box>
            </Box>
            <form>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '60px',
                        marginLeft: '80px',
                        flexWrap: 'wrap',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            flex: 1,
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
                                id="combo-box-demo"
                                options={brandOptions}
                                sx={{ width: 275 }}
                                renderInput={(params) => <TextField {...params} label="Brand" />}
                            />
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={colorOptions}
                                sx={{ width: 275, marginTop: '60px' }}
                                renderInput={(params) => <TextField {...params} label="Color" />}
                            />
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={fuelTypeOptions}
                                sx={{ width: 275, marginTop: '60px' }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Fuel Type" />
                                )}
                            />
                            <FormControl sx={{ marginTop: '50px' }}>
                                <FormLabel
                                    id="demo-row-radio-buttons-group-label"
                                    sx={{ color: 'inherit', fontWeight: 'bold' }}
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
                                marginBottom: '285px',
                            }}
                        >
                            <TextField
                                label="Model"
                                sx={{ width: 300, height: '100%', marginTop: '10px' }}
                                variant="standard"
                            />
                            <TextField
                                label="Starting price"
                                sx={{
                                    width: 300,
                                    marginTop: '69px',
                                    height: '100%',
                                }}
                                variant="standard"
                                defaultValue="Starting price"
                                type="number"
                            />
                            <TextField
                                label="Years"
                                sx={{ width: 300, marginTop: '69px', height: '100%' }}
                                variant="standard"
                                type="number"
                            />
                            <TextField
                                label="Mileage"
                                sx={{ width: 300, marginTop: '60px', height: '100%' }}
                                variant="standard"
                                type="number"
                            />
                        </Box>
                        <img
                            src={image} // Replace with your image source
                            alt="Auction Image"
                            style={{ width: '451px', height: '377px', marginLeft: '80px' }}
                        />
                    </Box>
                </Box>
            </form>
        </Box>
    );
};

export default CreateAuction;
