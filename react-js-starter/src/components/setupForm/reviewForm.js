import {useContext} from "react"
import { Card, CardContent, Button, Grid } from "@mui/material"
import { SetupFormContext } from "../../context/setupFormContext";
import ProfileFormStepper from "./profileFormStepper";

const ReviewForm = () => {
    const {togglePreviousPage} = useContext(SetupFormContext)

    const handleFinishButton = () => {

    }

    return (
        <Card variant="outlined" sx={{minWidth:250, marginTop:3, border:'3px solid'}}>
            <CardContent sx={{justifyContent:"center", textAlign:'center'}}>
                <ProfileFormStepper/>

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