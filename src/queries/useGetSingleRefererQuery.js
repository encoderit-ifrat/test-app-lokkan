import { apiInstance } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetSingleRefererQuery = (referrer_id) => {
  return useQuery({
    queryKey: [`/referer-single-${referrer_id}`],
    enabled: !!referrer_id,
    retry: 2,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    keepPreviousData: true,
    staleTime: 0,
    // initialData: () => [],
    queryFn: async () => {
      return (await apiInstance.get(`/referrer-credits/${referrer_id}`))?.data
        ?.data;
    },
  });
};
