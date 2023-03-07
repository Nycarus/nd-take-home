import React from "react"
import { AppBar, Container, Link, Toolbar, Typography } from "@mui/material"

const Layout = (props) => {
    return(
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    {/* Title */}
                    <Typography variant="h6" component={Link} href="/" sx={{textDecoration: "none", color:"white"}}>
                        PokeDex Form
                    </Typography>

                    {/* Buttons */}
                </Toolbar>
            </AppBar>

            {/* Body */}
            <Container maxWidth="sm">
                {props.children}
            </Container>
            
        </React.Fragment>
    )
    
}

export default Layout