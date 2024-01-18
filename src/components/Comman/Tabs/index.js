import { useEffect, useState, useRef } from "react";

function Tabs({ tabs, selectedTab, setSelectedTab }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef([]);

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }

    setTabPosition();
    window.addEventListener("resize", setTabPosition);

    return () => window.removeEventListener("resize", setTabPosition);
  }, [activeTabIndex]);

  useEffect(() => {
    let idx = tabs?.findIndex((a) => a?.value == selectedTab);
    setActiveTabIndex(idx);
  }, [selectedTab]);

  return (
    <div className="pt-5 pb-2 relative">
      <div className="flex flex-row items-center justify-start overflow-x-auto">
        {tabs.map((item, idx) => {
          return (
            <div
              key={idx}
              id={`selected-${item.value}`}
              ref={(el) => (tabsRef.current[idx] = el)}
              onClick={() => {
                setSelectedTab(item?.value);
                setActiveTabIndex(idx);
              }}
              className="min-w-max"
            >
              <div
                className={`flex px-3 pb-1 flex-row cursor-pointer text-xs lg:text-sm items-end justify-center font-lato text-center hover:font-bold ${
                  selectedTab == item?.value
                    ? "font-semibold text-primary-yellow-700"
                    : "font-semibold text-primary-neutral-400"
                }`}
              >
                {item?.label}
              </div>
            </div>
          );
        })}
      </div>

      <span
        className="absolute bottom-1 rounded-sm block h-[3px] bg-primary-yellow-700 transition-all duration-300"
        style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
      />
    </div>
  );
}

function DividerTabs({ tabs, selectedTab, setSelectedTab }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef([]);

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }

    setTabPosition();
    window.addEventListener("resize", setTabPosition);

    return () => window.removeEventListener("resize", setTabPosition);
  }, [activeTabIndex]);

  useEffect(() => {
    let idx = tabs?.findIndex((a) => a?.value == selectedTab);
    setActiveTabIndex(idx);
  }, [selectedTab]);

  return (
    <div className="px-4 lg:px-0 pt-3 pb-2 bg-white shadow relative">
      <div className="w-full grid grid-cols-2 divide-x-2 divide-primary-neutral-100">
        {tabs.map((item, idx) => {
          return (
            <div
              key={idx}
              id={`selected-${item.value}`}
              onClick={() => {
                setSelectedTab(item?.value);
                setActiveTabIndex(idx);
              }}
              className="min-w-max flex flex-row items-center justify-center"
            >
              <div
                ref={(el) => (tabsRef.current[idx] = el)}
                className={` px-6 pb-2 cursor-pointer text-sm lg:text-sm font-karla text-center hover:font-bold ${
                  selectedTab == item?.value
                    ? "font-medium text-primary-yellow-darker "
                    : "font-light text-primary-neutral-500"
                }`}
              >
                {item?.label}
              </div>
            </div>
          );
        })}
      </div>

      <span
        className="absolute bottom-1 rounded-sm block h-[4px] bg-primary-yellow-medium transition-all duration-300"
        style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
      />
    </div>
  );
}

export default Tabs;

export { DividerTabs };
