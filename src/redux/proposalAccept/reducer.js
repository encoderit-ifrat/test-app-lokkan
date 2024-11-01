import * as Types from "./types";

const InitialState = {
  propertyAcceptData: {},
  loading: false,
};

const PropertyAcceptReducer = (state = InitialState, action) => {
  switch (action.type) {
    case Types.PROPERTY_ACCEPT_REQUEST:
      return {
        propertyAcceptData: {},
        loading: true,
      };

    case Types.PROPERTY_ACCEPT_SUCCESS:
      return {
        propertyAcceptData: action.payload,
        loading: false,
      };

    case Types.PROPERTY_ACCEPT_FAILED:
      return {
        propertyAcceptData: {},
        loading: false,
      };

    default:
      return state;
  }
};

export default PropertyAcceptReducer;
