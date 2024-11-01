import { apiInstance } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetProposalCountQuery = () => {
  return useQuery({
    queryKey: ["/count-proposal"],
    retry: 2,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    keepPreviousData: true,
    staleTime: 0,
    queryFn: async () => {
      return await apiInstance.get(`/proposal/count`);
    },
  });
};
