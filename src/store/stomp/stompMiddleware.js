import { Client } from '@stomp/stompjs';
import { addMessage } from './stompSlice';

export const stompMiddleware = ({ dispatch }) => {
    const client = new Client({
        brokerURL: 'ws://localhost:8080/ws',
        debug: function (str) {
            console.log(str);
        },
        reconnectDelay: 300000,
        heartbeatIncoming: 1000,
        heartbeatOutgoing: 1000,
        connectHeaders: {
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOjEsInN1YiI6ImFkc2Rhc2Rhc2RhQGdtYWlsLmNvbSIsImlhdCI6MTY5Njk2MDcwMywiZXhwIjoxNjk3NTY1NTAzfQ.3LuLUABT-3znmXXObtYKfG3QEs1FqYVV_7sZhKVleRk',
        },
    });

    client.onConnect = function (frame) {
        console.log('Connected: ' + frame);
        // client.subscribe('/auction/1', (message) => {
        //     // called when the client receives a STOMP message from the server
        //     if (message.body) {
        //         dispatch(addMessage(message.body));
        //     } else {
        //         dispatch(addMessage('Got empty message'));
        //     }
        // });
    };

    client.onStompError = function (frame) {
        // Will be invoked in case of error encountered at Broker
        console.log('ERROR');
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
            case 'send':
                client.publish({
                    destination: action.destination,
                    body: JSON.stringify(action.payload),
                });
                break;
            default:
                return next(action);
        }
    };
};
