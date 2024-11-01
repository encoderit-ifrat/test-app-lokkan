import axios from "axios";
import { _baseURL } from "../../consts";
import { signOut } from "next-auth/react";
import { clearAllCookies } from "@/utils/clearCookies";

const baseURL = `${_baseURL}/api`;

export const apiInstance = axios.create({
  baseURL: baseURL,
});
apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

// Add a response interceptor
apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear(); // or use localStorage.removeItem('key') to remove specific items
      sessionStorage.clear();
      clearAllCookies();
      // If 401, log out the user
      signOut({
        callbackUrl: "/",
      });
    }
    return Promise.reject(error);
  }
);

export const omitEmpties = (obj) => {
  return Object.entries(obj).reduce((carry, [key, value]) => {
    if (![null, undefined, "", []].includes(value)) {
      carry[key] = value;
    }
    return carry;
  }, {});
};

export const socialLoginApi = async (paramsData, provider) => {
  try {
    const responseAuth = await apiInstance.get(`/${provider}/callback`, {
      params: {
        ...paramsData,
      },
    });
    return [false, responseAuth];
  } catch (errorAuth) {
    return [errorAuth, null];
  }
};

//login
export const loginApi = async (body) => {
  try {
    const responseToken = await apiInstance.post(`login`, body);
    return [false, responseToken];
  } catch (errorToken) {
    return [errorToken, null];
  }
};

//forgot_password
export const forgotPasswordApi = async (body) => {
  try {
    const response = await apiInstance.post(`/password/forgot`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//email_varify
export const emailVerifyApi = async (token) => {
  try {
    const resp = await apiInstance.get(`/email-varify?token=${token}`);
    return [false, resp];
  } catch (err) {
    return [err, null];
  }
};

//language_change
export const languageChangeApi = async (language) => {
  try {
    const resp = await apiInstance.get(`language-change/${language}`);
    return [false, resp];
  } catch (err) {
    return [err, null];
  }
};

//reset-password
export const resetPasswordApi = async (body) => {
  try {
    const responseReset = await apiInstance.post(`/password/reset`, body);
    return [false, responseReset];
  } catch (errorReset) {
    return [errorReset, null];
  }
};

//verify_token
export const verifyToken = async (body) => {
  try {
    const responseVerifyToken = await apiInstance.post(
      `/password/token/varify`,
      body
    );
    return [false, responseVerifyToken];
  } catch (errorVerifyToken) {
    return [errorVerifyToken, null];
  }
};

//register
export const registrationApi = async (body) => {
  try {
    const responseToken = await apiInstance.post(`register`, body);
    return [false, responseToken];
  } catch (errorToken) {
    return [errorToken, null];
  }
};

//userInfoRegistration

export const userInfoRegistrationApi = async (body) => {
  try {
    const responseToken = await apiInstance.post(`user-info`, body);
    return [false, responseToken];
  } catch (errorToken) {
    return [errorToken, null];
  }
};

//user_details_with_token;
export const userDetailsApi = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  try {
    const response = await apiInstance.get(`auth-user`);
    console.log("🟥 ~ userDetailsApi ~ response:", response);
    // localStorage.setItem("additional_info", response?.data?.additional_info);
    localStorage.setItem("wishList", response?.data?.wishlists);
    localStorage.setItem("projectWishList", response?.data?.project_wishlists);
    localStorage.setItem("brokerWishList", response?.data?.broker_wishlists);
    localStorage.setItem("user", JSON.stringify(response?.data?.user));
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//find_state
export const stateApi = async () => {
  try {
    const response = await apiInstance.get(`state`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//find_property_type
export const propertyTypeApi = async (category) => {
  const params = { category };
  try {
    const response = await apiInstance.get(`property/property-type`, {
      params,
    });
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//find_features
export const featuresApi = async (type) => {
  try {
    const response = await apiInstance.get(`feature/index`, {
      params: omitEmpties({
        type: type,
      }),
    });
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//best_deals_state
export const bestDealsApi = async () => {
  try {
    const response = await apiInstance.get(`/property/best-deals`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//proposal_create
export const createProposalApi = async (body) => {
  try {
    const response = await apiInstance.post(`proposal/store`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//schedule_create
export const createScheduleApi = async (body) => {
  try {
    const response = await apiInstance.post(`schedule/create`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//get_projects
export const GetAllProjects = async (queryData) => {
  try {
    const response = await apiInstance.get(
      `project/index?page=${queryData.page || 1}&per_page=${
        queryData?.per_page || 9
      }`
    );
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//create_project
export const createProjectApi = async (body) => {
  try {
    const response = await apiInstance.post(`project/store`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};
export const updateProjectApi = async (body) => {
  try {
    const response = await apiInstance.post(`project/update`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//photo_type
export const photoTypeApi = async (type) => {
  try {
    const response = await apiInstance.get(`property/photo-type`, {
      params: omitEmpties({
        type: type,
      }),
    });
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//photo_type
export const videoTypeApi = async () => {
  try {
    const response = await apiInstance.get(`property/video-type`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//property
export const getPropertyApi = async (queryData) => {
  try {
    const response = await apiInstance.get(`property/index`, {
      params: omitEmpties({
        ...queryData,
        status: queryData?.status,
        page: queryData?.page,
        per_page: queryData?.per_page,
        relevant_filter: queryData?.relevant_filter,
        ad_type: queryData?.ad_type,
        // proposal_status: query?.proposal_status,
      }),
    });
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

// //project_property
// export const getProjectProperty = async (queryData) => {
//   try {
//     const response = await apiInstance.get(`property/index`, {
//       params: queryData,
//     });
//     return [false, response];
//   } catch (error) {
//     return [error, null];
//   }
// };

//property_status
export const propertyStatusApi = async (body) => {
  try {
    const response = await apiInstance.post(`property/status`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//include-proposal_create
export const proposalCreateApi = async (body) => {
  try {
    const response = await apiInstance.post(`proposal/store`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//getSingleProperty
export const getSinglePropertyApi = async (id) => {
  try {
    const response = await apiInstance.get(`property/show/${id}`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//create_new_feature
export const featureCreateApi = async (body) => {
  try {
    const response = await apiInstance.post(`feature/store`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//create_new-property
export const propertyCreateApi = async (body) => {
  try {
    const response = await apiInstance.post(`property/store`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//update_new-property
export const propertyUpdateApi = async (body) => {
  try {
    const response = await apiInstance.post(`property/update`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//accept_proposal
export const proposalAcceptApi = async (body) => {
  try {
    const response = await apiInstance.post(`proposal/accept`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//refuse_proposal
export const proposalRefuseApi = async (id) => {
  try {
    const response = await apiInstance.delete(`proposal/delete/${id}`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//contract_upload
export const contractUploadApi = async (body) => {
  try {
    const response = await apiInstance.post(`contract/file/upload`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//contract_download
export const contractDownloadApi = async (id) => {
  try {
    const response = await apiInstance.get(`contract/download`, {
      params: {
        id: id,
      },
    });
    window.open(`${response?.data?.url}`, "_blank");

    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//contract_download
export const certificateDownloadApi = async (id, certificate_type_id) => {
  try {
    const response = await apiInstance.get(`contract/certificate/download`, {
      params: {
        id: id,
        certificate_type_id: certificate_type_id,
      },
    });
    window.open(`${response?.data?.url}`, "_blank");
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//contract_details
export const contractDetailsApi = async (id) => {
  try {
    const response = await apiInstance.get(`contract/details`, {
      mode: "no-cors",
      params: {
        id: id,
      },
    });
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//contract_sign
export const contractSignApi = async (body) => {
  try {
    const response = await apiInstance.post(
      `contract/change/signature-staus`,
      body
    );
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//contract-next-step

export const contractNextStepApi = async (id) => {
  try {
    const response = await apiInstance.get(
      `contract/next-button?contract_id=${id}`
    );
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//certificate-next-step

export const certificateNextStepApi = async (id) => {
  try {
    const response = await apiInstance.get(
      `contract/next-button-2?contract_id=${id}`
    );
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//pre_analise_next_step
export const AnaliseNextStepApi = async (id) => {
  try {
    const response = await apiInstance.get(
      `contract/next-button-3?contract_id=${id}`
    );
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//require_ceritificate_submit
export const certificateSubmitApi = async (body) => {
  try {
    const response = await apiInstance.post(
      `contract/require-certificates-submit`,
      body
    );
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//signature_add
export const createSignatureApi = async (body) => {
  try {
    const response = await apiInstance.post(`contract/create/signature`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//getRequire_certificate
export const requireCertrificateApi = async (id) => {
  try {
    const response = await apiInstance.get(
      `contract/get-require-certificates?id=${id}`
    );
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//certificate_upload_api
export const certificateUploadApi = async (body) => {
  try {
    const response = await apiInstance.post(
      `contract/certificate/upload`,
      body
    );
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//getUpload_certificate
export const uploadCertrificateApi = async (id, type) => {
  try {
    const response = await apiInstance.get(
      `contract/get-uploaded-certificates`,
      {
        params: omitEmpties({
          id: id,
          type: type,
        }),
      }
    );
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//certificate_validation
export const certificateValidationApi = async (body) => {
  try {
    const response = await apiInstance.post(
      `/contract/certificate/validation`,
      body
    );
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//get_schedule
export const getScheduleApi = async () => {
  try {
    const response = await apiInstance.get(`/schedule/index`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//cancel_schedule
export const cancelScheduleApi = async (body) => {
  try {
    const response = await apiInstance.post(`/schedule/cancel`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//complete_schedule
export const completeScheduleApi = async (body) => {
  try {
    const response = await apiInstance.post(`/schedule/completed`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//get_broker
export const getBrokerApi = async (query) => {
  try {
    const response = await apiInstance.get(`/users/index`, {
      params: query,
    });
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//chnage_status_broker
export const changeBrokerStatusApi = async (body) => {
  try {
    const response = await apiInstance.post(`/users/status-update`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//delete_broker
export const deleteBrokerApi = async (id) => {
  try {
    const response = await apiInstance.delete(`users/delete/${id}`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//request_documents
export const requestDocumentsApi = async (id) => {
  try {
    const response = await apiInstance.get(
      `contract/check-certificate-validation?contract_id=${id}`
    );
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//view_certificate
export const certificateViewApi = async (contract_id, certificate_type_id) => {
  try {
    const response = await apiInstance.get(
      `contract/certificate/view?contract_id=${contract_id}&certificate_type_id=${certificate_type_id}`
    );
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//delete_certificate
export const certificateDeleteApi = async (
  contract_id,
  certificate_type_id
) => {
  try {
    const response = await apiInstance.delete(
      `contract/certificate/delete?contract_id=${contract_id}&certificate_type_id=${certificate_type_id}`
    );
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//certificate_validation
export const ContractCertificateValidationApi = async (body) => {
  try {
    const response = await apiInstance.post(
      `/contract/certificate/validation`,
      body
    );
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//documnet_send
export const DocumentSentApi = async (body) => {
  try {
    const response = await apiInstance.post(`/contract/documents/send`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//final_submitted
export const contractSubmittedDataApi = async (id) => {
  try {
    const response = await apiInstance.get(
      `contract/submitted-data?contract_id=${id}`
    );
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//proposal_count
export const proposalCountApi = async () => {
  try {
    const response = await apiInstance.get(`/proposal/count`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//property_count
export const propertyCountApi = async () => {
  try {
    const response = await apiInstance.get(`/property/register-count`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//broker_count
export const brokerCountApi = async () => {
  try {
    const response = await apiInstance.get(`/users/broker-count`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//getallnotification
export const getAllNotificationApi = async () => {
  try {
    const response = await apiInstance.get(`/notification`);
    // console.log(response)
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//getallnotificationcount
export const getAllNotificationCountApi = async () => {
  try {
    const response = await apiInstance.get(`/notification/count`);
    // console.log(response)
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//readNotification
export const NotificationReadApi = async (id) => {
  try {
    const response = await apiInstance.get(`notification/read?id=${id}`);
    // console.log(response)
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//readNotification
export const MakeFavouriteApi = async (propertyId) => {
  try {
    const response = await apiInstance.get(`property/wishlist/${propertyId}`);
    // console.log(response)
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};
export const MakeFavouriteProjectApi = async (projectId) => {
  try {
    const response = await apiInstance.get(`project/wishlist/${projectId}`);
    // console.log(response)
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};
export const MakeFavouriteBrokerApi = async (projectId) => {
  try {
    const response = await apiInstance.get(
      `users/broker-wishlist/${projectId}`
    );
    // console.log(response)
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//buyer-registered
export const IsBuyerRegisteredApi = async () => {
  try {
    const response = await apiInstance.get(`is-buyer-registered`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

export const getAddressData = async (zipCode) => {
  try {
    const response = await axios.get(`/api/getCep?cep=${zipCode}`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};
