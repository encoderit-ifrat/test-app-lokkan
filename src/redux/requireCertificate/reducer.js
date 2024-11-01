import * as Types from "./types";

const InitialState = {
  requireCertificateData: {},
  loading: false,
  uploadCount: 0,
};

const RequireCertificateReducer = (state = InitialState, action) => {
  switch (action.type) {
    case Types.REQUIRE_CERTIFICATE_REQUEST:
      return {
        requireCertificateData: {},
        loading: true,
      };

    case Types.REQUIRE_CERTIFICATE_SUCCESS:
      return {
        requireCertificateData: action?.payload?.require_certificate,
        loading: false,
        uploadCount: action?.payload?.uploaded,
      };
    case Types.CERTIFICATE_REMOVE:
      const afterFiltered = state?.requireCertificateData?.documents?.filter(
        (certificate) => {
          return certificate?.certificate_type_id !== action.payload;
        }
      );
      return {
        requireCertificateData: {
          ...state.requireCertificateData,
          documents: afterFiltered,
        },
      };

    case Types.REQUIRE_CERTIFICATE_FAILED:
      return {
        requireCertificateData: {},
        loading: false,
      };

    default:
      return state;
  }
};

export default RequireCertificateReducer;
