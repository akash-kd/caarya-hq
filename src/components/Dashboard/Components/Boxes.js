import { useSelector } from "react-redux";

import {
  CATEGORY_CHANGE_REQUESTS,
  CATEGORY_INBOX,
  CATEGORY_REVIEW_REQUESTS,
} from "helpers/constants/notification";

const Box = ({ title, count, items, onClick }) => {
  const idx = title === "Requests" ? 0 : title === "Announcements" ? 1 : 2;
  return (
    <div className="md:mb-8 bg-white rounded-base shadow-md p-2 md:px-3 md:py-2 rounded-[10px]">
      <div
        className="text-xs cursor-pointer md:text-base text-primary-yellow-darkest"
        onClick={() => onClick(idx)}
      >
        {title} <span className="block md:inline">({count})</span>
      </div>
      <div className="mt-2.5 gap-2 hidden md:flex">
        {items?.map((item) => (
          <div className="relative text-primary-yellow-dark text-2xs px-2 py-0.5 bg-[#FAF4DE] rounded-md mb-2">
            {item.title}
            <div className="absolute -top-3 -right-2 bg-primary-yellow-dark text-white rounded-full text-[10px] px-1.5 text-center">
              {item.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Boxes({ setOpenMobileCreateModal, setActiveTab }) {
  const notification = useSelector((state) => state?.notification?.list);
  const getCount = (type) => {
    let temp = [];

    switch (type) {
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
    return temp?.length;
  };

  const handleClick = (e) => {
    setOpenMobileCreateModal(true);
    setActiveTab(e);
  };
  return (
    <>
      <Box
        title="Requests"
        count={getCount("Requests")}
        items={[
          {
            title: "T-shirt Size",
            count: 2,
          },
          {
            title: "Request to Focus",
            count: 21,
          },
        ]}
        onClick={handleClick}
      />

      <Box
        title="Announcements"
        count={getCount("Announcements")}
        items={[
          {
            title: "Add collab",
            count: 21,
          },
          {
            title: "Documentation",
            count: 17,
          },
          {
            title: "Due Date",
            count: 1,
          },
        ]}
        onClick={handleClick}
      />
      <Box
        title="Messages"
        count={getCount("Messages")}
        items={[
          {
            title: "Developer",
            count: 8,
          },
          {
            title: "Managers",
            count: 11,
          },
          {
            title: "Interns",
            count: 10,
          },
        ]}
        onClick={handleClick}
      />
    </>
  );
}
