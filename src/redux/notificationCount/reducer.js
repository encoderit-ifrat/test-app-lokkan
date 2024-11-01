import * as Types from './types'

const InitialState = {
	notificationCountData: {},
	loading: false,
}

const NotificationCountReducer = (state = InitialState, action) => {
	switch (action.type) {
		case Types.NOTIFICATION_COUNT_REQUEST:
			return {
				notificationCountData: {},
				loading: true,
			}

		case Types.NOTIFICATION_COUNT_SUCCESS:
			return {
				notificationCountData: action.payload,
				loading: false,
			}

		case Types.NOTIFICATION_ADD_COUNT:
			return {
				notificationCountData: {
					count: state.notificationCountData.count + action.payload,
				},
				loading: false,
			}

		case Types.NOTIFICATION_COUNT_FAILED:
			return {
				notificationCountData: {},
				loading: false,
			}

		default:
			return state
	}
}

export default NotificationCountReducer
