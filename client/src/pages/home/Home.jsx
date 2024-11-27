import React from "react"
import "./home.css"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/footer/Footer"
import HomeComp from "../../components/homeComp/HomeComp"

const Home = () => {
    return (
        <div className="home">
            <Navbar />
            <div className="banner">
                <h1>Welcome to ShapeSync</h1>
                <p>The one stop solution  for your fitness journey</p>
            </div>
            <div className="mainContainer">
                <HomeComp 
                    image=""
                    name="Entries"
                    description="Keep track of your daily progress"
                    view="/entries"
                />
                <HomeComp 
                    image=""
                    name="Routines"
                    description="Add personalized routines"
                    view = "/routines"
                />
                <HomeComp 
                    image=""
                    name="Meals"
                    description="Add personalized meals"
                    view = "/meals"
                />
            </div>
            <Footer />
        </div>
        
    )
}

export default Home 