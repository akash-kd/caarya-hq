import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import React from "react";
import { useHistory } from "react-router-dom";

function Card({ item }) {
  const history = useHistory();
  return (
    <div
      style={{
        boxShadow:
          "0px 4px 6px -4px rgba(0, 0, 0, 0.10), 0px 10px 15px -3px rgba(0, 0, 0, 0.10), 0px 0px 16px 0px rgba(0, 0, 0, 0.05)",
      }}
      className="relative cursor-pointer bg-white p-4 rounded-xl w-full flex flex-col justify-between space-y-6"
    >
      <h1 className="z-20 text-black font-lato text-2xl leading-9 font-medium">
        {item?.name}
      </h1>
      <p
        className={`flex flex-row justify-between items-end text-5xl font-medium text-primary-error-500 font-karla`}
      >
        {item?.image && <img src={item?.image} alt="" className="" />}
        <ArrowRight
          onClick={() => {
            item?.path && history.push(item?.path);
          }}
          size={24}
        />
      </p>
    </div>
  );
}

export default Card;
