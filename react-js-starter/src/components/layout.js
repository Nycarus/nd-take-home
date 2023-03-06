import React from "react"
import { AppBar, Toolbar, Typography } from "@mui/material"

const Layout = (props) => {
    return(
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    {/* Title */}
                    <Typography variant="h6" nowrap component="a" href="/">
                        PokeDex Form
                    </Typography>

                    {/* Buttons */}
                </Toolbar>
            </AppBar>

            {/* Body */}
            <div>
                {props.children}
            </div>
            
        </React.Fragment>
    )
    
}

export default Layout