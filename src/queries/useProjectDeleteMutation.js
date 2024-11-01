import { apiInstance } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useProjectDeleteMutation = (page) => {
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
    mutationKey: "/project-delete",
    mutationFn(body) {
      return apiInstance.delete(`project/delete/${body?.project_id}`);
    },
  });
};
