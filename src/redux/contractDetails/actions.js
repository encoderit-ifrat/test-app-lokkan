import toast from "react-hot-toast";
import {
  contractDetailsApi,
  contractSignApi,
  createSignatureApi,
} from "../../api";
import * as Types from "./types";

const contactDetailsRequest = (data) => {
  return {
    type: Types.CONTACT_DETAILS_REQUEST,
  };
};

const contactDetailsSuccess = (data) => {
  return {
    type: Types.CONTACT_DETAILS_SUCCESS,
    payload: data,
  };
};

const contactDetailsFailed = (err) => {
  return {
    type: Types.CONTACT_DETAILS_FAILED,
    payload: err,
  };
};

const signatureCreate = (data) => {
  return {
    type: Types.CONTACT_DETAILS_SIGNATURE_CREATE,
    payload: data,
  };
};

const signatureUpdate = (data) => {
  return {
    type: Types.CONTACT_DETAILS_SIGNATURE_UPDATE,
    payload: data,
  };
};

// feature action
export const findContractDetailsData = (id) => async (dispatch) => {
  dispatch(contactDetailsRequest());

  const [error, response] = await contractDetailsApi(id);

  if (!error) {
    dispatch(contactDetailsSuccess(response?.data));
  } else {
    const errorMassage =
      error?.response?.data?.data || error?.response?.data?.status;
    // toast.error(errorMassage);
    dispatch(contactDetailsFailed(errorMassage));
  }
};

//ADD

export const signatureAddData = (body,signIds) => async (dispatch) => {
  const [error, response] = await createSignatureApi(body);
  
  if (!error) {
    // dispatch(contactDetailsSuccess(response?.data));
    console.log({response})
  const isIncluded = signIds.some(obj => obj.id === response?.data?.users?.id);
  console.log(isIncluded)
   if(isIncluded){
    dispatch(signatureUpdate({contract_sign_id: response?.data?.users?.id, status: response?.data?.users?.is_signed, name: response?.data?.users?.name}));
   }
   else{
       dispatch(signatureCreate(response?.data?.users));
   }
  } else {
    console.log({error})
    if(error?.response?.status === 422) {
      toast.error("não relacionado com esta propriedade")
    }
    else{
      toast.error("há algo errado")
    }
  }
};

export const signatureUpdateData = (body,setSwitchLoading) => async (dispatch) => {
  const [error, resp] = await contractSignApi(body);
  setSwitchLoading(false)
  if (!error) {
    console.log({resp})
    dispatch(signatureUpdate(body));
  }

  // if (!error) {
  //   // dispatch(contactDetailsSuccess(response?.data));
  //   dispatch(signatureCreate(response?.data?.users));
  // } else {
  //   const errorMassage =
  //     error?.response?.data?.data || error?.response?.data?.status;
  //   // toast.error(errorMassage);
  // }
};
