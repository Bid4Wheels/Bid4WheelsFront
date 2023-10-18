import { Client } from '@stomp/stompjs';
import { addBid, clearBids } from './stompSlice';

export const stompMiddleware = ({ dispatch }) => {
    const client = new Client({
        brokerURL: 'ws://localhost:8080/ws',
        debug: function (str) {
            console.log(str);
        },
        reconnectDelay: 1000,
        heartbeatIncoming: 1000,
        heartbeatOutgoing: 1000,
    });

    client.onConnect = function (frame) {
        console.log('Connected: ' + frame);
    };
    client.onStompError = function (frame) {
        // Will be invoked in case of error encountered at Broker
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    };

    return (next) => (action) => {
        switch (action.type) {
            case 'connect':
                client.activate();
                client.onConnect = function (frame) {
                    console.log(action.payload);
                    client.subscribe(`/auction/${action.payload}`, function (message) {
                        dispatch(addBid(message.body));
                        console.log(message.body);
                    });
                };
                break;
            case 'disconnect':
                dispatch(clearBids());
                client.deactivate();
                break;
            default:
                return next(action);
        }
    };
};
