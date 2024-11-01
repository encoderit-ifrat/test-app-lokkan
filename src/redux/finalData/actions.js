import { contractSubmittedDataApi } from '../../api'
import * as Types from './types'

const finalSubmittedDataRequest = (data) => {
	return {
		type: Types.FINAL_SUBMITTED_DATA_REQUEST,
	}
}

const finalSubmittedDataSuccess = (data) => {
	return {
		type: Types.FINAL_SUBMITTED_DATA_SUCCESS,
		payload: data,
	}
}

const finalSubmittedDataFailed = (err) => {
	return {
		type: Types.FINAL_SUBMITTED_DATA_FAILED,
		payload: err,
	}
}

// require certificate action
export const getFinalSubmittedData = (id) => async (dispatch) => {
	dispatch(finalSubmittedDataRequest())
	const [error, response] = await contractSubmittedDataApi(id)
	if (!error) {
		dispatch(finalSubmittedDataSuccess(response?.data))
	} else {
		const errorMassage =
			error?.response?.data?.data || error?.response?.data?.status
		// toast.error(errorMassage);
		dispatch(finalSubmittedDataFailed(errorMassage))
	}
}
