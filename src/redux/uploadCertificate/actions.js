import {
  featuresApi,
  requireCertrificateApi,
  uploadCertrificateApi,
} from "../../api";
import * as Types from "./types";

const uploadCertificateRequest = (data) => {
  return {
    type: Types.UPLOAD_CERTIFICATE_REQUEST,
  };
};

const uploadCertificateSuccess = (data) => {
  return {
    type: Types.UPLOAD_CERTIFICATE_SUCCESS,
    payload: data,
  };
};

const uploadCertificateFailed = (err) => {
  return {
    type: Types.UPLOAD_CERTIFICATE_FAILED,
    payload: err,
  };
};

// require certificate action
export const findUploadCertificateData = (id, type) => async (dispatch) => {
  dispatch(uploadCertificateRequest());
  const [error, response] = await uploadCertrificateApi(id, type);
  if (!error) {
    dispatch(uploadCertificateSuccess(response?.data));
  } else {
    const errorMassage =
      error?.response?.data?.data || error?.response?.data?.status;
    // toast.error(errorMassage);
    dispatch(uploadCertificateFailed(errorMassage));
  }
};
