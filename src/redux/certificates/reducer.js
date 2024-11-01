import * as Types from './types'

const InitialState = {
	certificateData: [],
	loading: false,
}

const CertificateReducer = (state = InitialState, action) => {
	switch (action.type) {
		case Types.CERTIFICATE_REQUEST:
			return {
				certificateData: [],
				loading: true,
			}

		case Types.CERTIFICATE_SUCCESS:
			return {
				certificateData: action.payload,
				loading: false,
			}

		case Types.CERTIFICATE_FAILED:
			return {
				certificateData: [],
				loading: false,
			}

		default:
			return state
	}
}

export default CertificateReducer
