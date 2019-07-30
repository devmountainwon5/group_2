import { GET_CITY_BARS, GET_CURRENT_LOCATION, CLEAR_CURRENT_LOCATION, GET_ERRORS } from './types';





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

export const getCityBars = (places) => dispatch => { 

  let miamiBars = []
    places.map((place, i) => {
      let singleBar = ({
        id: place.id,
        name: place.name,
        address: place.vicinity,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      })
      miamiBars.push(singleBar)
    })  
    console.log(miamiBars)
    dispatch({
      type: GET_CITY_BARS,
      payload: miamiBars      
    })
    
  }