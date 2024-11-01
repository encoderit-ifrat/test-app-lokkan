import * as Types from './types'

const InitialState = {
	viewCertificateData: {},
	loading: false,
}

const ViewCertificateReducer = (state = InitialState, action) => {
	switch (action.type) {
		case Types.VIEW_CERTIFICATE_REQUEST:
			return {
				viewCertificateData: {},
				loading: true,
			}

		case Types.VIEW_CERTIFICATE_SUCCESS:
			return {
				viewCertificateData: action.payload,
				loading: false,
			}

		// case Types.CERTIFICATE_REMOVE:
		// 	const afterFiltered = state?.scheduleData?.data?.filter((schedule) => {
		// 		return schedule.id !== action.payload
		// 	})
		// 	return {
		// 		scheduleData: { ...state.scheduleData, data: afterFiltered },
		// 	}

		case Types.VIEW_CERTIFICATE_FAILED:
			return {
				viewCertificateData: {},
				loading: false,
			}

		default:
			return state
	}
}

export default ViewCertificateReducer
