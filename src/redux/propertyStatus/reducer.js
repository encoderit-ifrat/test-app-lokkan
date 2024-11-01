import * as Types from './types'

const InitialState = {
	approveLoading: false,
	rejectLoading: false,
}

const PropertyStatusReducer = (state = InitialState, action) => {
	switch (action.type) {
		case Types.PROPERTY_STATUS_REQUEST:
			return {
				approveLoading: action.payload.status === 'approved' ? true : false,
				rejectLoading: action.payload.status === 'rejected' ? true : false,
			}

		case Types.PROPERTY_STATUS_SUCCESS:
			return {
				approveLoading: false,
				rejectLoading: false,
			}

		case Types.PROPERTY_STATUS_FAILED:
			return {
				approveLoading: false,
				rejectLoading: false,
			}

		default:
			return state
	}
}

export default PropertyStatusReducer
