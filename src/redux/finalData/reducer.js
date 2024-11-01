import * as Types from './types'

const InitialState = {
	finalSubmittedData: {},
	loading: false,
}

const FinalSubmittedDataReducer = (state = InitialState, action) => {
	switch (action.type) {
		case Types.FINAL_SUBMITTED_DATA_REQUEST:
			return {
				finalSubmittedData: {},
				loading: true,
			}

		case Types.FINAL_SUBMITTED_DATA_SUCCESS:
			return {
				finalSubmittedData: action.payload,
				loading: false,
			}

		case Types.FINAL_SUBMITTED_DATA_FAILED:
			return {
				finalSubmittedData: {},
				loading: false,
			}

		default:
			return state
	}
}

export default FinalSubmittedDataReducer
