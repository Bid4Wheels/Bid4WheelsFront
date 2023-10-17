import React, { useState } from 'react';
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

export function Auction() {
    const auctionId = useParams().auctionId;
    const authenticatedUserId = useSelector((state) => state.user.userId);
    const [window, setWindow] = useState('info');

    const { data, error, isLoading, refetch } = useGetAuctionByIdQuery(auctionId);

    const images = data?.auctionImageUrl.filter((image) => image !== 'default') || [];

    const title = data?.title || '';
    const description = data?.description || '';
    const deadline = data?.deadline || '';
    const auctionOwnerDTO = data?.auctionOwnerDTO || {};
    const creationDate = data?.createdAt || '';
    const topBids = data?.topBids || [];
    const myHighestBid = data?.myHighestBid || null;
    const isAuctionOver = deadline - Date.now() < 0;

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
                                isAuctionOver={isAuctionOver}
                            />
                        ) : (
                            <></>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ padding: '20px', margin: '0 auto', marginTop: '75px' }}>
                {authenticatedUserId === auctionOwnerDTO.id ? (
                    <DangerZone title={title} auctionId={auctionId} />
                ) : (
                    <></>
                )}
                {
                    <BidWidget
                        auctionData={data}
                        userId={authenticatedUserId}
                        ownerId={auctionOwnerDTO.id}
                        topBids={topBids}
                        myHighestBid={myHighestBid}
                        title={title}
                        auctionId={auctionId}
                        reload={refetch}
                    />
                }
            </Grid>
        </Grid>
    );
}
