import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Theme = (props) => {
    const theme = createTheme({
        palette: {
            primary: {
                main:"#e3350d",
                contrastText: '#fff'
            },
            secondary: {
                main: '#301b70',
                contrastText: '#fff'
            }
        }
    })

    return (
        <StyledEngineProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {props.children}
            </ThemeProvider>
        </StyledEngineProvider>
    )
}

export default Theme