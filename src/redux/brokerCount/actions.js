import { brokerCountApi } from '@/api'
import * as Types from './types'

const brokerCountRequest = (data) => {
	return {
		type: Types.BROKER_COUNT_REQUEST,
	}
}

const brokerCountSuccess = (data) => {
	return {
		type: Types.BROKER_COUNT_SUCCESS,
		payload: data,
	}
}

const brokerCountFailed = (err) => {
	return {
		type: Types.BROKER_COUNT_FAILED,
		payload: err,
	}
}

// count action
export const findBrokerCountData = () => async (dispatch) => {
	dispatch(brokerCountRequest())

	const [error, response] = await brokerCountApi()

	if (!error) {
		dispatch(brokerCountSuccess(response?.data))
	} else {
		const errorMassage =
			error?.response?.data?.data || error?.response?.data?.status
		// toast.error(errorMassage);
		dispatch(brokerCountFailed(errorMassage))
	}
}
