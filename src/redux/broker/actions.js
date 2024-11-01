import { changeBrokerStatusApi, deleteBrokerApi, getBrokerApi } from '../../api'
import * as Types from './types'

const brokerRequest = (data) => {
	return {
		type: Types.BROKER_REQUEST,
	}
}

const brokerSuccess = (data) => {
	return {
		type: Types.BROKER_SUCCESS,
		payload: data,
	}
}

const brokerFailed = (err) => {
	return {
		type: Types.BROKER_FAILED,
		payload: err,
	}
}

export const brokerRemove = (id) => {
	return {
		type: Types.BROKER_REMOVE,
		payload: id,
	}
}

// getBroker
export const findBrokerData = (query) => async (dispatch) => {
	dispatch(brokerRequest())
	const [error, response] = await getBrokerApi(query)
	if (!error) {
		dispatch(brokerSuccess(response?.data?.users))
	} else {
		const errorMassage =
			error?.response?.data?.data || error?.response?.data?.status
		// toast.error(errorMassage);
		dispatch(brokerFailed(errorMassage))
	}
}

//status_change_broker
export const changeStatusBroker = (body) => async (dispatch) => {
	const [error, response] = await changeBrokerStatusApi(body)

	if (!error) {
		dispatch(brokerRemove(body.user_id))
	} else {
		const errorMassage =
			error?.response?.data?.data || error?.response?.data?.status
	}
}

//status_change_broker
export const deleteBroker = (id) => async (dispatch) => {
	const [error, response] = await deleteBrokerApi(id)

	if (!error) {
		dispatch(brokerRemove(id))
	} else {
		const errorMassage =
			error?.response?.data?.data || error?.response?.data?.status
	}
}
