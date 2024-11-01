import * as Types from "./types";

const InitialState = {
  propertyTypeData: [],
  loading: false,
};

const PropertyTypeReducer = (state = InitialState, action) => {
  switch (action.type) {
    case Types.PROPERTY_TYPE_REQUEST:
      return {
        propertyTypeData: [],
        loading: true,
      };

    case Types.PROPERTY_TYPE_SUCCESS:
      return {
        propertyTypeData: action.payload,
        loading: false,
      };

    case Types.PROPERTY_TYPE_FAILED:
      return {
        propertyTypeData: [],
        loading: false,
      };

    default:
      return state;
  }
};

export default PropertyTypeReducer;
