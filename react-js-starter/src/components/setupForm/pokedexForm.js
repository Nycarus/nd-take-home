import React, {useContext} from "react";
import { Card, CardContent } from "@mui/material";
import { SetupFormContext } from "../../context/setupFormContext";
import ProfileFormStepper from "./profileFormStepper";

const PokedexForm = () => {
    const {togglePreviousPage, toggleNextPage} = useContext(SetupFormContext)
    return (
        <Card variant="outlined" sx={{minWidth:250, marginTop:3, border:'3px solid'}}>
            <CardContent sx={{justifyContent:"center", textAlign:'center'}}>
                <ProfileFormStepper/>
                2
            </CardContent>
        </Card>
    )
}

export default PokedexForm