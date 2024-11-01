import { GetAllProjects } from '../../api'
import * as Types from './types'

const projectsRequest = (data) => {
	return {
		type: Types.PROJECTS_REQUEST,
	}
}

const projectsSuccess = (data) => {
	return {
		type: Types.PROJECTS_SUCCESS,
		payload: data,
	}
}

const projectsFailed = (err) => {
	return {
		type: Types.PROJECTS_FAILED,
		payload: err,
	}
}

//projects action
export const findProjectsData = (queryData) => async (dispatch) => {
	dispatch(projectsRequest())

	const [error, response] = await GetAllProjects(queryData)

	if (!error) {
		const requireData = response?.data?.projects
		dispatch(projectsSuccess(requireData))
	} else {
		const errorMassage =
			error?.response?.data?.data || error?.response?.data?.status
		// toast.error(errorMassage);
		dispatch(projectsFailed(errorMassage))
	}
}
