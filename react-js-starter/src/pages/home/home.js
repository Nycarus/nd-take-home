import { Button, Card, CardContent, Typography, Grid, Link } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import Layout from "../../components/layout";

const Home = () => {
    const [currentPage, setCurrentPage] = useState(null)

    useLayoutEffect(()=>{
        if (window){
            let step = window.sessionStorage.getItem("form-step")
            if (step && parseInt(step)) {
                setCurrentPage(parseInt(step))
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
        </Layout>
    )
}

export default Home;