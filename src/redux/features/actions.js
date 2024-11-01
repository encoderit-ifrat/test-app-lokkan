import { featureCreateApi, featuresApi } from "../../api";
import * as Types from "./types";

const featureRequest = (data) => {
  return {
    type: Types.FEATURE_REQUEST,
  };
};

const featureSuccess = (data) => {
  return {
    type: Types.FEATURE_SUCCESS,
    payload: data,
  };
};

const featureFailed = (err) => {
  return {
    type: Types.FEATURE_FAILED,
    payload: err,
  };
};

// const groupByType = (propertyType) =>
//   propertyType?.reduce((group, product) => {
//     const { type } = product;
//     group[type] = group[type] ?? [];
//     group[type].push(product);
//     return group;
//   }, {});

// feature action
export const findFeatureData = () => async (dispatch) => {
  dispatch(featureRequest());

  const [error, response] = await featuresApi();

  if (!error) {
    const requireData = response?.data?.data;
    console.log({ requireData });

    dispatch(featureSuccess(requireData));
  } else {
    const errorMassage =
      error?.response?.data?.data || error?.response?.data?.status;
    // toast.error(errorMassage);
    dispatch(featureFailed(errorMassage));
  }
};

//FEATURE_CREATE
// export const featureDataCreate = (body) => async (dispatch) => {

//   const [error,response] = await featureCreateApi(body)
//   if(!error){
//     dispatch(featureCreateSuccess(response?.data?.feature))
//   }
//   else{
//     const errorMassage =
//       error?.response?.data?.data || error?.response?.data?.status;
//     dispatch(featureCreateFailed(errorMassage))
//   }
// }
