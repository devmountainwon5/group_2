import { GET_CURRENT_LOCATION,  GET_RESTAURANTS } from '../actions/types'

const initialState = {
  userLocation: {},
  localRestaurants: []
}

export default function(state=initialState, action){
  switch (action.type) {
    case GET_CURRENT_LOCATION:
    console.log(action.payload)
    return {
      ...state,
      userLocation: action.payload
    }
    case GET_RESTAURANTS:
    console.log(action.payload)
      return {
        ...state,
        localRestaurants: [
          ...state.localRestaurants,
          ...action.payload
        ]

      }

    default:
      return state

  }
}