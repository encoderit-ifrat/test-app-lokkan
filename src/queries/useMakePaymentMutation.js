import { apiInstance } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMakePaymentMutation = () => {
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
    mutationKey: "/make-payment",
    mutationFn(body) {
      return apiInstance.post(`make-payment`, body);
    },
  });
};
