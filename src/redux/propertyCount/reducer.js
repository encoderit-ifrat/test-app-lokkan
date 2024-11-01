import * as Types from "./types";

const InitialState = {
  countData: {},
  loading: false,
};

const PropertyCountReducer = (state = InitialState, action) => {
  switch (action.type) {
    case Types.PROPERTY_COUNT_REQUEST:
      return {
        countData: {},
        loading: true,
      };

    case Types.PROPERTY_COUNT_SUCCESS:
      return {
        countData: action.payload,
        loading: false,
      };

    case Types.PROPERTY_COUNT_FAILED:
      return {
        countData: {},
        loading: false,
      };

    default:
      return state;
  }
};

export default PropertyCountReducer;
