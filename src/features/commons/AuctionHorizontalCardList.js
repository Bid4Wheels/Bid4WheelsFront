import React, { useState, useRef, useEffect } from 'react';
import AuctionCard from './AuctionCard';
import { ArrowBackIosNewRounded, ArrowForwardIosRounded } from '@mui/icons-material';

const AuctionHorizontalCardList = ({ auctionList }) => {
    const [auctions, setAuctions] = useState([
        {
            endDate: new Date('2023-09-10T18:30:00'),
            image: 'https://example.com/car1.jpg',
            carName: 'Luxury Sedan',
            tags: ['Luxury', 'Sedan', 'Auction'],
        },
        {
            endDate: new Date('2023-09-15T20:00:00'),
            image: 'https://example.com/car2.jpg',
            carName: 'Sports Coupe',
            tags: ['Sports', 'Coupe', 'Auction'],
        },
        {
            endDate: new Date('2023-09-20T12:45:00'),
            image: 'https://example.com/car3.jpg',
            carName: 'Classic Convertible',
            tags: ['Classic', 'Convertible', 'Auction'],
        },
        {
            endDate: new Date('2023-09-25T16:15:00'),
            image: 'https://example.com/car4.jpg',
            carName: 'Electric Hatchback',
            tags: ['Electric', 'Hatchback', 'Auction'],
        },
        {
            endDate: new Date('2023-09-25T16:15:00'),
            image: 'https://example.com/car4.jpg',
            carName: 'Electric Hatchback',
            tags: ['Electric', 'Hatchback', 'Auction'],
        },
    ]);
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
                            endDate={auction.endDate}
                            image={auction.image}
                            carName={auction.carName}
                            tags={auction.tags}
                        />
                    ))}
                </div>
                <ArrowForwardIosRounded onClick={() => handleScroll('right')} />
            </div>
        </div>
    );
};

export default AuctionHorizontalCardList;
