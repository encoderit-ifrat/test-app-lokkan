import * as Types from "./types";

const InitialState = {
  propertyData: {},
  loading: false,
};

const PropertyReducer = (state = InitialState, action) => {
  switch (action.type) {
    case Types.PROPERTY_REQUEST:
      return {
        propertyData: {},
        loading: true,
      };

    case Types.PROPERTY_SUCCESS:
      return {
        propertyData: action.payload,
        loading: false,
      };

    case Types.PROPERTY_REMOVE:
      const afterFiltered = state?.propertyData?.data?.filter((property) => {
        return property.id !== action.payload;
      });
      return {
        propertyData: { ...state.propertyData, data: afterFiltered },
      };

    // case Types.PROPERTY_PROPOSAL_REMOVE:
    //   const afterFilteredProposal = state?.propertyData?.data?.map(
    //     (property) =>
    //       property.id === action.payload.propertyId &&
    //       property?.proposals.filter((proposal) => {
    //         return proposal.id !== action.payload.proposalId;
    //       })
    //   );
    //   console.log({ afterFilteredProposal });
    //   return {
    //     propertyData: { ...state.propertyData, data: afterFilteredProposal },
    //   };

    case Types.PROPERTY_FAILED:
      return {
        propertyData: {},
        loading: false,
      };

    default:
      return state;
  }
};

export default PropertyReducer;
