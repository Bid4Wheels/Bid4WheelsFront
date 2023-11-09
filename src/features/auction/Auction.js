import React, { useState, useEffect } from 'react';
import {
    Grid,
    Typography,
    Chip,
    Box,
    Toolbar,
    Button,
    Skeleton,
    Alert,
    AlertTitle,
} from '@mui/material';
import { useParams } from 'react-router';
import { TechnicalInfo } from './TechnicalInfo';
import { ImageCarousel } from './ImageCarousel';
import colors from '../../utils/desgin/Colors';
import { useGetAuctionByIdQuery } from '../../store/auction/auctionApi';
import { useSelector } from 'react-redux';
import { DangerZone } from './DeleteWidget';
import { BidWidget } from './BidWidget';
import { TimeBar } from '../commons/TimeBar';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { QuestionsContainer } from './QuestionsContainer';
import { connectStomp, disconnectStomp } from '../../store/stomp/stompSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import JSConfetti from 'js-confetti';

export function Auction() {
    const nav = useNavigate();
    const auctionId = useParams().auctionId;
    const authenticatedUserId = useSelector((state) => state.user.userId);
    const [window, setWindow] = useState('info');

    const { data, error, isLoading, refetch: refetch } = useGetAuctionByIdQuery(auctionId);

    const images = data?.auctionImageUrl.filter((image) => image !== 'default') || [];
    const title = data?.title || '';
    const description = data?.description || '';
    const deadline = data?.deadline || '';
    const auctionOwnerDTO = data?.auctionOwnerDTO || {};
    const creationDate = data?.createdAt || '';
    const topBids = data?.topBids || [];
    const myHighestBid = data?.myHighestBid || null;

    const newBids = useSelector((state) => state.stomp.bids);
    const parsedBids = newBids.map((bid) => {
        const amount = JSON.parse(bid).amount;
        const userName = `${JSON.parse(bid).firstName} ${JSON.parse(bid).lastName}`;
        return { amount, userName };
    });

    const mergedBids = [...parsedBids, ...topBids];
    const sortedBids = mergedBids.sort((a, b) => b.amount - a.amount);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(connectStomp(auctionId));

        return () => {
            dispatch(disconnectStomp());
        };
    }, [dispatch]);
    const isDeadlineFinished = new Date(deadline) > new Date();

    const isAuctionOver = new Date(deadline) < new Date();
    function showConfetti(emojis, confettiColors) {
        const confetti = new JSConfetti();
        confetti.addConfetti({
            emojis: emojis,
            confettiColors: confettiColors,
            confettiNumber: emojis.length > 0 ? 100 : 500,
        });
    }

    useEffect(() => {
        if (isAuctionOver) {
            if (auctionOwnerDTO.id === authenticatedUserId) {
                showConfetti(['🎉', '🎊', '🎈'], [colors.red, colors.water_green, '#0000ff']);
            } else if (myHighestBid === null) {
                showConfetti([], ['#00ff00', '#ffffff']);
            } else if (myHighestBid === data.topBids[0].amount) {
                showConfetti(['🎉', '🎊', '🎈'], [colors.red, colors.water_green]);
            } else {
                showConfetti(['😢', '😭'], ['#000101', colors.grey, '#ffffff']);
            }
        }
    }, [isAuctionOver]);

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
                {nav('*')}
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
            <Grid item xs={12} sm={7.5} sx={{ padding: '20px' }}>
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
                        height: '32.5px',
                        paddingTop: '0.5rem',
                    }}
                >
                    <TimeBar creationDate={creationDate} deadline={deadline} />
                </Box>
                <Grid
                    container
                    sx={{ marginTop: 1, alignItems: 'center', padding: '10px' }}
                    spacing={1}
                >
                    <Typography variant="h5">Tags:</Typography>
                    {data.tags.map((tag) => (
                        <Grid item key={tag.tagName}>
                            <Chip
                                label={capitalizeFirstLetter(tag.tagName)}
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
                            <></>
                        )}
                        {window === 'questions' ? (
                            <QuestionsContainer
                                auctionId={auctionId}
                                authenticatedUserId={authenticatedUserId}
                                ownerId={auctionOwnerDTO.id}
                                isDeadlineFinished={isDeadlineFinished}
                            />
                        ) : (
                            <></>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ padding: '20px', margin: '0 auto', marginTop: '75px' }}>
                {authenticatedUserId === auctionOwnerDTO.id && isDeadlineFinished ? (
                    <DangerZone title={title} auctionId={auctionId} />
                ) : (
                    <></>
                )}
                {
                    <BidWidget
                        auctionData={data}
                        userId={authenticatedUserId}
                        ownerId={auctionOwnerDTO.id}
                        topBids={sortedBids}
                        myHighestBid={myHighestBid}
                        title={title}
                        auctionId={auctionId}
                        reload={refetch}
                        isDeadlineFinished={isDeadlineFinished}
                    />
                }
            </Grid>
        </Grid>
    );
}
