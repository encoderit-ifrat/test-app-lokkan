import * as Types from './types'

const InitialState = {
	featureData: {},
	loading: false,
}

const FeatureReducer = (state = InitialState, action) => {
	switch (action.type) {
		case Types.FEATURE_REQUEST:
			return {
				featureData: {},
				loading: true,
			}

		case Types.FEATURE_SUCCESS:
			return {
				featureData: action.payload,
				loading: false,
			}

		case Types.FEATURE_FAILED:
			return {
				featureData: {},
				loading: false,
			}

		default:
			return state
	}
}

export default FeatureReducer
