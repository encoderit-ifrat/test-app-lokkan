import { apiInstance } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllReferralBrokerQuery = (params) => {
  return useQuery({
    queryKey: ["/get-broker"],
    enabled: !!params?.user_type,
    keepPreviousData: true,
    staleTime: 0,
    // initialData: () => [],
    queryFn: async () => {
      return await apiInstance.get(`/users/index`, {
        params,
      });
    },
  });
};
