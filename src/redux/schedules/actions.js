import {
  cancelScheduleApi,
  completeScheduleApi,
  getScheduleApi,
} from "../../api";
import * as Types from "./types";

const scheduleRequest = (data) => {
  return {
    type: Types.SCHEDULE_REQUEST,
  };
};

const scheduleSuccess = (data) => {
  return {
    type: Types.SCHEDULE_SUCCESS,
    payload: data,
  };
};

const scheduleFailed = (err) => {
  return {
    type: Types.SCHEDULE_FAILED,
    payload: err,
  };
};

export const scheduleRemove = (id) => {
  return {
    type: Types.SCHEDULE_REMOVE,
    payload: id,
  };
};

// schedule
export const findScheduleData = (id) => async (dispatch) => {
  dispatch(scheduleRequest());
  const [error, response] = await getScheduleApi(id);
  if (!error) {
    dispatch(scheduleSuccess(response?.data?.schedule));
  } else {
    const errorMassage =
      error?.response?.data?.data || error?.response?.data?.status;
    // toast.error(errorMassage);
    dispatch(scheduleFailed(errorMassage));
  }
};

//deleteSchedule
export const cancelSchedule = (body) => async (dispatch) => {
  const [error, response] = await cancelScheduleApi(body);

  if (!error) {
    dispatch(scheduleRemove(body.schedule_id));
  } else {
    const errorMassage =
      error?.response?.data?.data || error?.response?.data?.status;
  }
};

export const completeSchedule = (body) => async (dispatch) => {
  const [error, response] = await completeScheduleApi(body);

  if (!error) {
    dispatch(scheduleRemove(body.schedule_id));
  } else {
    const errorMassage =
      error?.response?.data?.data || error?.response?.data?.status;
  }
};
