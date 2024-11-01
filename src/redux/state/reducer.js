import * as Types from "./types";

const InitialState = {
  stateData: [],
  loading: false,
};

const StateReducer = (state = InitialState, action) => {
  switch (action.type) {
    case Types.STATE_REQUEST:
      return {
        stateData: [],
        loading: true,
      };

    case Types.STATE_SUCCESS:
      return {
        stateData: action.payload,
        loading: false,
      };

    case Types.STATE_FAILED:
      return {
        stateData: [],
        loading: false,
      };

    default:
      return state;
  }
};

export default StateReducer;
