import * as Types from "./types";

const InitialState = {
  countData: {},
  loading: false,
};

const CountReducer = (state = InitialState, action) => {
  switch (action.type) {
    case Types.COUNT_REQUEST:
      return {
        countData: {},
        loading: true,
      };

    case Types.COUNT_SUCCESS:
      return {
        countData: action.payload,
        loading: false,
      };

    case Types.COUNT_FAILED:
      return {
        countData: {},
        loading: false,
      };

    default:
      return state;
  }
};

export default CountReducer;
