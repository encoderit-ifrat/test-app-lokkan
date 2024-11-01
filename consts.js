import Pusher from "pusher-js";

export const _baseURL = process.env.NEXT_PUBLIC_API_URL;
export const _imageURL = process.env.NEXT_PUBLIC_IMAGE_URL;
export const _baseMAP = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
export const PERM = {
  CAN_USER_VIEW: "can-user-view",
  CAN_USER_CREATE: "can-user-create",
  CAN_USER_UPDATE: "can-user-update",
};

export const _gaId = process.env.NEXT_PUBLIC_GA_ID;
export const _gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
});
