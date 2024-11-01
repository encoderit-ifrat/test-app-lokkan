import { apiInstance } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetProposalQuery = (proposal_id) => {
  return useQuery({
    queryKey: [`/get-proposal-${proposal_id}`],
    enabled: !!proposal_id,
    retry: 2,
    // refetchOnWindowFocus: true,
    // refetchOnMount: true,
    keepPreviousData: true,
    staleTime: 0,
    // initialData: () => [],
    queryFn: async () => {
      return await apiInstance.get(`proposal/show/${proposal_id}`);
    },
  });
};
