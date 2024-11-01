import * as Types from "./types";

const InitialState = {
  proposalRefuseData: {},
  loading: false,
};

const ProposalRefuseReducer = (state = InitialState, action) => {
  switch (action.type) {
    case Types.PROPOSAL_REFUSE_REQUEST:
      return {
        proposalRefuseData: {},
        loading: true,
      };

    case Types.PROPOSAL_REFUSE_SUCCESS:
      return {
        proposalRefuseData: action.payload,
        loading: false,
      };

    case Types.PROPOSAL_REFUSE_FAILED:
      return {
        proposalRefuseData: {},
        loading: false,
      };

    default:
      return state;
  }
};

export default ProposalRefuseReducer;
