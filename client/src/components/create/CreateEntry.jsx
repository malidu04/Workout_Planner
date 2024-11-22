import './popUp.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from 'react';
import axios from "axios";
import useFetch from '../../useFetch';
import { AuthContext } from '../../authContext';

const CreateEntry = ({ setOpen }) => {

    const { user } = useContext(AuthContext);
    const [ info, setInfo ] = useState({});
    const { data } = useFetch(`/entries/fetchMealAndRoutines/${user._id}`)
    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value}));
    }

    const handleClick = async (e) => {
        e.preventDefault();
    }
}