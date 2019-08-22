import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

let initialState = {};
let middleware = [thunk];
const devTools =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__();

const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(...middleware)
	)
);
export default store;
//Worked with Woo to correct property 'apply' error

//PREVIOUS CODE
// compose(
//   applyMiddleware(...middleware),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )
// )
// export default store;
