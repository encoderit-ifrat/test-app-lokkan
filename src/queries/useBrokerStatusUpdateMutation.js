import { apiInstance } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBrokerStatusUpdateMutation = (page) => {
  //   const queryClient = useQueryClient();

  //   const onSuccess = () => {
  //     queryClient.invalidateQueries([
  //       "/get-all-property",
  //       { status: "third", page: page, per_page: 9 },
  //     ]);

  //     queryClient.invalidateQueries(["/count-property"]);
  //   };
  return useMutation({
    // onSuccess,
    mutationKey: "/broker-status-update",
    mutationFn(body) {
      return apiInstance.post(`/users/status-update`, body);
    },
  });
};
