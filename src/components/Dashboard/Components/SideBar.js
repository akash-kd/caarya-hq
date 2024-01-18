import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Messages from "./Messages";
import Tabs from "components/Comman/Tabs";
import { useSelector } from "react-redux";
import {
  CATEGORY_CHANGE_REQUESTS,
  CATEGORY_INBOX,
  CATEGORY_REVIEW_REQUESTS,
} from "helpers/constants/notification";

const tabs = [
  {
    label: "Requests",
    value: "Requests",
    count: 14,
  },
  {
    label: "Announcements",
    value: "Announcements",
    count: 14,
  },
  {
    label: "Messages",
    value: "Messages",
    count: 25,
  },
];

export default function SideComponent({ closeModal, isOpen }) {
  const notification = useSelector((state) => state?.notification?.list);
  const [selectedTab, setSelectedTab] = useState("Requests");

  const getList = () => {
    let temp = [];

    switch (selectedTab) {
      case "Requests":
        temp = notification?.filter(
          (n) =>
            n?.category == CATEGORY_CHANGE_REQUESTS ||
            n?.category == CATEGORY_REVIEW_REQUESTS
        );
        break;
      case "Announcements":
        temp = notification?.filter(
          (n) => n?.category == CATEGORY_INBOX && n?.title?.includes("Alert")
        );
        break;
      case "Messages":
        temp = notification?.filter(
          (n) => n?.category == CATEGORY_INBOX && n?.title?.includes("comment")
        );
        break;
      default:
    }
    return temp;
  };

  return (
    <Drawer
      anchor={window.innerWidth < 1024 ? "bottom" : "right"}
      open={isOpen}
      onClose={() => closeModal()}
      transitionDuration={500}
      PaperProps={{
        style: { width: window.innerWidth < 1024 ? "100%" : "500px" },
      }}
    >
      <div className="font-lato p-4">
        <Tabs
          tabs={tabs}
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
        />

        <Messages list={getList()} type={selectedTab} />
        {/* {selectedTab === "Requests" && <Request />} */}
        {/* {selectedTab === "Messages" && <Messages />} */}
      </div>
    </Drawer>
  );
}
