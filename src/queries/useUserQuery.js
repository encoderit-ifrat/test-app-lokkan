import { apiInstance } from "@/api";
import {  useMutation } from "@tanstack/react-query";

export const useUserUpdateMutation = () => {

  return useMutation({
    mutationKey: "/user-update",
    mutationFn(body) {
      return apiInstance.post(`users/update`, body);
    },
  });
};
