import { propertyCountApi } from "@/api";
import * as Types from "./types";

const propertyCountRequest = (data) => {
  return {
    type: Types.PROPERTY_COUNT_REQUEST,
  };
};

const propertyCountSuccess = (data) => {
  return {
    type: Types.PROPERTY_COUNT_SUCCESS,
    payload: data,
  };
};

const propertyCountFailed = (err) => {
  return {
    type: Types.PROPERTY_COUNT_FAILED,
    payload: err,
  };
};

// count action
export const findPropertyCountData = () => async (dispatch) => {
  dispatch(propertyCountRequest());

  const [error, response] = await propertyCountApi();

  if (!error) {
    dispatch(propertyCountSuccess(response?.data));
  } else {
    const errorMassage =
      error?.response?.data?.data || error?.response?.data?.status;
    // toast.error(errorMassage);
    dispatch(propertyCountFailed(errorMassage));
  }
};
