import { ratingClasses } from '@mui/material';
import colors from './Colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        XxLarge: { fontSize: '50px' },
        XLarge: { fontSize: '40px' },
        Large: { fontSize: '32px' },
        Medium: { fontSize: '24px' },
        SemiSmall: { fontSize: '20px' },
        Small: { fontSize: '16px' },
        Xsmall: { fontSize: '14px' },
        ButtonTypography: { fontSize: '15px' },
    },
    palette: {
        water_green: {
            main: colors.water_green,
            light: colors.water_green,
            dark: colors.water_green,
            contrastText: '#FFFFFF',
        },
        grey: {
            main: colors.black_grey,
            light: colors.black_grey,
            dark: colors.black_grey,
            contrastText: '#FFFFFF',
        },
    },
    components: {
        MuiRating: {
            styleOverrides: {
                root: {
                    [`&.${ratingClasses.disabled}`]: {
                        opacity: 1,
                    },
                },
            },
        },
    },
});

export default theme;
