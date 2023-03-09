import {useState, useContext, useEffect} from "react"
import { Card, CardContent, Button, Grid, Typography, TextField } from "@mui/material"
import { SetupFormContext } from "../../context/setupFormContext";
import ProfileFormStepper from "./profileFormStepper";
import Profile from "../profile";
import { useNavigate } from "react-router-dom";

const ReviewForm = () => {
    const {togglePreviousPage} = useContext(SetupFormContext)
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

    const handleFinishButton = () => {
        if (window){
            localStorage.removeItem("profile-form")
            localStorage.removeItem("pokemon")
            localStorage.removeItem("form-step")
            localStorage.setItem("profile", JSON.stringify(profile))
            navigate("/")
        }
    }

    return (
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
        </Card>
    )
}

export default ReviewForm