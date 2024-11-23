import React from "react";
import "./homeComp.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import CreateMeal from "../create/CreateMeal";
import CreateRoutine from "../create/CreateRoutine";




const HomeComp = ({ image, name, description, view }) => {
    const [openPopup, setOpenPopup] = useState(false);

    return (
        <div className="homeCompContainer">
            <div className="imgCont">
                <img src={image} alt="" />
            </div>
        <h2>{name}</h2>
        <p>{description}</p>

        <div className="buttons">
            <div className="createButton">
                <button onClick={() => setOpenPopup(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
                <p>Add</p>    
            </div>
            <div className="viewButton">
                <Link to={view}>
                    <button>
                        <FontAwesomeIcon icon={faEye} />
                    </button>
                </Link>
                <p>View</p>
            </div>
        </div>
        {openPopup && name === "Meals" && <CreateMeal setOpen={setOpenPopup} />}
        {openPopup && name === "Entries" && (<CreateEntry setOpen={setOpenPopup} />)}
        {openPopup && name === "Routines" && (<CreateRoutine setOpen={setOpenPopup} />)}
        </div>
    )
}

export default HomeComp;