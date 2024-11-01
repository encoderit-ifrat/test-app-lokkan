import { videoTypeApi } from "../../api";
import * as Types from "./types";

const videoTypeRequest = (data) => {
  return {
    type: Types.VIDEO_TYPE_REQUEST,
  };
};

const videoTypeSuccess = (data) => {
  return {
    type: Types.VIDEO_TYPE_SUCCESS,
    payload: data,
  };
};

const videoTypeFailed = (err) => {
  return {
    type: Types.VIDEO_TYPE_FAILED,
    payload: err,
  };
};

//getVideoTypeData
export const GetVideoTypeData = () => async (dispatch) => {
  dispatch(videoTypeRequest());

  const [error, response] = await videoTypeApi();

  if (!error) {
    dispatch(videoTypeSuccess(response?.data?.phototypes));
  } else {
    const errorMassage =
      error?.response?.data?.message || error?.response?.data?.status;
    dispatch(videoTypeFailed(errorMassage));
  }
};
