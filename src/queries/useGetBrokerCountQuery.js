import { apiInstance } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetBrokerCountQuery = () => {
  return useQuery({
    queryKey: ["/count-broker"],
    retry: 2,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    keepPreviousData: true,
    staleTime: 0,
    queryFn: async () => {
      return await apiInstance.get(`/users/broker-count`);
    },
  });
};