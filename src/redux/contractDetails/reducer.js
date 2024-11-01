import * as Types from "./types";

const InitialState = {
  ContactDetailsData: {},
  loading: false,
};

const ContractDetailsReducer = (state = InitialState, action) => {
  switch (action.type) {
    case Types.CONTACT_DETAILS_REQUEST:
      return {
        ContactDetailsData: {},
        loading: true,
      };

    case Types.CONTACT_DETAILS_SUCCESS:
      return {
        ContactDetailsData: action.payload,
        loading: false,
      };

    case Types.CONTACT_DETAILS_SIGNATURE_CREATE:
      const afterAddSignature = [
        action.payload,
        ...state?.ContactDetailsData?.signatures,
      ];

      return {
        ContactDetailsData: {
          ...state.ContactDetailsData,
          signatures: afterAddSignature,
        },
      };

    case Types.CONTACT_DETAILS_SIGNATURE_UPDATE:
      console.log("fff", action);
      const updatedData = state.ContactDetailsData?.signatures.map(
        (signData) => {
          console.log({ signData });
          if (signData?.id === action?.payload?.contract_sign_id) {
            return { ...signData, is_signed: action?.payload?.status,name: action?.payload?.name ? action?.payload?.name : signData?.name };
          } else {
            return signData;
          }
        }
      );
      return {
        ContactDetailsData: {
          ...state.ContactDetailsData,
          signatures: updatedData,
        },
      };

    case Types.CONTACT_DETAILS_FAILED:
      return {
        ContactDetailsData: {},
        loading: false,
      };

    default:
      return state;
  }
};

export default ContractDetailsReducer;
