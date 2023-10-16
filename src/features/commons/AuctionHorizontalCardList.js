import React, { useState, useRef, useEffect } from 'react';
import AuctionCard from './AuctionCard';
import { ArrowBackIosNewRounded, ArrowForwardIosRounded } from '@mui/icons-material';

const AuctionHorizontalCardList = ({ auctionList }) => {
    const [auctions, setAuctions] = useState([]);
    useEffect(() => {
        if (auctionList) {
            setAuctions(auctionList);
        }
    });

    const cardContainerRef = useRef(null);
    const cardWidth = 341;

    const handleScroll = (direction) => {
        const container = cardContainerRef.current;
        if (container) {
            const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
            container.scrollLeft += scrollAmount;
        }
    };

    const handleWheelScroll = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ArrowBackIosNewRounded onClick={() => handleScroll('left')} />
                <div
                    ref={cardContainerRef}
                    style={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        overflowX: 'hidden',
                        scrollBehavior: 'smooth',
                    }}
                    onWheel={handleWheelScroll}
                >
                    {auctions.map((auction, index) => (
                        <AuctionCard
                            key={index}
                            id={auction.id}
                            creationDate={new Date(auction.createdAt)}
                            endDate={new Date(auction.deadline)}
                            image={auction.firstImageUrl}
                            carName={auction.title}
                            tags={auction.tagNames}
                        />
                    ))}
                </div>
                <ArrowForwardIosRounded onClick={() => handleScroll('right')} />
            </div>
        </div>
    );
};

export default AuctionHorizontalCardList;
