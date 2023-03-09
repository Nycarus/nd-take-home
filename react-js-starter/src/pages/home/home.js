import { Button, Card, CardContent, Typography, Grid, Link } from "@mui/material";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Profile from "../../components/profile";

const Home = () => {
    const [currentPage, setCurrentPage] = useState(null)
    const [profile, setProfile] = useState({})

    useEffect(()=>{
        if (window){
            let step = window.localStorage.getItem("form-step")
            if (step && parseInt(step)) {
                setCurrentPage(parseInt(step))
            }

            if (window.localStorage.getItem("profile")){
                setProfile(JSON.parse(window.localStorage.getItem("profile")))
            }
        }
    }, [])

    return (
        <Layout>
            <Card variant="outlined" sx={{minWidth:250, marginTop:3, border:'3px solid'}}>
                <CardContent sx={{justifyContent:"center", textAlign:'center'}}>
                    <Typography variant="h5">
                        Welcome to PokeDex Profile Maker!
                    </Typography>
                    <Grid container spacing={2} sx={{justifyContent:"center", marginTop:"5px"}}>
                        <Grid item>
                            <Button variant="contained" component={Link} href="/setup/1">
                                Create Profile
                            </Button>
                        </Grid>
                        { currentPage &&
                            <Grid item>
                                <Button variant="contained" component={Link} href={"/setup/"+currentPage}>
                                    Continue
                                </Button>
                            </Grid>
                        }
                    </Grid>
                </CardContent>
            </Card>

            {
                Object.keys(profile).length != 0 && <Profile {...profile}/>
            }
        </Layout>
    )
}

export default Home;