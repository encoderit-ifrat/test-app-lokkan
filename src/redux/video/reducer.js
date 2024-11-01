import * as Types from "./types";

const InitialState = {
  videoTypeData: [],
  loading: false,
};

const VideoTypeReducer = (state = InitialState, action) => {
  switch (action.type) {
    case Types.VIDEO_TYPE_REQUEST:
      return {
        videoTypeData: [],
        loading: true,
      };

    case Types.VIDEO_TYPE_SUCCESS:
      return {
        videoTypeData: action.payload,
        loading: false,
      };

    case Types.VIDEO_TYPE_FAILED:
      return {
        videoTypeData: [],
        loading: false,
      };

    default:
      return state;
  }
};

export default VideoTypeReducer;
