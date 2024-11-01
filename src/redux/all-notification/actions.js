import { getAllNotificationApi } from "@/api";
import * as Types from "./types";

const notificationRequest = (data) => {
  return {
    type: Types.NOTIFICATION_REQUEST,
  };
};

const notificationSuccess = (data) => {
  return {
    type: Types.NOTIFICATION_SUCCESS,
    payload: data,
  };
};

const notificationFailed = (err) => {
  return {
    type: Types.NOTIFICATION_FAILED,
    payload: err,
  };
};

export const notificationAddPusherItem = (data) => {
  return {
    type: Types.NOTIFICATION_ADD,
    payload: data,
  };
};

export const notificationRemove = (data) => {
  return {
    type: Types.NOTIFICATION_REMOVE,
    payload: data,
  };
};

// NOTIFICATION
export const GetAllNotification = () => async (dispatch) => {
  dispatch(notificationRequest());
  const [error, response] = await getAllNotificationApi();
  if (!error) {
    dispatch(notificationSuccess(response?.data?.notification));
  } else {
    const errorMassage =
      error?.response?.data?.data || error?.response?.data?.status;
    // toast.error(errorMassage);
    dispatch(notificationFailed(errorMassage));
  }
};
