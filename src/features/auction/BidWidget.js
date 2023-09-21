import { Box, Typography, Modal, Tooltip, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PlaceBidImg from '../commons/PlaceBidImg.png';
import colors from '../../utils/desgin/Colors';

export function BidWidget({ auctionData, userId, ownerId, highestBidDTO, title }) {
    const [myBid, setMyBid] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBidChange = (event) => {
        event.preventDefault();
        const value = event.target.value.replace(/\D/g, '');
        setMyBid(value);
    };

    const isBidValid =
        !isNaN(parseInt(myBid)) && parseInt(myBid) >= auctionData.basePrice && checkHighestBid();

    function checkHighestBid() {
        return highestBidDTO.amount ? myBid > highestBidDTO.amount : true;
    }

    const handlePlaceBid = () => {
        console.log('Bid placed: ' + myBid); // Upload bid to backend when the functionality is available
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const isOwner = userId === ownerId;
    console.log(isOwner);

    return (
        <Box
            sx={{
                width: '70%',
                border: `1px solid ${colors.water_green}`,
                margin: 'auto',
                borderRadius: '10px',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexDirection: 'column',
                textAlign: 'center',
                minWidth: '200px',
                height: isOwner ? '350px' : '450px',
            }}
        >
            <Typography
                variant="XLarge"
                sx={{
                    fontWeight: 700,
                    color: colors.water_green,
                    marginBottom: '15px',
                }}
            >
                Bids
            </Typography>
            <Typography variant="Medium" fontWeight={700}>
                Highest Bid:
            </Typography>
            <Typography variant="Medium">
                {highestBidDTO && highestBidDTO.amount
                    ? '$' + highestBidDTO.amount
                    : 'No one has bid yet'}
            </Typography>
            {isOwner ? (
                <>
                    <Typography variant="SemiSmall" fontWeight={700} marginY="15px">
                        Last Bids
                    </Typography>
                    {/* Map top 5 highest bids, next is a placeholder */}
                    {[
                        { name: 'Chino', amount: '999999' },
                        { name: 'Testing', amount: '12520' },
                        { name: 'Alan', amount: '1001' },
                        { name: 'Test', amount: '1000' },
                        { name: 'Lucho', amount: '3' },
                        // Add more bids here
                    ].map((bid, index) => (
                        <Box
                            key={index}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                justifyContent: 'space-between',
                                width: '90%',
                                color: index == 0 ? colors.water_green : 'black',
                                marginBottom: '5px',
                            }}
                            justifyItems="space-between"
                        >
                            <Typography
                                variant="SemiSmall"
                                style={{
                                    textAlign: 'left',
                                    color: 'inherit',
                                    opacity: index == 4 ? '50%' : '100%',
                                }}
                            >
                                {bid.name}
                            </Typography>
                            <Typography
                                variant="SemiSmall"
                                style={{
                                    textAlign: 'right',
                                    color: 'inherit',
                                    opacity: index == 4 ? '50%' : '100%',
                                }}
                            >
                                ${bid.amount}
                            </Typography>
                        </Box>
                    ))}
                </>
            ) : (
                <>
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
                        placeholder={`Starting at $${auctionData.basePrice}`}
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
                                maxWidth: '120px',
                                width: '70%',
                                marginY: '30px',
                                height: '30px',
                            }}
                        >
                            <Button
                                variant="contained"
                                color="water_green"
                                sx={{
                                    maxWidth: '150px',
                                }}
                                onClick={handleModalOpen}
                                disabled={!isBidValid}
                            >
                                PLACE BID
                            </Button>
                        </Box>
                    </Tooltip>
                </>
            )}
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
                    <Typography sx={{ fontSize: '25px', fontWeight: 660 }}>Confirm bid</Typography>
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
