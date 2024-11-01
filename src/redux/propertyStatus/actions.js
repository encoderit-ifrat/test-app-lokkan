import { propertyStatusApi } from '../../api'
import { propertyRemove } from '../property/actions'
import * as Types from './types'

const propertyStatusRequest = (data) => {
	return {
		type: Types.PROPERTY_STATUS_REQUEST,
		payload: data,
	}
}

const propertyStatusSuccess = (data) => {
	return {
		type: Types.PROPERTY_STATUS_SUCCESS,
		payload: data,
	}
}

const propertyStatusFailed = (err) => {
	return {
		type: Types.PROPERTY_STATUS_FAILED,
		payload: err,
	}
}

//property_status_action
export const ChangePropertyStatus = (body) => async (dispatch) => {
	dispatch(propertyStatusRequest(body))

	const [error, response] = await propertyStatusApi(body)

	if (!error) {
		dispatch(propertyRemove(body.property_id))
		const requireData = response?.data?.property
		dispatch(propertyStatusSuccess(requireData))
	} else {
		const errorMassage =
			error?.response?.data?.data || error?.response?.data?.status
		// toast.error(errorMassage);
		dispatch(propertyStatusFailed(errorMassage))
	}
}
