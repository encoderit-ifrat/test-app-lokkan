import { apiInstance } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProjectsQuery = (params) => {
  return useQuery({
    queryKey: ["/get-all-projects"],
    // enabled: !!q,'
    retry: 2,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    keepPreviousData: true,
    staleTime: 0,
    // initialData: () => [],
    queryFn: async () => {
      return(
      await apiInstance.get(`project/index`, {
        params,
      }))?.data?.projects
    },
  });
};
