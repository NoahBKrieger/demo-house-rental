
// import SpotDetailsButton from "../SpotDetails";
import { useHistory } from "react-router-dom";
import { useState } from "react";
// import { useEffect, } from "react";
import { getSpotThunk } from "../../store/spotReducer";
import { useDispatch } from "react-redux";
import { getSpotReviewsThunk } from '../../store/reviewReducer'
import OpenModalButton from "../OpenModalButton";

import './SpotItem.css'
import ConfirmDeleteSpotModal from "../ConfirmDeleteModal";




function SpotItem({ spot, user }) {

    const pineapple = "https://i.pinimg.com/originals/58/b3/40/58b340936b2c1ed07bed66c260b00534.png"

    const [image, setImage] = useState(spot.previewImage);



    const dispatch = useDispatch();


    if (image === 'no preview image') {
        setImage(pineapple)
    }


    const history = useHistory()

    let reviewText
    if (spot.avgRating === 'no reviews') {
        reviewText = false
    } else {
        reviewText = true
    }

    const itemClick = async () => {

        await dispatch(getSpotThunk(Number(spot.id)))
        await dispatch(getSpotReviewsThunk(Number(spot.id)))

            .then(history.push(`/spots/${spot.id}`))
    }

    const updateButton = async () => {

        await dispatch(getSpotThunk(Number(spot.id)))

        history.push(`/spots/edit/${spot.id}`)
    }



    // useEffect(() => {
    //     dispatch(fetchUserSpotsThunk());
    // }, [dispatch]);



    return (

        <div className="item-container">
            <div className="item" onClick={itemClick}>

                <img
                    className='preview-image'
                    src={image}
                    alt={`${spot.name} preview`}
                    style={{ width: 300 + 'px', height: 200 + 'px' }}
                    onError={() => setImage(pineapple)}>
                </img>

                <span className="first-row">

                    <p>{`${spot.city}, ${spot.state}`}</p>
                    {reviewText && spot.avgRating && <div><i class="fa fa-star"></i>{spot.avgRating.toFixed(1)}</div>}
                    {!reviewText && <p>New</p>}

                </span>

                <p className="price">{`$${spot.price} night`}</p>

                <span className="tooltip-text">{spot.name}</span>

            </div>
            <div className="buttons">
                {user && <button className='update-butt' onClick={updateButton}>Update Spot</button>}
                {user && <OpenModalButton

                    buttonText='Delete Spot'
                    cssClass='delete-butt'
                    modalComponent={<ConfirmDeleteSpotModal spot={spot} />}>
                </OpenModalButton>}
            </div>
        </div>

    )
}

export default SpotItem;
