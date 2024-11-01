import { apiInstance } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useAddCompanyMutation = () => {
  return useMutation({
    mutationKey: "/add-company",
    mutationFn(body) {
      return apiInstance.post(`company`, body);
    },
  });
};