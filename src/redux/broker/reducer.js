import * as Types from './types'

const InitialState = {
	brokerData: {},
	loading: false,
}

const BrokerReducer = (state = InitialState, action) => {
	switch (action.type) {
		case Types.BROKER_REQUEST:
			return {
				brokerData: {},
				loading: true,
			}

		case Types.BROKER_SUCCESS:
			return {
				brokerData: action.payload,
				loading: false,
			}
		case Types.BROKER_REMOVE:
			const afterFiltered = state?.brokerData?.data?.filter((broker) => {
				return broker.id !== action.payload
			})
			return {
				brokerData: { ...state.scheduleData, data: afterFiltered },
			}

		case Types.BROKER_FAILED:
			return {
				brokerData: {},
				loading: false,
			}

		default:
			return state
	}
}

export default BrokerReducer
