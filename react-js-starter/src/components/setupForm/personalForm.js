import { Button, Card, CardContent, TextField, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { SetupFormContext } from "../../context/setupFormContext";
import ProfileFormStepper from "./profileFormStepper";

const PersonalForm = () => {

    const {toggleNextPage} = useContext(SetupFormContext)
    const [firstName, setFirstName] = useState("")
    const [firstNameError, setFirstNameError] = useState("")
    const [lastName, setLastName] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [phone, setPhone] = useState("")
    const [phoneError, setPhoneError] = useState("")
    const [address, setAddress] = useState("")
    const [addressError, setAddressError] = useState("")

    const validateForm = () => {
        let valid = true

        // First Name Validation
        if (!firstName){
            valid = false
            setFirstNameError("Please enter a name.")
        }
        else{
            setFirstNameError("")
        }

        // Last Name Validation
        if (!lastName){
            valid = false
            setLastNameError("Please enter a name.")
        }
        else{
            setLastNameError("")
        }

        // Phone Validation
        if (!phone){
            valid = false
            setPhoneError("Please enter a phone number.")
        }
        /* Regex supports formats such as 1234567890, 123-456-7890, 123 456 7890, +91 (123) 456-7890, +911234567890, etc */
        else if (!phone.match(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/g)){
            valid = false
            setPhoneError("Please enter a valid phone number.")
        }
        else{
            setPhoneError("")
        }

        // Address Validation
        if (!address){
            valid = false
            setAddressError("Please enter an address.")
        }
        else{
            setAddressError("")
        }

        return valid
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (validateForm()){

            // Storing form values for review and profile
            let data = window.localStorage.getItem("profile-form")
            if (data){
                data = JSON.parse(data)
                data.firstName = firstName
                data.lastName = lastName
                data.phone = phone
                data.address = address
                window.localStorage.setItem("profile-form", JSON.stringify(data))
            }
            else{
                window.localStorage.setItem("profile-form", JSON.stringify({firstName, lastName, phone, address}))
            }

            toggleNextPage()
        }
    }

    useEffect(()=>{
        // Populate form based on previous entered data
        if (window){
            let data = window.localStorage.getItem("profile-form")
            if (data){
                data = JSON.parse(data)
                setFirstName(data.firstName)
                setLastName(data.lastName)
                setPhone(data.phone)
                setAddress(data.address)
            }
        }
    }, [])

    return (
        <Card variant="outlined" sx={{minWidth:250, marginTop:3, border:'3px solid'}}>
            <CardContent sx={{justifyContent:"center", textAlign:'center'}}>
                <ProfileFormStepper/>
                <form onSubmit={handleSubmit}>
                    {/* Text Field Input */}
                    <Grid container spacing={2} direction="column" sx={{justifyContent:"center", marginTop:"5px"}}>
                        <TextField label="First Name" variant="outlined" value={firstName} onChange={e => setFirstName(e.target.value)} error={firstNameError.length > 0} helperText={firstNameError} sx={{margin:2}}/>
                        <TextField label="Last Name" variant="outlined" value={lastName} onChange={e => setLastName(e.target.value)} error={lastNameError.length > 0} helperText={lastNameError} sx={{margin:2}}/>
                        <TextField label="Phone Number" variant="outlined" value={phone} onChange={e => setPhone(e.target.value)} error={phoneError.length > 0} helperText={phoneError} sx={{margin:2}}/>
                        <TextField label="Address" variant="outlined" value={address} onChange={e => setAddress(e.target.value)} error={addressError.length > 0} helperText={addressError} sx={{margin:2}}/>
                    </Grid>
                    
                    {/* buttons */}
                    <Grid container spacing={2} sx={{justifyContent:"right", marginTop:"5px"}}>
                        <Grid item>
                            <Button variant="contained" type="submit">
                                Next
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    )
}

export default PersonalForm