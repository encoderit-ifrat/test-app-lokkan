import {
  Badge,
  Box,
  Button,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import Image from "next/image";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import React, { useEffect, useState } from "react";
import useChannel from "@/hooks/useChannel";
import { useDispatch, useSelector } from "react-redux";
import {
  findNotificationCountData,
  notificationAddCount,
} from "@/redux/notificationCount/actions";
import notifyImage from "../../../public/Images/notify.png";
import {
  GetAllNotification,
  notificationRemove,
} from "@/redux/all-notification/actions";
import { NotificationReadApi } from "@/api";
import { useSession } from "next-auth/react";
import en from "locales/en";
import pt from "locales/pt";

function NotificationContent({ pageName, session, language }) {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(findNotificationCountData());
  //   dispatch(GetAllNotification());
  // }, [dispatch]);
  // const notificationCountData = useSelector(
  //   (state) => state?.notificationCount?.notificationCountData
  // );

  // const notificationData = useSelector(
  //   (state) => state?.notification?.notificationData
  // );

  // useChannel("notification-broadcast." + session?.user?.userId, (channel) => {
  //   // console.log('useChannel', channel)
  //   channel
  //     // .here((...args) => {
  //     // 	console.log('notification-broadcast:here', ...args)
  //     // })
  //     // .joining((...args) => {
  //     // 	console.log('notification-broadcast:joining', ...args)
  //     // })
  //     // .leaving((...args) => {
  //     // 	console.log('notification-broadcast:leaving', ...args)
  //     // })
  //     .listen(".OnCreateNewSchedule", (event) => {
  //       console.log("notification-broadcast:NotificationEvent", event);
  //       dispatch(notificationAddPusherItem(event.notification));
  //       dispatch(notificationAddCount(1));
  //     });
  //   // .listenForWhisper('ping', (event) => {
  //   // 	console.log('notification-broadcast:ping', event)
  //   // })
  // });

  // const handleReadNotification = async (data) => {
  //   const [error, response] = await NotificationReadApi(data?.id);
  //   if (!error) {
  //     dispatch(notificationRemove(data?.id));
  //     dispatch(notificationAddCount(-1));
  //   }
  // };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [myValue, setMyValue] = useState(language || "pt");

  const t = myValue === "en" ? en : pt;
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Typography
        variant="p"
        sx={{
          color: "#002152",
          fontSize: "24px",
          fontWeight: "700",
          lineHeight: "32px",
          ml: { xs: 4, sm: 4, md: 0, lg: 0, xl: 0 },
          mt: { xs: 1, sm: 1, md: 0, lg: 0, xl: 0 },
        }}
      >
        {t[pageName]}
      </Typography>
      {/* <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        sx={{
          p: 0,
          background: "transparent",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
            background: "transparent",
          },
        }}
      >
        <Badge badgeContent={notificationCountData?.count} color="primary">
          <Image src={notifyImage} alt="notify" />
        </Badge>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: 350,
            maxWidth: 360,
            minWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          {notificationData?.map((data, index) => (
            <ListItem
              // style={style}
              key={index}
              component="div"
              disablePadding
              sx={{ width: 360 }}
            >
              <ListItemButton onClick={() => handleReadNotification(data)}>
                <ListItemIcon>
                  <NotificationsNoneOutlinedIcon sx={{ color: "#7dd3fc" }} />
                </ListItemIcon>
                <ListItemText primary={data?.data} />
              </ListItemButton>
            </ListItem>
          ))}
        </Box>
      </Popover> */}
    </Grid>
  );
}

export default NotificationContent;
