// import { stateApi } from "../../api";
import { propertyTypeApi } from '../../api'
import * as Types from './types'

const propertyTypeRequest = (data) => {
	return {
		type: Types.PROPERTY_TYPE_REQUEST,
	}
}

const propertyTypeSuccess = (data) => {
	return {
		type: Types.PROPERTY_TYPE_SUCCESS,
		payload: data,
	}
}

const propertyTypeFailed = (err) => {
	return {
		type: Types.PROPERTY_TYPE_FAILED,
		payload: err,
	}
}

// order action
export const findPropertyTypeData = (category) => async (dispatch) => {
	dispatch(propertyTypeRequest())

	const [error, response] = await propertyTypeApi(category)

	if (!error) {
		dispatch(propertyTypeSuccess(response?.data?.propertyType))
	} else {
		const errorMassage =
			error?.response?.data?.data || error?.response?.data?.status
		// toast.error(errorMassage);
		dispatch(propertyTypeFailed(errorMassage))
	}
}
