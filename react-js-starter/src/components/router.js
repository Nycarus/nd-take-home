import React from "react"
import { BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "../pages/home/home"
import MultiForm from "../pages/multiform/multiform"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route exact path="/setup/:step" element={<MultiForm/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router