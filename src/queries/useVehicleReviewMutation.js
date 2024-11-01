import { apiInstance } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useVehicleReviewMutation = () => {
  return useMutation({
    mutationKey: "/vehicle-price",
    mutationFn(body) {
      return apiInstance.post(`set-vehicle-price`, body);
    },
  });
};
