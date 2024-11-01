import { apiInstance } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePropertyStatusUpdateMutation = (page) => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries([
      "/get-all-property",
      { status: "new", page: page, per_page: 9 },
    ]);

    queryClient.invalidateQueries(["/count-property"]);
  };
  return useMutation({
    onSuccess,
    mutationKey: "/property-status-update",
    mutationFn(body) {
      return apiInstance.post(`property/status`, body);
    },
  });
};
