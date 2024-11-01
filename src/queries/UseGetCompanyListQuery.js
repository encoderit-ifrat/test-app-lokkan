import { apiInstance } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetCompanyListQuery = (params) => {
  return useQuery({
    queryKey: ["/company"],
    // enabled: !!q,'
    retry: 2,
    // refetchOnWindowFocus: true,
    // refetchOnMount: true,
    keepPreviousData: true,
    staleTime: 0,
    // initialData: () => [],
    queryFn: async () => {
      return(
        await apiInstance.get(`/company`, {
          params,
        }))?.data?.data
      },
    });
};
