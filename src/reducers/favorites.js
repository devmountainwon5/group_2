
const favorites = (state= {}, action) => {
    switch(action.type){
        case "favorites":
            return action.payload;
        default:
            return state;
    }
}

export default (favorites);