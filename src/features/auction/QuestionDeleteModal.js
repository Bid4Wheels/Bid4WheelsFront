import { Modal } from '@mui/material';
import React from 'react';

export function QuestionDeleteModal({ open, onClose }) {
    return <Modal open={open} onClose={onClose}></Modal>;
}
