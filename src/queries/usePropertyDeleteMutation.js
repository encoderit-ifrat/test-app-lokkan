import { apiInstance } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePropertyDeleteMutation = (page) => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries([
      "/get-all-property",
      { status: "third", page: page, per_page: 9 },
    ]);

    queryClient.invalidateQueries(["/count-property"]);
  };
  return useMutation({
    onSuccess,
    mutationKey: "/property-delete",
    mutationFn(body) {
      return apiInstance.delete(`property/delete/${body?.property_id}`);
    },
  });
};
