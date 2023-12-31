import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import { getSpotReviewsThunk } from "../../store/reviewReducer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import './SpotPage.css'

import OpenModalButton from "../OpenModalButton";
import ConfirmDeleteReviewModal from "../ConfirmDeleteReviewModal";
import ReviewForm from "../ReviewForm";
import { getSpotThunk } from "../../store/spotReducer";

const KK = 'https://upload.wikimedia.org/wikipedia/commons/2/25/The_Krusty_Krab.png'
const pineapple = "https://i.pinimg.com/originals/58/b3/40/58b340936b2c1ed07bed66c260b00534.png"
const MONTHS = ['happy new year', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


function SpotPage() {

    // const history = useHistory()
    const dispatch = useDispatch()
    const spotId = useParams()


    const spot = useSelector(state => (state.spots.currSpot))
    const reviews = useSelector(state => state.reviews.reviews)
    const user = useSelector(state => state.session.user)



    // check for user reviews
    let hasReview = false
    let filteredReviews
    if (user) { filteredReviews = reviews.filter((el) => { return el.userId === user.id }) }
    if (filteredReviews && filteredReviews.length > 0) { hasReview = true }

    let noReviews = spot.numReviews === 'no reviews'

    let reviewDisplay = 'Reviews'
    if (reviews.length === 1) {
        reviewDisplay = 'Review'
    }


    const imageArr = spot.SpotImages && spot.SpotImages.filter(el => { return el.preview === false })
    imageArr && imageArr.splice(4)


    const previewImg = spot.SpotImages && spot.SpotImages.find(el => { return el.preview === true })

    const [pImage, setPImage] = useState((previewImg && previewImg.url) || pineapple);


    const handleOnError = (e) => { e.target.src = KK }



    const reserve = () => {
        return alert("Feature coming soon!")
    }

    useEffect(() => {

        async function spotDispatches() {
            await dispatch(getSpotThunk(spotId.spotId));
            await dispatch(getSpotReviewsThunk(spotId.spotId))
        }

        spotDispatches()
    }, [dispatch, spotId]);

    return (

        <>
            <h1>{spot.name}</h1>
            <h2 className="location">{spot.city} , {spot.state} , {spot.country}</h2>
            <div className="images">
                <img src={pImage}
                    alt='preview'
                    onError={() => setPImage(pineapple)}
                    style={{ width: 650 + 'px', height: 405 + 'px' }}
                >
                </img>



                <ol className="regular-images">
                    {imageArr && imageArr.map(el => {
                        return <li>
                            <img
                                src={el.url || KK}
                                alt={'rental non preview'}
                                style={{ width: 300 + 'px', height: 200 + 'px' }}
                                onError={handleOnError}>

                            </img>
                        </li>
                    })}
                </ol>
            </div>
            <h2>Hosted by {spot.Owner && spot.Owner.firstName}  {spot.Owner && spot.Owner.lastName}</h2>
            {/* <div> latitude: {spot.lat} longitude: {spot.lng}</div> */}

            <div className="description"> {spot.description}</div>

            <div className="reserveBox">
                <div className="reserve-info">
                    <h3 className="price-in-box"> ${spot.price} per night</h3>
                    {!noReviews && <h3 className="review-info"><ul><i class="fa fa-star"></i> {spot.avgStarRating && spot.avgStarRating.toFixed(1)}   <li className="number-reviews"> {spot.numReviews} {reviewDisplay}</li></ul></h3>}
                    {noReviews && <h3 className="review-info-new"><i class="fa fa-star"></i> New</h3>}
                </div>
                <button onClick={reserve}>Reserve</button>

            </div>

            <div className="review-list-all">
                <h2 className="review-title"><div >

                    {!noReviews && <div className="review-info"><i class="fa fa-star"></i> {spot.avgStarRating && spot.avgStarRating.toFixed(1)}   <li className="number-reviews">{spot.numReviews} {reviewDisplay}</li></div>}
                    {noReviews && <div><i class="fa fa-star"></i> New</div>}
                </div></h2>

                <ol className="review-list">
                    {user && reviews &&
                        reviews.map(el => {


                            if (user && el.userId === user.id) {
                                return <li key={el.id}>
                                    <ul className='review-item' >
                                        <li className="firstName">{user.firstName}</li>
                                        {/* {!el.User && <li className="firstName">{user.firstName}</li>} */}
                                        <li className="review-date">{MONTHS[Number(el.createdAt.slice(5, 7))]}, {el.createdAt.slice(0, 4)} </li>
                                        <li>{el.review}</li>
                                    </ul>

                                    <OpenModalButton
                                        cssClass="delete-button"
                                        buttonText='Delete'
                                        modalComponent={<ConfirmDeleteReviewModal review={el} spot={spot} />}>
                                    </OpenModalButton>
                                </li>
                            } else {
                                return <li key={el.id}>
                                    <ul className='review-item' >
                                        {el.User && <li className="firstName">{el.User.firstName}</li>}
                                        <li className="review-date">{MONTHS[Number(el.createdAt.slice(5, 7))]}, {el.createdAt.slice(0, 4)} </li>
                                        <li>{el.review}</li>
                                    </ul>
                                </li>
                            }

                        })}
                </ol>

                {user && spot.Owner &&
                    user.id !== spot.Owner.id &&
                    !hasReview &&
                    <OpenModalButton buttonText='Post Your Review' cssClass='review-button' modalComponent={<ReviewForm />} ></OpenModalButton>}

                {noReviews && user && (user.id !== spot.Owner.id) && <p>Be the first to post a review!</p>}

            </div>
        </>

    )

}

export default SpotPage;
