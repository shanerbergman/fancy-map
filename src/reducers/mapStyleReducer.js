export default function MapStyleReducer(state = null, action) {
    switch (action.type) {
      case "SET_MAP_STYLE": {
        return action.payload
      }
      default:
        return state
    }
}