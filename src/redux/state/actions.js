import { stateApi } from '../../api'
import * as Types from './types'

const stateRequest = (data) => {
	return {
		type: Types.STATE_REQUEST,
	}
}

const stateSuccess = (data) => {
	return {
		type: Types.STATE_SUCCESS,
		payload: data,
	}
}

const stateFailed = (err) => {
	return {
		type: Types.STATE_FAILED,
		payload: err,
	}
}

// order action
export const findStateData = () => async (dispatch) => {
	dispatch(stateRequest())

	const [error, response] = await stateApi()

	if (!error) {
		dispatch(stateSuccess(response?.data?.states))
	} else {
		const errorMassage =
			error?.response?.data?.data || error?.response?.data?.status
		// toast.error(errorMassage);
		dispatch(stateFailed(errorMassage))
	}
}
