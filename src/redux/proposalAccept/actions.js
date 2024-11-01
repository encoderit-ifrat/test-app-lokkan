// import { stateApi } from "../../api";

import { propertyTypeApi, proposalAcceptApi } from '../../api'
import { propertyRemove } from '../property/actions'
import * as Types from './types'

const propertyAcceptRequest = (data) => {
	return {
		type: Types.PROPERTY_ACCEPT_REQUEST,
	}
}

const propertyAcceptSuccess = (data) => {
	return {
		type: Types.PROPERTY_ACCEPT_SUCCESS,
		payload: data,
	}
}

const propertyAcceptFailed = (err) => {
	return {
		type: Types.PROPERTY_ACCEPT_FAILED,
		payload: err,
	}
}


// order action
export const propertyAcceptData = (body) => async (dispatch) => {
	dispatch(propertyAcceptRequest())

	const [error, response] = await proposalAcceptApi(body)

	if (!error) {
		console.log({response})
		// dispatch(propertyRemove(body.property_id))

		// dispatch(propertyAcceptSuccess(response?.data?.proposal))
	} else {
		const errorMassage =
			error?.response?.data?.data || error?.response?.data?.status
		// toast.error(errorMassage);
		dispatch(propertyAcceptFailed(errorMassage))
	}
}
