import * as Types from './types'

const InitialState = {
	notificationData: [],
	loading: false,
}

const NotificationReducer = (state = InitialState, action) => {
	switch (action.type) {
		case Types.NOTIFICATION_REQUEST:
			return {
				notificationData: [],
				loading: true,
			}

		case Types.NOTIFICATION_SUCCESS:
			return {
				notificationData: action.payload,
				loading: false,
			}

		case Types.NOTIFICATION_ADD:
			return {
				notificationData: [action.payload, ...state.notificationData],
				loading: false,
			}

		case Types.NOTIFICATION_REMOVE:
			const afterFiltered = state?.notificationData?.filter(
				(notification) => {
					return notification.id !== action.payload
				}
			)

			return {
				notificationData: afterFiltered,
			}

		case Types.NOTIFICATION_FAILED:
			return {
				notificationData: [],
				loading: false,
			}

		default:
			return state
	}
}

export default NotificationReducer
