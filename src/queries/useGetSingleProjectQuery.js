import { apiInstance } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetSingleProjectQuery = (projectId) => {
  return useQuery({
    queryKey: ["/get-single-project"],
    enabled: !!projectId,
    keepPreviousData: false,
    refetchOnWindowFocus: true,
    // cacheTime: 0,
    // staleTime: 0,

    staleTime: 0,
    queryFn: async () => {
      return (await apiInstance.get(`project/show/${projectId}`))?.data;
    },
  });
};
