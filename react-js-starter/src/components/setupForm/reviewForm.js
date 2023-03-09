import React, {useState, useContext, useEffect} from "react"
import { Card, CardContent, Button, Grid, Typography, TextField, Dialog, DialogContentText, DialogContent, DialogActions } from "@mui/material"
import { SetupFormContext } from "../../context/setupFormContext";
import ProfileFormStepper from "./profileFormStepper";
import Profile from "../profile";
import { useNavigate } from "react-router-dom";

const ReviewForm = () => {
    const {togglePreviousPage} = useContext(SetupFormContext)
    const [openDialogue, setOpenDialogue] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        pokemonName: "",
        pokemonImg: ""
    })
    const navigate = useNavigate()

    useEffect(()=>{
        // Retrieve selected pokemon
        if (window){
            let data = window.localStorage.getItem("profile-form")
            if (data){
                data = JSON.parse(data)
                setProfile(data)
            }
        }
    }, [])

    const validateForm = () => {
        let data = localStorage.getItem("profile-form")
        
        if (!data){
            return false
        }
        else{
            data = JSON.parse(data)
        }

        if (!data.firstName){
            return false
        }

        if (!data.lastName){
            return false
        }

        if (!data.phone){
            return false
        }

        if (!data.address){
            return false
        }

        if (!data.pokemonName){
            return false
        }

        if (!data.pokemonImg){
            return false
        }

        return true
    }

    const handleFinishButton = () => {
        if (window && validateForm()){
            localStorage.removeItem("profile-form")
            localStorage.removeItem("pokemon")
            localStorage.removeItem("form-step")
            localStorage.setItem("profile", JSON.stringify(profile))
            setSuccess(true)
            setOpenDialogue(true)
        }
        else{
            setOpenDialogue(true)
        }
    }

    const handleOpen = () => {
        setOpenDialogue(true);
    }

    const handleClose = () => {
        setOpenDialogue(false);
    };

    const handleCloseSuccess = () => {
        setOpenDialogue(false)
        navigate("/")
    }

    return (
        <React.Fragment>
            <Card variant="outlined" sx={{minWidth:250, marginTop:3, border:'3px solid'}}>
                <CardContent sx={{justifyContent:"center", textAlign:'center'}}>
                    {/* Form Stepper */}
                    <ProfileFormStepper/>

                    {/* Profile Review */}
                    <Profile {...profile}/>

                    {/* buttons */}
                    <Grid container spacing={2} sx={{justifyContent:"space-between", marginTop:"5px"}}>
                        <Grid item>
                            <Button variant="contained" onClick={togglePreviousPage}>
                                Previous
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button variant="contained" onClick={handleFinishButton}>
                                Finish
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>

                {/* Finish Form Dialogue */}
                { openDialogue &&
                    <Dialog open={handleOpen} onClose={handleClose}>
                        <DialogContent>
                            { success ?
                                <>
                                    <DialogContentText>
                                        Saving profile information was successful. You may close this window or click the button to head to home.
                                    </DialogContentText>
                                    <DialogActions>
                                        <Button onClick={handleCloseSuccess}>Return Home</Button>
                                    </DialogActions>
                                </>
                            :
                                <>
                                    <DialogContentText>
                                        Saving profile information was unsuccessful.
                                    </DialogContentText>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Close</Button>
                                    </DialogActions>
                                </>
                            }
                        </DialogContent>
                    </Dialog>
                }
            </Card>
        </React.Fragment>
    )
}

export default ReviewForm