import styled from 'styled-components';
import '@fontsource/roboto';
export const ProfileCardDiv = styled.div`
    width: 389px;
    height: 839px;
    display: flex;
    gap: 26px;
    flex-direction: column;
    border-radius: 47px;
    border: 3px solid #00d591;
    background: #fff;
    align-items: center;
    justify-content: center;
`;
export const ImageContainer = styled.img`
    align-self: center;
    width: 274px;
    height: 274px;
    flex-shrink: 0;
    border-radius: 75%;
`;
export const Username = styled.div`
    color: #000;
    font-feature-settings:
        'clig' off,
        'liga' off;
    font-family: Roboto;
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: 26px; /* 65% */
    letter-spacing: 0.46px;
`;
export const EmailRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 13px;
    overflow: auto;
`;
export const EMail = styled.div`
    width: 230px;
    height: 37px;
    flex-shrink: 0;
    color: #000;
    font-feature-settings:
        'clig' off,
        'liga' off;
    font-family: Roboto;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 26px; /* 108.333% */
    letter-spacing: 0.46px;
    text-decoration-line: underline;
`;
export const PhoneRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    overflow: auto;
`;
export const Phone = styled.div`
    width: 217px;
    height: 27px;
    flex-shrink: 0;
    flex-direction: row;
    color: #000;
    font-feature-settings:
        'clig' off,
        'liga' off;
    font-family: Roboto;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 26px; /* 108.333% */
    letter-spacing: 0.46px;
`;
export const EditButton = styled.button`
    display: flex;
    width: 100px;
    height: 49px;
    padding: 6px 16px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 4px;
    background: var(--main-color, #00d591);
    /* elevation/2 */
    box-shadow:
        0px 3px 1px -2px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14),
        0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    border: none;
`;
export const EditText = styled.div`
    color: #fff;
    /* components/button-medium */
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 171.429% */
    letter-spacing: 0.4px;
    text-transform: uppercase;
`;
