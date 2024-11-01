import { apiInstance } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useSendCompanyMutation = () => {
  return useMutation({
    mutationKey: "/send-company",
    mutationFn(body) {
      return apiInstance.post(`send-email-to-car-company`, body);
    },
  });
};
