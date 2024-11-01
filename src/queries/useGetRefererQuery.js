import { apiInstance } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetRefererQuery = (params) => {
  return useQuery({
    queryKey: [`/referer-${params?.referrer_id || "all"}`],
    // enabled: !!q,'
    retry: 2,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    keepPreviousData: true,
    staleTime: 0,
    // initialData: () => [],
    queryFn: async () => {
      return (
        await apiInstance.get(`/referrer-credits`, {
          params,
        })
      )?.data?.data;
    },
  });
};
