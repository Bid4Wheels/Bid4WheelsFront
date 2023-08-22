import styled from 'styled-components';
import '@fontsource/roboto';
export const Wrapper = styled.div`
    padding: 5%;
    .GreenButton {
        background-color: #00d591 !important;
        box-shadow:
            0px 3px 1px -2px rgba(0, 0, 0, 0.2),
            0px 2px 2px 0px rgba(0, 0, 0, 0.14),
            0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        font-family: 'Roboto';
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px; /* 171.429% */
        letter-spacing: 0.4px;
        text-transform: uppercase;
    }
    .GreenOutlinedButton {
        color: #00d591 !important;
        border-color: #00d591 !important;
        font-family: 'Roboto';
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px; /* 171.429% */
        letter-spacing: 0.4px;
        text-transform: uppercase;
    }
`;
export const Header = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 0.05%;
`;
export const ButtonsContainer = styled.div`
    display: flex;
    gap: 17px;
    flex-direction: row;
`;
export const DataContainer = styled.div`
    display: flex;
`;
