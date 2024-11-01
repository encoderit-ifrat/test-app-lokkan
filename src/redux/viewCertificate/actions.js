import { certificateDeleteApi, certificateViewApi } from '../../api'
import * as Types from './types'

const viewCertificateRequest = (data) => {
	return {
		type: Types.VIEW_CERTIFICATE_REQUEST,
	}
}

const viewCertificateSuccess = (data) => {
	return {
		type: Types.VIEW_CERTIFICATE_SUCCESS,
		payload: data,
	}
}

const viewCertificateFailed = (err) => {
	return {
		type: Types.VIEW_CERTIFICATE_FAILED,
		payload: err,
	}
}

// require certificate action
export const getViewCertificateData = (
	contract_id,
	certificate_type_Id
) => async (dispatch) => {
	dispatch(viewCertificateRequest())
	const [error, response] = await certificateViewApi(
		contract_id,
		certificate_type_Id
	)
	if (!error) {
		dispatch(viewCertificateSuccess(response?.data))
	} else {
		const errorMassage =
			error?.response?.data?.data || error?.response?.data?.status
		// toast.error(errorMassage);
		dispatch(viewCertificateFailed(errorMassage))
	}
}
