import { getPropertyApi } from '../../api'
import * as Types from './types'

const propertyRequest = (data) => {
	return {
		type: Types.PROPERTY_REQUEST,
	}
}

const propertySuccess = (data) => {
	return {
		type: Types.PROPERTY_SUCCESS,
		payload: data,
	}
}

const propertyFailed = (err) => {
	return {
		type: Types.PROPERTY_FAILED,
		payload: err,
	}
}

export const propertyRemove = (id) => {
	return {
		type: Types.PROPERTY_REMOVE,
		payload: id,
	}
}

// export const propertyProposalRemove = (property_id, proposal_id) => {
//   return {
//     type: Types.PROPERTY_PROPOSAL_REMOVE,
//     payload: {
//       propertyId: property_id,
//       proposalId: proposal_id,
//     },
//   };
// };

//property action
export const findPropertyData = (queryData) => async (dispatch) => {
	dispatch(propertyRequest())

	const [error, response] = await getPropertyApi(queryData)

	if (!error) {
		const requireData = response?.data?.properties
		dispatch(propertySuccess(requireData))
	} else {
		const errorMassage =
			error?.response?.data?.data || error?.response?.data?.status
		// toast.error(errorMassage);
		dispatch(propertyFailed(errorMassage))
	}
}
