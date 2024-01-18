import { Drawer } from "@mui/material";
import { X } from "@phosphor-icons/react";
import ChronosButton from "components/Comman/Buttons";
import DropdownInputForObject from "components/Comman/Inputs/DropdownInputForObject";
import ImageSelector from "components/Comman/Inputs/ImageSelector";
import RadioInput from "components/Comman/Inputs/RadioInput";
import SimpleTextArea from "components/Comman/Inputs/SimpleTextArea";
import { createChronicles } from "config/APIs/chronicles";
import { CHRONICLES_FOR } from "helpers/constants/chronicles";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCGCs } from "redux/college";
import { fetchAllProducts } from "redux/dropdown";
import { showToast } from "redux/toaster";

function CreateEditChronicle({ isOpen, closeModal, onUpdate, item }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state?.dropdown?.products);
  const cgcs = useSelector((state) => state?.college?.cgc);
  const [data, setData] = useState({});
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    setCreating(true);
    try {
      let body = {
        ...data,
      };

      const response = await createChronicles(body);

      onUpdate();
      closeModal();
    } catch (err) {
      dispatch(
        showToast({ message: err?.response?.data?.message, type: "error" })
      );
      console.log("Error", err);
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    if (products?.list?.length == 0) dispatch(fetchAllProducts());
    if (cgcs?.length == 0) dispatch(fetchAllCGCs());
  }, []);

  return (
    <Drawer
      anchor={window.innerWidth < 1024 ? "bottom" : "right"}
      open={isOpen}
      onClose={() => closeModal()}
      transitionDuration={500}
      PaperProps={{
        style: {
          width: window.innerWidth < 1024 ? "100%" : "100vw",
          height: window.innerWidth < 1024 ? "100vh" : "100vh",
          background: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <div className="h-screen flex flex-row items-end justify-between lg:justify-end">
        <div className="variation-bg max-h-[75vh] w-[100vh] lg:w-[720px] lg:max-h-screen relative rounded-t-2xl lg:rounded-t-none">
          <div className="z-40 flex cursor-pointer flex-row items-center justify-center absolute -top-16 lg:top-[50%] lg:-left-20 left-0 right-0 w-full lg:max-w-max">
            <div
              onClick={() => {
                closeModal();
              }}
              style={{ boxShadow: "0px 0px 30px 0px #FFF" }}
              className="text-white flex flex-row items-center justify-center h-10 w-10 bg-black rounded-full"
            >
              <X size={24} />
            </div>
          </div>
          <div className="md:max-w-xl lg:h-screen p-8 rounded-t-2xl lg:rounded-t-none bg-white mx-auto w-full transform transition-all ease-in-out duration-150 space-y-6">
            <div className="flex flex-col items-start space-y-2 text-primary-gray-800 font-karla text-base font-medium rounded-t-2xl">
              <div className="flex flex-row items-center space-x-2">
                Add A Chronicle
              </div>
            </div>

            <div className="flex flex-col w-full space-y-2">
              <h1 className="text-primary-gray-800 font-lato text-sm font-semibold">
                Adding story for:
              </h1>
              <DropdownInputForObject
                srOnly
                label="Story For"
                field="storyFor"
                list={CHRONICLES_FOR}
                details={data}
                setDetails={setData}
              />
            </div>
            {data?.storyFor == "product" && (
              <div className="flex flex-col w-full space-y-2">
                <h1 className="text-primary-gray-800 font-lato text-sm font-semibold">
                  Select Product
                </h1>
                <DropdownInputForObject
                  srOnly
                  label="Product"
                  field="productId"
                  list={products?.list?.map((item) => ({
                    label: item?.name,
                    value: item?.id,
                  }))}
                  details={data}
                  setDetails={setData}
                />
              </div>
            )}
            {data?.storyFor == "event" && (
              <>
                <div className="flex flex-col w-full space-y-2">
                  <RadioInput
                    srOnly
                    list={[
                      { label: "Upcoming Event", value: "upcoming" },
                      { label: "Completed Event", value: "completed" },
                    ]}
                    value={data?.eventType}
                    setValue={(val) => {
                      setData({
                        ...data,
                        eventType: val,
                      });
                    }}
                  />
                </div>
                <div className="flex flex-col w-full space-y-2">
                  <h1 className="text-primary-gray-800 font-lato text-sm font-semibold">
                    Add event Graphic
                  </h1>
                  <ImageSelector
                    srOnly
                    onSuccess={(val) => {
                      setData({
                        ...data,
                        eventGraphic: val,
                        eventGraphicId: val?.id,
                      });
                    }}
                    onDelete={() => {
                      setData({
                        ...data,
                        eventGraphic: null,
                        eventGraphicId: null,
                      });
                    }}
                    image={data?.eventGraphic}
                  />
                </div>
              </>
            )}
            {data?.storyFor == "cgc" && (
              <>
                <div className="flex flex-col w-full space-y-2">
                  <h1 className="text-primary-gray-800 font-lato text-sm font-semibold">
                    Select CGC
                  </h1>
                  <DropdownInputForObject
                    srOnly
                    label="CGC"
                    field="cgcId"
                    list={cgcs?.map((item) => ({
                      label: item?.name,
                      value: item?.id,
                    }))}
                    details={data}
                    setDetails={setData}
                  />
                </div>
                <div className="flex flex-col w-full space-y-2">
                  <h1 className="text-primary-gray-800 font-lato text-sm font-semibold">
                    Select Icon
                  </h1>
                  <div className="flex flex-row items-stretch space-x-3">
                    {[
                      { image: "/assets/svg/chronicle/mic.svg", name: "mic" },
                      {
                        image: "/assets/svg/chronicle/graph.svg",
                        name: "graph",
                      },
                      {
                        image: "/assets/svg/chronicle/calendar.svg",
                        name: "calendar",
                      },
                      { image: "/assets/svg/chronicle/add.svg", name: "add" },
                    ]?.map((item) => {
                      return (
                        <div
                          onClick={() => {
                            setData({
                              ...data,
                              icon: { svg: item?.name },
                            });
                          }}
                          className={`p-1 rounded-lg ${
                            data?.icon?.svg == item?.name
                              ? "border border-primary-neutral-400"
                              : ""
                          }`}
                        >
                          <img src={item?.image} alt="" className="w-8 h-8" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
            <div className="flex flex-col w-full space-y-2">
              <h1 className="text-primary-gray-800 font-lato text-sm font-semibold">
                Add Story Description
              </h1>
              <SimpleTextArea
                srOnly
                label="description"
                field="description"
                details={data}
                setDetails={setData}
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-5 py-4 border-t border-primary-gray-200 ">
              <ChronosButton
                text="Cancel"
                tertiary
                onClick={() => {
                  setData({});
                  closeModal();
                }}
              />
              <ChronosButton
                loader={creating}
                text="Save"
                primary
                yellow
                onClick={() => {
                  handleCreate();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default CreateEditChronicle;
