import React from 'react';
import {
    EditButton,
    EditText,
    EMail,
    EmailRow,
    ImageContainer,
    Phone,
    PhoneRow,
    ProfileCardDiv,
    Username,
} from './styledProfileCard';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
//imagen, username,mail y numero de telefono hardcodeado de momento. Una vez este la api hay que obtener la informacion a traves de userId
export const ProfileCard = ({ canEdit, userId }) => {
    return (
        <ProfileCardDiv>
            <ImageContainer
                src={'https://upload.wikimedia.org/wikipedia/commons/d/d8/Dulce_de_membrillo.jpg'}
            />
            <Username>hola</Username>
            <EmailRow>
                <MailIcon />
                <EMail>example@mail.com</EMail>
            </EmailRow>
            <PhoneRow>
                <PhoneIcon />
                <Phone>+54113232323232</Phone>
            </PhoneRow>
            {canEdit && (
                <EditButton>
                    <Button>
                        <EditText>Edit</EditText>
                    </Button>
                    <EditIcon style={{ color: 'white' }} />
                </EditButton>
            )}
        </ProfileCardDiv>
    );
};
