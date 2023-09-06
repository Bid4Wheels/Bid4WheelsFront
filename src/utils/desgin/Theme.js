import { createTheme } from '@mui/material/styles';
import colors from './Colors';

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
        Medium: { fontSize: '24px' },
        Small: { fontSize: '16px' },
        Xsmall: { fontSize: '14px' },
    },
    palette: {
        water_green: {
            main: colors.water_green,
            light: colors.water_green,
            dark: colors.water_green,
            contrastText: '#FFFFFF',
        },
    },
});
export default theme;
