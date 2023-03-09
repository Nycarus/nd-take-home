import { Card, CardContent, Button, Grid, Typography, TextField } from "@mui/material"

const Profile = ({firstName, lastName, address, phone, pokemonName, pokemonImg}) => {
    return (
        <Grid container direction="row" sx={{justifyContent:"center", marginTop:"20px"}}>
            {/* Pokemon */}
            <Card sx={{display: "flex", flexGrow: 1, border: '1px solid', borderRadius: '10px 0 0 10px', width:125, justifyContent:"center"}}>
                <CardContent sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Grid container direction="column">
                        <img src={pokemonImg}></img>
                        <Typography sx={{textAlign:"center"}}>
                            {pokemonName}
                        </Typography>
                    </Grid>
                </CardContent>
            </Card>

            {/* Profile Info */}
            <Card sx={{display: "flex", flexGrow: 1, border: '1px solid', borderRadius: '0 10px 10px 0', width:"auto"}}>
                <CardContent>
                    <Grid container spacing={1} direction="column" sx={{justifyContent:"center"}}>
                        <Grid item>
                            <TextField label="First Name" variant="outlined" disabled={true} value={firstName}/>
                        </Grid>

                        <Grid item>
                            <TextField label="Last Name" variant="outlined" disabled={true} value={lastName}/>
                        </Grid>
                        <Grid item>

                            <TextField label="Phone" variant="outlined" disabled={true} value={phone}/>
                        </Grid>

                        <Grid item>
                            <TextField label="Address" variant="outlined" disabled={true} value={address}/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Profile