import { getAllNotificationCountApi } from '@/api'
import * as Types from './types'

const notificationCountRequest = (data) => {
	return {
		type: Types.NOTIFICATION_COUNT_REQUEST,
	}
}

const notificationCountSuccess = (data) => {
	return {
		type: Types.NOTIFICATION_COUNT_SUCCESS,
		payload: data,
	}
}

const notificationCountFailed = (err) => {
	return {
		type: Types.NOTIFICATION_COUNT_FAILED,
		payload: err,
	}
}

export const notificationAddCount = (data) => {
	return {
		type: Types.NOTIFICATION_ADD_COUNT,
		payload: data,
	}
}

// count action
export const findNotificationCountData = () => async (dispatch) => {
	dispatch(notificationCountRequest())

	const [error, response] = await getAllNotificationCountApi()

	if (!error) {
		dispatch(notificationCountSuccess(response?.data))
	} else {
		const errorMassage =
			error?.response?.data?.data || error?.response?.data?.status
		// toast.error(errorMassage);
		dispatch(notificationCountFailed(errorMassage))
	}
}
