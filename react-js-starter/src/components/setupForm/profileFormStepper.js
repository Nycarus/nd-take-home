import { useContext } from "react"; 
import { Step, Stepper, StepLabel } from "@mui/material"
import { SetupFormContext } from "../../context/setupFormContext";
import { Box } from "@mui/system";

const ProfileFormStepper = () => {

    const {page} = useContext(SetupFormContext)
    const steps = [
        'Profile Info',
        'Pokedex Info',
        'Review'
    ]

    return (
        <Box sx={{width:"100%"}}>
            <Stepper activeStep={page-1} alternativeLabel>
                {
                    steps.map((label)=>(
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))
                }
            </Stepper>
        </Box>
    )
}

export default ProfileFormStepper