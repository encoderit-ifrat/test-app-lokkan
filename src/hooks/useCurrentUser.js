import { userDetailsApi } from "@/api";
import { useState, useEffect } from "react";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const wishList = localStorage.getItem("wishList");

  const projectWishList = localStorage.getItem("projectWishList");
  const brokerWishList = localStorage.getItem("brokerWishList");

  useEffect(() => {
    // Simulate fetching current user from an API
    const fetchCurrentUser = async () => {
      const [error, response] = await userDetailsApi();
      console.log(
        "🟥 ~ fetchCurrentUser ~ response?.data?.project_wishlists:",
        response?.data?.project_wishlists
      );
      if (!error) {
        localStorage.setItem("wishList", response?.data?.wishlists);
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
        localStorage.setItem(
          "projectWishList",
          response?.data?.project_wishlists
        );
        localStorage.setItem(
          "brokerWishList",
          response?.data?.broker_wishlists
        );
      }
    };

    if (token && !user) {
      fetchCurrentUser();
    }
    const LoggedInUser = JSON.parse(user);
    setCurrentUser({
      ...LoggedInUser,
      wishList,
      projectWishList,
      brokerWishList,
    });
    // Cleanup function (optional)
    return () => {
      // Cleanup logic if needed
    };
  }, [user, wishList, token, projectWishList, brokerWishList]); // Empty dependency array ensures this effect runs only once

  return currentUser;
};

export default useCurrentUser;
