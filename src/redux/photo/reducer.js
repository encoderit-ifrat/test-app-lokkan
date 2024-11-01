import * as Types from "./types";

const InitialState = {
  photoTypeData: [],
  loading: false,
};

const PhotoTypeReducer = (state = InitialState, action) => {
  switch (action.type) {
    case Types.PHOTO_TYPE_REQUEST:
      return {
        photoTypeData: [],
        loading: true,
      };

    case Types.PHOTO_TYPE_SUCCESS:
      return {
        photoTypeData: action.payload,
        loading: false,
      };

    case Types.PHOTO_TYPE_FAILED:
      return {
        photoTypeData: [],
        loading: false,
      };

    default:
      return state;
  }
};

export default PhotoTypeReducer;
