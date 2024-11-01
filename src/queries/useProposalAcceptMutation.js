import { apiInstance } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useProposalAcceptMutation = () => {
  return useMutation({
    mutationKey: "/property-accept",
    mutationFn(body) {
      return apiInstance.post(`proposal/accept`, body);
    },
  });
};