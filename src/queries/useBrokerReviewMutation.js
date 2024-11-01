import { apiInstance } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useBrokerReviewMutation = () => {
  return useMutation({
    mutationKey: "/broker-review",
    mutationFn(body) {
      return apiInstance.post(`broker/ratings`, body);
    },
  });
};
