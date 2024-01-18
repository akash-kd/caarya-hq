import { Star } from "@phosphor-icons/react";
import { updateATrack } from "config/APIs/tracks";
import { defaultTracks, trackIcons } from "helpers/constants/tracks";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const TrackIcon = ({ item }) => {
  return (
    <div
      style={{
        background: defaultTracks?.find((a) => a?.title == item?.title)
          ? defaultTracks?.find((a) => a?.title == item?.title)?.icon
              ?.backgroundColor
          : item?.icon?.backgroundColor || "#FAFAFA",
      }}
      className="rounded h-8 w-8  flex flex-row items-center justify-center"
    >
      {defaultTracks?.find((a) => a?.title == item?.title) ? (
        <div
          style={{
            color: defaultTracks?.find((a) => a?.title == item?.title)?.icon
              ?.color,
          }}
          className="flex flex-row items-center justify-center rounded"
        >
          {React.cloneElement(
            defaultTracks?.find((a) => a?.title == item?.title)?.icon?.svg,
            {}
          )}
        </div>
      ) : (
        item?.icon?.svg && (
          <div
            style={{ color: item?.icon?.color || "#CFCDC9" }}
            className="flex flex-row items-center justify-center rounded"
          >
            {React.cloneElement(
              trackIcons?.find((a) => a?.name == item?.icon?.svg)?.svg,
              {}
            )}
          </div>
        )
      )}
    </div>
  );
};

function TrackCard({ item, onUpdate }) {
  const history = useHistory();

  const user = useSelector((state) => state?.user?.user);
  const [starred, setStarred] = useState(false);

  const getCollaborator = () => {
    let user1 = item?.members?.filter((m) => m?.id !== user?.id);
    return user1?.length > 0 ? user1[0] : null;
  };

  useEffect(() => {
    setStarred(item?.starred);
  }, [item]);

  const handleUpdate = async ({ starred }) => {
    try {
      let body = {};
      if (starred) body["starred"] = starred;

      await updateATrack(item?.id, body);

      onUpdate();
    } catch (err) {
      console.log("Error", err);
      console.log(err?.response);
    }
  };

  return (
    <div className="p-2 pr-3 flex flex-row items-center space-x-5  border-b border-primary-gray-200 bg-white relative">
      <div
        onClick={() => {
          history.push(`/tracks/${item?.id}`);
        }}
        className="flex flex-row items-start space-x-5 w-full "
      >
        <TrackIcon item={item} />
        <div className="flex flex-col gap-1 tracking-wide ">
          <h1 className="text-primary-gray-800 font-poppins text-sm font-medium capitalize ">
            {item?.title}
          </h1>

          {getCollaborator() ? (
            <p className="text-primary-gray-300 font-lato text-xs font-light">
              Shared with • <u>{getCollaborator()?.first_name}</u>
            </p>
          ) : (
            <p className="text-primary-gray-300 font-lato text-xs font-light">
              Not Shared
            </p>
          )}
          <p className="text-primary-gray-300 font-lato text-xs font-semibold">
            {item?.goals?.length || 0} Goals
          </p>
        </div>
      </div>
      {defaultTracks?.map((i) => i?.title)?.includes(item?.title) && (
        <div className="absolute top-0 right-0 bg-gradient-to-b from-[#A193F2] to-[#D8D7F9] w-4 h-4 triangle "></div>
      )}
      <Star
        size={20}
        weight="fill"
        onClick={() => {
          handleUpdate({ starred: !starred });
          setStarred(!starred);
        }}
        color={starred ? "#FFD844" : "#E7E6E5"}
      />
    </div>
  );
}

export default TrackCard;
