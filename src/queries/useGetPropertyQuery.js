import { apiInstance } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetPropertyQuery = (params) => {
  return useQuery({
    queryKey: [`/get-all-property`],
    // enabled: !!q,'
    retry: 2,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    keepPreviousData: true,
    staleTime: 0,
    // initialData: () => [],
    queryFn: async () => {
      return (
        await apiInstance.get(`property/index`, {
          params,
        })
      )?.data?.properties;
    },
  });
};
