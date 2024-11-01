import { apiInstance } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetPropertyCountQuery = () => {
  return useQuery({
    queryKey: ["/count-property"],
    retry: 2,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    keepPreviousData: true,
    staleTime: 0,
    queryFn: async () => {
      return await apiInstance.get(`/property/register-count`);
    },
  });
};
