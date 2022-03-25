import { combineReducers } from "redux";
import MapStyleReducer from "./mapStyleReducer";

const rootReducer = combineReducers({
  mapStyle: MapStyleReducer
});

export default rootReducer;