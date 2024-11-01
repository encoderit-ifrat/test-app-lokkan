import * as Types from './types'

const InitialState = {
	brokerCountData: {},
	loading: false,
}

const BrokerCountReducer = (state = InitialState, action) => {
	switch (action.type) {
		case Types.BROKER_COUNT_REQUEST:
			return {
				brokerCountData: {},
				loading: true,
			}

		case Types.BROKER_COUNT_SUCCESS:
			return {
				brokerCountData: action.payload,
				loading: false,
			}

		case Types.BROKER_COUNT_FAILED:
			return {
				brokerCountData: {},
				loading: false,
			}

		default:
			return state
	}
}

export default BrokerCountReducer
