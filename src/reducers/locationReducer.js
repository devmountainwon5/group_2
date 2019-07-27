import { GET_CURRENT_LOCATION, GET_CITY_BARS } from '../actions/types'

const initialState = {
  userLocation: {},
  localBars: []
}

export default function(state=initialState, action){
  switch (action.type) {
    case GET_CURRENT_LOCATION:
    return {
      ...state,
      userLocation: action.payload
    }
    case GET_CITY_BARS:
      return {
        ...state,
        localBars: [
          ...state.localBars,
          ...action.payload
        ]

      }

    default:
      return state

  }
}