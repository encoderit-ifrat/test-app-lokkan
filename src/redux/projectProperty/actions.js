// import { getProjectProperty } from "../../api";
// import * as Types from "./types";

// const projectPropertyRequest = (data) => {
//   return {
//     type: Types.PROJECT_PROPERTY_REQUEST,
//   };
// };

// const projectPropertySuccess = (data) => {
//   return {
//     type: Types.PROJECT_PROPERTY_SUCCESS,
//     payload: data,
//   };
// };

// const projectPropertyFailed = (err) => {
//   return {
//     type: Types.PROJECT_PROPERTY_FAILED,
//     payload: err,
//   };
// };

// //project_property action
// export const findProjectPropertyData = (queryData) => async (dispatch) => {
//   dispatch(projectPropertyRequest());

//   const [error, response] = await getProjectProperty(queryData);
//   console.log({ response });

//   if (!error) {
//     const requireData = response?.data?.properties;
//     dispatch(projectPropertySuccess(requireData));
//   } else {
//     const errorMassage =
//       error?.response?.data?.data || error?.response?.data?.status;
//     // toast.error(errorMassage);
//     dispatch(projectPropertyFailed(errorMassage));
//   }
// };
