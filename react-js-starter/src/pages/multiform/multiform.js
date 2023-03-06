import React, { useEffect, useState } from "react"
import Layout from "../../components/layout"

const MultiForm = (props) => {
    const [page, setPage] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(false)

    const toggleNextPage = () => {
        if (window.sessionStorage.setItem("form-step") <= page){
            window.sessionStorage.setItem("form-step", page + 1)
        }
        if (page < 3){
            setPage(page + 1)
        }
    }

    const togglePreviousPage = () => {
        if (page > 0){
            setPage(page - 1)
        }
    }

    useEffect(()=>{
        // initialize page value
        if (window){
            let step = window.sessionStorage.getItem("form-step")

            if (step && parseInt(step)){

                // Checking if user changed the URL to move to a previous form step/page, but not forward
                if (props.match.params.step && parseInt(props.match.params.step) && parseInt(step) >= parseInt(props.match.params.step)){
                    setPage(parseInt(props.match.params.step))
                    window.sessionStorage.setItem("form-step", props.match.params.step)
                }
                else{
                    setPage(parseInt(step))
                }
            }
            else{
                window.sessionStorage.setItem("form-step", "0")
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
                    Error
                </React.Fragment>
            </Layout>
        )
    }

    if (isLoading){
        return(
            <Layout>
                <React.Fragment>
                    Loading
                </React.Fragment>
            </Layout>
        )
    }

    return (
        <Layout>
            <React.Fragment>
                {props.children}
                Test
            </React.Fragment>
        </Layout>
    )
}

export default MultiForm;