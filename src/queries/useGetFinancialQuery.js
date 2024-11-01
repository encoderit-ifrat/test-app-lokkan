import { apiInstance } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetFinancialQuery = (params) => {
  return useQuery({
    queryKey: [`/get-sold-property`],
    // enabled: !!q,'
    retry: 2,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    keepPreviousData: true,
    staleTime: 0,
    // initialData: () => [],
    queryFn: async () => {
      return (
        await apiInstance.get(`/sold-property`, {
          params,
        })
      )?.data?.data;
    },
  });
};
