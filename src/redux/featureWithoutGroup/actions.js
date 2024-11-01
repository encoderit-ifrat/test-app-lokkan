import toast from "react-hot-toast";
import { featureCreateApi, featuresApi } from "../../api";
import * as Types from "./types";

const buttonRequest = (data) => {
  return {
    type: Types.BUTTON_REQUEST,
  };
};

const buttonSuccess = (data) => {
  return {
    type: Types.BUTTON_SUCCESS,
    payload: data,
  };
};

const buttonFailed = (err) => {
  return {
    type: Types.BUTTON_FAILED,
    payload: err,
  };
};

const featureCreateSuccess = (data) => {
  return {
    type: Types.FEATURE_CREATE_SUCCESS,
    data: data,
  };
};

const featureCreateFailed = (data) => {
  return {
    type: Types.FEATURE_CREATE_FAILED,
    data: data,
  };
};

// feature action
export const findButtonData = () => async (dispatch) => {
  dispatch(buttonRequest());

  const [error, response] = await featuresApi();

  if (!error) {
    dispatch(buttonSuccess(response?.data));
  } else {
    const errorMassage =
      error?.response?.data?.data || error?.response?.data?.status;
    // toast.error(errorMassage);
    dispatch(buttonFailed(errorMassage));
  }
};

//FEATURE_CREATE
export const featureDataCreate = (body) => async (dispatch) => {
  const [error, response] = await featureCreateApi(body);
  if (!error) {
    dispatch(featureCreateSuccess(response?.data?.features));
  } else {
    if (error?.response?.status === 422) {
      toast.error("recurso ou tipo de recurso é obrigatório !");
    } else {
      toast.error("algo deu errado no recurso !");
    }
  }
};
