import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import colors from '../../utils/desgin/Colors';

export function ReplyInput({ authenticatedUserId }) {
    const [reply, setReply] = useState('');
    const [isReplying, setIsReplying] = useState(false);

    const handleReply = () => {
        setIsReplying(true);
    };

    const handleSend = () => {
        setIsReplying(false);
    };

    return (
        <div>
            {!isReplying && (
                <Button
                    variant="contained"
                    style={{
                        backgroundColor: colors.water_green,
                        color: 'white',
                        width: '80px',

                        marginTop: '10px',
                    }}
                    onClick={handleReply}
                >
                    Reply
                </Button>
            )}
            {isReplying && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        padding: '10px',
                        marginTop: '10px',
                    }}
                >
                    <TextField
                        variant="standard"
                        sx={{
                            width: '95%',
                        }}
                        onChange={(e) => setReply(e.target.value)}
                        value={reply}
                        InputProps={{
                            style: {
                                fontSize: '14px',
                                color: '#8c8c8c',
                            },
                        }}
                    />

                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: colors.water_green,
                            color: 'white',
                            width: '80px',
                            marginTop: '15px',
                        }}
                        onClick={handleSend}
                    >
                        Send
                    </Button>
                </div>
            )}
        </div>
    );
}
