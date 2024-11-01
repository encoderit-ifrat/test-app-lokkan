import { apiInstance } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetSingleVehicleQuery = (vehicle_id) => {
  return useQuery({
    queryKey: [`/get-vehicle-${vehicle_id}`],
    enabled: !!vehicle_id,
    retry: 2,
    // refetchOnWindowFocus: true,
    // refetchOnMount: true,
    keepPreviousData: true,
    staleTime: 0,
    // initialData: () => [],
    queryFn: async () => {
      return await apiInstance.get(`vehicle/${vehicle_id}`);
    },
  });
};
