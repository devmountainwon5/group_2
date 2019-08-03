import { GET_RESTAURANTS, GET_CURRENT_LOCATION, CLEAR_CURRENT_LOCATION, GET_ERRORS } from './types';





export const getCurrentLocation = () => dispatch => {

  let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }
  let success = (pos) => {
    let coords = pos.coords
    let lat = coords.latitude
    let lng = coords.longitude
    dispatch({
      type: GET_CURRENT_LOCATION,
      payload: {
        lat,
        lng
      }
    })
  }
  let error = (err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
  navigator.geolocation.getCurrentPosition(success, error, options);
}

export const getRestaurants = (places) => dispatch => { 

  let restaurant = []
    places.map((place, i) => {
      let singleRestaurant = ({
        id: place.id,
        name: place.name,
        address: place.vicinity,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      })
      restaurant.push(singleRestaurant)
    })  
    console.log(restaurant)
    dispatch({
      type: GET_RESTAURANTS,
      payload: restaurant      
    })
    
  }