// import { stateApi } from "../../api";
import {
	propertyTypeApi,
	proposalAcceptApi,
	proposalRefuseApi,
} from '../../api'
import { propertyProposalRemove, propertyRemove } from '../property/actions'
import * as Types from './types'

const propertyRefuseRequest = (data) => {
	return {
		type: Types.PROPOSAL_REFUSE_REQUEST,
	}
}

const propertyRefuseSuccess = (data) => {
	return {
		type: Types.PROPOSAL_REFUSE_SUCCESS,
		payload: data,
	}
}

const propertyRefuseFailed = (err) => {
	return {
		type: Types.PROPOSAL_REFUSE_FAILED,
		payload: err,
	}
}

// order action
export const proposalRefuseData = (property_id, proposal_id) => async (
	dispatch
) => {
	dispatch(propertyRefuseRequest())

	const [error, response] = await proposalRefuseApi(proposal_id)

	if (!error) {
		//   dispatch(propertyProposalRemove(property_id, proposal_id));

		dispatch(propertyRefuseSuccess(response?.data?.proposal))
	} else {
		const errorMassage =
			error?.response?.data?.data || error?.response?.data?.status
		// toast.error(errorMassage);
		dispatch(propertyRefuseFailed(errorMassage))
	}
}
