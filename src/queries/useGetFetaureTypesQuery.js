import { apiInstance } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetFeatureTypesQuery = () => {
  return useQuery({
    queryKey: ["/get-feature-types"],
    // enabled: !!q,'
    retry: 2,
    // refetchOnWindowFocus: true,
    // refetchOnMount: true,
    keepPreviousData: true,
    staleTime: 0,
    // initialData: () => [],
    queryFn: async () => {
      return (await apiInstance.get(`feature/types`))?.data?.data;
    },
  });
};
