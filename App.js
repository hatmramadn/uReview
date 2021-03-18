import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import AppContainer from "./navigation/ureviewNavigator";
import authReducer from "./store/reducers/authReducer";
import reviewReduer from "./store/reducers/reviewReducer";

const rootReducer = combineReducers({
  user: authReducer,
  reviews: reviewReduer
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
