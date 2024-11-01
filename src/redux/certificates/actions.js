import { featuresApi } from '../../api'
import * as Types from './types'

const certificateRequest = (data) => {
	return {
		type: Types.CERTIFICATE_REQUEST,
	}
}

const certificateSuccess = (data) => {
	return {
		type: Types.CERTIFICATE_SUCCESS,
		payload: data,
	}
}

const certificateFailed = (err) => {
	return {
		type: Types.CERTIFICATE_FAILED,
		payload: err,
	}
}

// feature action
export const findCertificateData = (type) => async (dispatch) => {
	dispatch(certificateRequest())
	const [error, response] = await featuresApi(type)
	if (!error) {
		dispatch(certificateSuccess(response?.data?.data?.certificate))
	} else {
		const errorMassage =
			error?.response?.data?.data || error?.response?.data?.status
		// toast.error(errorMassage);
		dispatch(certificateFailed(errorMassage))
	}
}

//FEATURE_CREATE
// export const featureDataCreate = (body) => async (dispatch) => {

//   const [error,response] = await featureCreateApi(body)
//   if(!error){
//     dispatch(featureCreateSuccess(response?.data?.feature))
//   }
//   else{
//     const errorMassage =
//       error?.response?.data?.data || error?.response?.data?.status;
//     dispatch(featureCreateFailed(errorMassage))
//   }
// }
