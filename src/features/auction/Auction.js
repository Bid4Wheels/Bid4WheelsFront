import React, { useState } from 'react';
import {
    Grid,
    Typography,
    Chip,
    Box,
    Toolbar,
    Button,
    Paper,
    Tooltip,
    TextField,
    Skeleton,
    Alert,
    AlertTitle,
    Modal,
} from '@mui/material';
import { useParams } from 'react-router';
import {
    differenceInHours,
    differenceInDays,
    differenceInMinutes,
    differenceInSeconds,
} from 'date-fns';
import car1 from '../commons/temp/car1.jpeg';
import car2 from '../commons/temp/car2.jpeg';
import car3 from '../commons/temp/car3.jpeg';
import car4 from '../commons/temp/car4.jpeg';
import car5 from '../commons/temp/car5.jpg';
import { TechnicalInfo } from './TechnicalInfo';
import { ImageCarousel } from './ImageCarousel';
import colors from '../../utils/desgin/Colors';
import { useGetAuctionByIdQuery } from '../../store/auction/auctionApi';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import PlaceBidImg from '../commons/PlaceBidImg.png';

export function Auction() {
    const userId = useSelector((state) => state.user.userId);
    const id = useParams().auctionId;
    const [window, setWindow] = useState('info');
    const [myBid, setMyBid] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBidChange = (event) => {
        event.preventDefault();
        const value = event.target.value.replace(/\D/g, '');
        setMyBid(value);
    };

    const { data, error, isLoading } = useGetAuctionByIdQuery(id);

    const images = [car1, car2, car3, car4, car5];
    const tags = ['Sedan', 'Low mileage', 'Great condition', 'One owner'];

    const title = data?.title || '';
    const description = data?.description || '';
    const deadline = data?.deadline || '';
    const auctionOwnerDTO = data?.auctionOwnerDTO || {};
    const auctionHigestBidDTO = data?.auctionHighestBidDTO || {};

    const now = new Date();
    const timeDifferenceInHours = differenceInHours(new Date(deadline), now);
    const timeDifferenceInMinutes = differenceInMinutes(new Date(deadline), now);
    const timeDifferenceInSeconds = differenceInSeconds(new Date(deadline), now);
    const timeDifferenceInDays = differenceInDays(new Date(deadline), now);

    let timerColor = colors.green;
    if (timeDifferenceInDays < 0) {
        timerColor = colors.grey;
    } else if (timeDifferenceInDays < 1) {
        timerColor = colors.yellow;
        if (timeDifferenceInHours < 1) {
            timerColor = colors.red;
        }
    }

    const handlePlaceBid = () => {
        console.log('Bid placed: ' + myBid); //should be changed when functionality is available
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    function BidWidget() {
        const isBidValid =
            !isNaN(parseInt(myBid)) && parseInt(myBid) >= data.basePrice && checkHighestBid();

        function checkHighestBid() {
            if (auctionHigestBidDTO.amount) {
                return myBid > auctionHigestBidDTO.amount;
            } else {
                return true;
            }
        }

        if (userId == auctionOwnerDTO.id) {
            return (
                <Box
                    sx={{
                        width: '70%',
                        border: `1px solid ${colors.water_green}`,
                        margin: 'auto',
                        marginTop: '60px',
                        borderRadius: '10px',
                        padding: '20px',
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        flexDirection: 'column',
                        minWidth: '200px',
                    }}
                >
                    <Typography
                        variant="XLarge"
                        sx={{ fontWeight: 700, color: colors.water_green, marginBottom: '15px' }}
                    >
                        Bids
                    </Typography>
                    <Typography variant="Medium" fontWeight={700}>
                        Highest Bid:
                    </Typography>
                    <Typography variant="Medium">
                        {auctionHigestBidDTO && auctionHigestBidDTO.amount
                            ? '$' + auctionHigestBidDTO.amount
                            : 'No one has bid yet'}
                    </Typography>
                    <Typography variant="SemiSmall" fontWeight={700} marginY="15px">
                        Last Bids
                    </Typography>
                    {/* map top 5 highest bids, next is placeholder*/}
                    <Box
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            justifyContent: 'space-between',
                            width: '90%',
                            color: colors.water_green,
                            marginBottom: '5px',
                        }}
                        justifyItems="space-between"
                    >
                        <Typography
                            variant="SemiSmall"
                            style={{ textAlign: 'left', color: 'inherit' }}
                        >
                            Chino
                        </Typography>
                        <Typography
                            variant="SemiSmall"
                            style={{ textAlign: 'right', color: 'inherit' }}
                        >
                            $999999
                        </Typography>
                    </Box>
                    <Box
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            justifyContent: 'space-between',
                            width: '90%',
                            marginBottom: '5px',
                        }}
                        justifyItems="space-between"
                    >
                        <Typography
                            variant="SemiSmall"
                            style={{ textAlign: 'left', color: 'inherit' }}
                        >
                            Testing
                        </Typography>
                        <Typography
                            variant="SemiSmall"
                            style={{ textAlign: 'right', color: 'inherit' }}
                        >
                            $12520
                        </Typography>
                    </Box>
                </Box>
            );
        } else {
            return (
                <Box
                    sx={{
                        width: '70%',
                        border: `1px solid ${colors.water_green}`,
                        margin: 'auto',
                        marginTop: '60px',
                        borderRadius: '10px',
                        padding: '20px',
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        flexDirection: 'column',
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        variant="XLarge"
                        sx={{ fontWeight: 700, color: colors.water_green, marginBottom: '15px' }}
                    >
                        Bids
                    </Typography>
                    <Typography variant="Medium" fontWeight={700}>
                        Highest Bid:
                    </Typography>
                    <Typography variant="Medium">
                        {auctionHigestBidDTO && auctionHigestBidDTO.amount
                            ? '$' + auctionHigestBidDTO.amount
                            : 'No one has bid yet'}
                    </Typography>
                    {/*next line should check if user has bid already */}
                    <Typography variant="SemiSmall" marginY="30px">
                        {/*eslint-disable-next-line react/no-unescaped-entities*/}
                        You haven't made an offer yet!
                    </Typography>
                    <Typography variant="SemiSmall" fontWeight={700} marginBottom="15px">
                        Make your offer
                    </Typography>
                    <TextField
                        variant="standard"
                        inputProps={{
                            maxLength: 200,
                            type: 'text',
                            style: { textAlign: 'center' },
                        }}
                        width="100%"
                        color="water_green"
                        value={myBid}
                        onChange={handleBidChange}
                        placeholder={`Starting at $${data.basePrice}`}
                    />
                    <Tooltip
                        title={
                            isBidValid
                                ? ''
                                : 'Bid amount must be greater than both starting price and highest bid'
                        }
                    >
                        <Box
                            sx={{
                                maxWidth: '100px',
                                width: '70%',
                                marginY: '30px',
                                height: '30px',
                            }}
                        >
                            <Button
                                variant="contained"
                                color="water_green"
                                sx={{
                                    maxWidth: '100px',
                                }}
                                onClick={handleModalOpen}
                                disabled={!isBidValid}
                            >
                                PLACE BID
                            </Button>
                        </Box>
                    </Tooltip>
                    <Modal
                        open={isModalOpen}
                        onClose={handleModalClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                borderRadius: '10px',
                                backgroundColor: '#fff',
                                width: '500px',
                                height: '500px',
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}
                        >
                            <CloseIcon
                                sx={{
                                    opacity: '50%',
                                    position: 'relative',
                                    left: '230px',
                                    cursor: 'pointer',
                                    mt: '7px',
                                    '&:hover': {
                                        opacity: '100%',
                                    },
                                }}
                                onClick={handleModalClose}
                            />
                            <img
                                src={PlaceBidImg}
                                alt="Place Bid"
                                style={{
                                    width: '320px',
                                    height: '320px',
                                    objectFit: 'contain',
                                }}
                            />
                            <Typography sx={{ fontSize: '25px', fontWeight: 660 }}>
                                Confirm bid
                            </Typography>
                            <Typography sx={{ fontSize: '15px' }}>
                                Please confirm if you want to place this bid
                            </Typography>
                            <Typography sx={{ mb: '15px', fontWeight: 620 }}>
                                ${myBid} for {title}
                            </Typography>
                            <Box sx={{ mb: '20px' }}>
                                <Button
                                    variant="contained"
                                    onClick={handleModalClose}
                                    style={{ backgroundColor: 'grey', marginRight: '10px' }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: colors.water_green,
                                        '&:hover': {
                                            backgroundColor: colors.water_green,
                                        },
                                    }}
                                    onClick={handlePlaceBid}
                                >
                                    Bid
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
            );
        }
    }

    if (isLoading) {
        return (
            <Grid
                container
                sx={{
                    gap: 2,
                    padding: '30px',
                    paddingTop: '10px',
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', sm: 'row' },
                }}
            >
                <Grid item xs={12} sm={7} sx={{ padding: '20px' }}>
                    <Box>
                        <Typography variant="h1">
                            <Skeleton />
                        </Typography>
                    </Box>

                    <Box item>
                        <Skeleton variant="rectangular" width="100%" height="300px" />
                    </Box>
                    <Box
                        item
                        sx={{
                            marginTop: '10px',
                        }}
                    >
                        <Skeleton variant="rectangular" width="100%" height="100px" />
                    </Box>
                    <Box
                        item
                        sx={{
                            marginTop: '10px',
                        }}
                    >
                        <Skeleton variant="rectangular" width="100%" height="300px" />
                    </Box>
                </Grid>
            </Grid>
        );
    }

    if (error) {
        return (
            <div>
                <Alert severity="error" sx={{ margin: '2rem' }}>
                    <AlertTitle>Error</AlertTitle>
                    <strong>{error.data}</strong>
                </Alert>
            </div>
        );
    }

    return (
        <Grid
            container
            sx={{
                gap: 2,
                padding: '30px',
                paddingTop: '10px',
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', sm: 'row' },
            }}
        >
            <Grid item xs={12} sm={7} sx={{ padding: '20px' }}>
                <Box>
                    <Typography variant="h3" fontWeight={500}>
                        {title.toUpperCase()}
                    </Typography>
                </Box>

                <Box
                    item
                    sx={{
                        marginTop: '10px',
                    }}
                >
                    <ImageCarousel images={images} />
                </Box>
                <Box
                    sx={{
                        backgroundColor: timerColor,
                        borderRadius: '5px',
                        padding: '6px 15px',
                        width: '95%',
                    }}
                >
                    <Typography sx={{ fontWeight: 400, fontSize: '18px' }}>
                        Time Left: {timeDifferenceInHours}:
                        {timeDifferenceInMinutes < 10
                            ? `0${timeDifferenceInMinutes}`
                            : `${timeDifferenceInMinutes % 60}`}
                        :
                        {timeDifferenceInSeconds < 10
                            ? `0${timeDifferenceInSeconds % 60}`
                            : `${timeDifferenceInSeconds % 60}`}
                    </Typography>
                </Box>
                <Grid
                    container
                    sx={{ marginTop: 1, alignItems: 'center', padding: '10px' }}
                    spacing={1}
                >
                    <Typography variant="h5">Tags:</Typography>
                    {tags.map((tag) => (
                        <Grid item key={tag}>
                            <Chip
                                label={tag}
                                size="medium"
                                sx={{
                                    backgroundColor: colors.water_green,
                                    color: 'white',
                                    fontSize: '15px',
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Typography sx={{ margin: '15px' }}>{description}</Typography>
                <Grid
                    container
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    <Toolbar
                        sx={{ borderBottom: `1px solid ${colors.water_green} `, width: '100%' }}
                    >
                        <Button
                            variant="text"
                            sx={{
                                color: 'black',
                                cursor: 'pointer',
                                fontSize: '16px',
                                padding: '0',
                                margin: '0',
                                fontWeight: window === 'info' ? 650 : 400,
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                            }}
                            onClick={() => setWindow('info')}
                        >
                            Auction Info
                        </Button>
                        <Button
                            variant="h7"
                            sx={{
                                color: 'black',
                                cursor: 'pointer',
                                ml: '1rem',
                                padding: '0',
                                fontSize: '16px',
                                fontWeight: window === 'questions' ? 650 : 400,
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                            }}
                            onClick={() => setWindow('questions')}
                        >
                            Questions & Comments
                        </Button>
                    </Toolbar>
                    <Grid container>
                        {window === 'info' ? (
                            <TechnicalInfo info={data} user={auctionOwnerDTO} />
                        ) : (
                            <Typography>Questions & Comments</Typography>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ padding: '20px', margin: '0 auto' }}>
                {<BidWidget isUsers={userId == auctionOwnerDTO.id} />}
            </Grid>
        </Grid>
    );
}
