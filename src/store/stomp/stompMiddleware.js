import { Client } from '@stomp/stompjs';
import { addMessage } from './stompSlice';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

export const stompMiddleware = ({ dispatch }) => {
    //const token = useSelector((state) => state.user.token);
    const token =
        'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOjEsInN1YiI6ImFkc2Rhc2Rhc2RhQGdtYWlsLmNvbSIsImlhdCI6MTY5NzE2MTcxMCwiZXhwIjoxNjk3NzY2NTEwfQ.Lm40ztaspGDPnIgYVqebfi92O7-GXAkzXFLWNP8Mnp4';
    const client = new Client({
        brokerURL: 'ws://localhost:8080/ws',
        debug: function (str) {
            console.log(str);
        },
        reconnectDelay: 300000,
        heartbeatIncoming: 1000,
        heartbeatOutgoing: 1000,
        connectHeaders: {
            Authorization: `Bearer ${token}`,
        },
    });

    client.onConnect = function (frame) {
        console.log('Connected: ' + frame);
        client.subscribe('/auction/153', (message) => {
            // called when the client receives a STOMP message from the server
            if (message.body) {
                dispatch(addMessage(message.body));
                console.log(message.body);
            } else {
                dispatch(addMessage('Got empty message'));
            }
        });
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
                break;
            case 'disconnect':
                client.deactivate();
                break;
            case 'subscribe':
                if (client.connected) {
                    client.subscribe('/auction/' + action.payload.auctionId, (message) => {
                        // called when the client receives a STOMP message from the server
                        if (message.body) {
                            dispatch(addMessage(message.body));
                            console.log(message.body);
                        } else {
                            dispatch(addMessage('Got empty message'));
                        }
                    });
                }
                break;
            default:
                return next(action);
        }
    };
};
