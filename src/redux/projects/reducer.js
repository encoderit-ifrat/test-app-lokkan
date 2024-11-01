import * as Types from "./types";

const InitialState = {
  projectData: {},
  loading: false,
};

const ProjectReducer = (state = InitialState, action) => {
  switch (action.type) {
    case Types.PROJECTS_REQUEST:
      return {
        projectData: {},
        loading: true,
      };

    case Types.PROJECTS_SUCCESS:
      return {
        projectData: action.payload,
        loading: false,
      };

    case Types.PROJECTS_FAILED:
      return {
        projectData: {},
        loading: false,
      };

    default:
      return state;
  }
};

export default ProjectReducer;
