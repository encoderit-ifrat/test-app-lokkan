import * as Types from './types'

const InitialState = {
	scheduleData: {},
	loading: false,
}

const ScheduleReducer = (state = InitialState, action) => {
	switch (action.type) {
		case Types.SCHEDULE_REQUEST:
			return {
				scheduleData: {},
				loading: true,
			}

		case Types.SCHEDULE_SUCCESS:
			return {
				scheduleData: action.payload,
				loading: false,
			}

		case Types.SCHEDULE_REMOVE:
			const afterFiltered = state?.scheduleData?.data?.filter((schedule) => {
				return schedule.id !== action.payload
			})
			return {
				scheduleData: { ...state.scheduleData, data: afterFiltered },
			}

		case Types.SCHEDULE_FAILED:
			return {
				scheduleData: {},
				loading: false,
			}

		default:
			return state
	}
}

export default ScheduleReducer
