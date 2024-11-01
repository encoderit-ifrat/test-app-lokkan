// import { stateApi } from "../../api";

import { getSinglePropertyApi } from "../../api";
import * as Types from "./types";

const singlePropertyRequest = (data) => {
  return {
    type: Types.SINGLE_PROPERTY_REQUEST,
  };
};

const singlePropertySuccess = (data) => {
  return {
    type: Types.SINGLE_PROPERTY_SUCCESS,
    payload: data,
  };
};

const singlePropertyFailed = (err) => {
  return {
    type: Types.SINGLE_PROPERTY_FAILED,
    payload: err,
  };
};

// SINGLE_PROPERTY action
export const findSinglePropertyData = (id) => async (dispatch) => {
  dispatch(singlePropertyRequest());
  if (!id) {
    return;
  }
  const [error, response] = await getSinglePropertyApi(id);

  if (!error) {
    dispatch(singlePropertySuccess(response?.data?.property));
  } else {
    const errorMassage =
      error?.response?.data?.data || error?.response?.data?.status;
    // toast.error(errorMassage);
    dispatch(singlePropertyFailed(errorMassage));
  }
};
