import { apiInstance } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useFeatureTypeDeleteMutation = () => {
  return useMutation({
    // onSuccess,
    mutationKey: "/feature-type-delete",
    mutationFn(body) {
      return apiInstance.delete(`feature/delete-feature/${body.type}`);
    },
  });
};
