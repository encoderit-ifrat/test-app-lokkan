import * as Types from './types'

const InitialState = {
	buttonData: [],
	loading: false,
}

const ButtonReducer = (state = InitialState, action) => {
	switch (action.type) {
		case Types.BUTTON_REQUEST:
			return {
				ButtonData: [],
				loading: true,
			}

		case Types.BUTTON_SUCCESS:
			return {
				buttonData: action.payload,
				loading: false,
			}

		case Types.BUTTON_FAILED:
			return {
				buttonData: [],
				loading: false,
			}

		default:
			return state
	}
}

export default ButtonReducer
