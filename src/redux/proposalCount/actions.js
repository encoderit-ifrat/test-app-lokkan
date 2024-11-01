import { proposalCountApi } from '../../api'
import * as Types from './types'

const countRequest = (data) => {
	return {
		type: Types.COUNT_REQUEST,
	}
}

const countSuccess = (data) => {
	return {
		type: Types.COUNT_SUCCESS,
		payload: data,
	}
}

const countFailed = (err) => {
	return {
		type: Types.COUNT_FAILED,
		payload: err,
	}
}

// count action
export const findProposalCountData = () => async (dispatch) => {
	dispatch(countRequest())

	const [error, response] = await proposalCountApi()

	if (!error) {
		dispatch(countSuccess(response?.data))
	} else {
		const errorMassage =
			error?.response?.data?.data || error?.response?.data?.status
		// toast.error(errorMassage);
		dispatch(countFailed(errorMassage))
	}
}
