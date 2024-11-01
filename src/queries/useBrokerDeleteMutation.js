import { apiInstance } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBrokerDeleteMutation = (page) => {
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
    mutationKey: "/broker-delete",
    mutationFn(body) {
      return apiInstance.delete(`users/delete/${body?.broker_id}`);
    },
  });
};
