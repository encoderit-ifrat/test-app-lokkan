import * as Types from "./types";

const InitialState = {
  singlePropertyData: {},
  loading: false,
};

const singlePropertyReducer = (state = InitialState, action) => {
  switch (action.type) {
    case Types.SINGLE_PROPERTY_REQUEST:
      return {
        singlePropertyData: {},
        loading: true,
      };

    case Types.SINGLE_PROPERTY_SUCCESS:
      return {
        singlePropertyData: action.payload,
        loading: false,
      };

    case Types.SINGLE_PROPERTY_FAILED:
      return {
        singlePropertyData: {},
        loading: false,
      };

    default:
      return state;
  }
};

export default singlePropertyReducer;
