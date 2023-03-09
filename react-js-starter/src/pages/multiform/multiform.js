import { Card, CardContent, CircularProgress, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Layout from "../../components/layout"
import PersonalForm from "../../components/setupForm/personalForm"
import PokedexForm from "../../components/setupForm/pokedexForm/pokedexForm"
import ReviewForm from "../../components/setupForm/reviewForm"
import { SetupFormContext } from "../../context/setupFormContext"

const MultiForm = (props) => {
    const [page, setPage] = useState(0)
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(false)
    const {step} = useParams()
    const navigate = useNavigate()


    const toggleNextPage = () => {
        if (page < 3){
            if (window.sessionStorage.getItem("form-step") <= page){
                window.sessionStorage.setItem("form-step", page + 1)
            }
            setPage(page + 1)

            navigate("/setup/" + (page+1))
        }
    }

    const togglePreviousPage = () => {
        if (page > 0){
            setPage(page - 1)
            navigate("/setup/" + (page-1))
        }
    }

    useEffect(()=>{
        // initialize page value
        if (window){
            let currentStep = window.sessionStorage.getItem("form-step")

            if (currentStep && parseInt(currentStep)){

                // prevent step from url to be ahead of current step or non existent page
                if (step && parseInt(step) && parseInt(currentStep) >= parseInt(step) && parseInt(step) >= 1){
                    setPage(parseInt(step))
                }
                else{
                    // Redirect to current step if input step is not within bounds
                    setPage(parseInt(currentStep))
                    navigate("/setup/" + currentStep)
                }
            }
            else{
                window.sessionStorage.setItem("form-step", "1")
            }

            setLoading(false)
        }
        else{
            setError(true)
        }
    }, [])

    if (isError){
        return(
            <Layout>
                <React.Fragment>
                    <Card variant="outlined" sx={{minWidth:250, marginTop:3, border:"3px solid"}}>
                        <CardContent>
                            <Typography>Something Went Wrong!</Typography>
                        </CardContent>
                    </Card>
                </React.Fragment>
            </Layout>
        )
    }

    if (isLoading){
        return(
            <Layout>
                <React.Fragment>
                    <Card variant="outlined" sx={{minWidth:250, marginTop:3, border:'3px solid'}}>
                        <CardContent sx={{display: 'flex', justifyContent: 'center'}}>
                            <CircularProgress/>
                        </CardContent>
                    </Card>
                </React.Fragment>
            </Layout>
        )
    }

    return (
        <Layout>
            <SetupFormContext.Provider value={{page, toggleNextPage, togglePreviousPage}}>
                {
                    {
                        1: <PersonalForm/>,
                        2: <PokedexForm/>,
                        3: <ReviewForm/>
                    }[page]
                }
            </SetupFormContext.Provider>
        </Layout>
    )
}

export default MultiForm;