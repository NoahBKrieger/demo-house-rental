import { addSpotThunk } from "../../store/spotReducer";
import { useState } from "react";
import { useDispatch } from 'react-redux';



import './SpotForm.css'


function SpotForm() {

    const dispatch = useDispatch();


    const [spotName, setSpotName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lng, setLng] = useState(0)
    const [lat, setLat] = useState(0)
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState(1)


    const handleSubmit = async (e) => {
        e.preventDefault()


        const newSpot = {}

        newSpot.name = spotName
        newSpot.address = address
        newSpot.city = city
        newSpot.state = state
        newSpot.country = country
        newSpot.lng = Number(lng)
        newSpot.lat = Number(lat)
        newSpot.description = desc
        newSpot.price = Number(price)

        console.log('newspot----', newSpot)

        dispatch(addSpotThunk(newSpot))

        // console.log('addDis', addDis)
    }



    return (

        <>
            <h1>New Spot Form</h1>
            <form className="form" onSubmit={(e) => handleSubmit(e)}>

                <label> Name Of Spot
                    <input onChange={(e) => setSpotName(e.target.value)}></input>
                </label>

                <label> Address
                    <input onChange={(e) => setAddress(e.target.value)}></input>
                </label>

                <label> City
                    <input onChange={(e) => setCity(e.target.value)}></input>
                </label>

                <label> State
                    <input onChange={(e) => setState(e.target.value)}></input>
                </label>

                <label> Country
                    <input onChange={(e) => setCountry(e.target.value)}></input>
                </label>

                <label> Longitude
                    <input onChange={(e) => setLng(e.target.value)}></input>
                </label>

                <label> Latitude
                    <input onChange={(e) => setLat(e.target.value)}></input>
                </label>

                <label> Description
                    <textarea onChange={(e) => setDesc(e.target.value)}></textarea>
                </label>

                <label> Price
                    <input onChange={(e) => setPrice(e.target.value)}></input>
                </label>

                <button className='submit-button'>submit</button>

            </form>
        </>
    )

}

export default SpotForm;