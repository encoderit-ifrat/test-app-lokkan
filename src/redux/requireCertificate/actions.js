import {
  certificateDeleteApi,
  featuresApi,
  requireCertrificateApi,
} from "../../api";
import * as Types from "./types";

const requireCertificateRequest = (data) => {
  return {
    type: Types.REQUIRE_CERTIFICATE_REQUEST,
  };
};

const requireCertificateSuccess = (data) => {
  return {
    type: Types.REQUIRE_CERTIFICATE_SUCCESS,
    payload: data,
  };
};

const requireCertificateFailed = (err) => {
  return {
    type: Types.REQUIRE_CERTIFICATE_FAILED,
    payload: err,
  };
};

export const certificateRemove = (id) => {
  return {
    type: Types.CERTIFICATE_REMOVE,
    payload: id,
  };
};

// require certificate action
export const findRequireCertificateData = (id) => async (dispatch) => {
  dispatch(requireCertificateRequest());
  const [error, response] = await requireCertrificateApi(id);
  if (!error) {
    dispatch(requireCertificateSuccess(response?.data));
  } else {
    const errorMassage =
      error?.response?.data?.data || error?.response?.data?.status;
    // toast.error(errorMassage);
    dispatch(requireCertificateFailed(errorMassage));
  }
};

//deleteSchedule
export const deleteCertificate =
  (contract_id, certificate_type_id) => async (dispatch) => {
    dispatch(requireCertificateRequest());
    const [error, response] = await certificateDeleteApi(
      contract_id,
      certificate_type_id
    );

    if (!error) {
      // dispatch(certificateRemove(certificate_type_id));
      dispatch(findRequireCertificateData(contract_id));
    } else {
      const errorMassage =
        error?.response?.data?.data || error?.response?.data?.status;
    }
  };
