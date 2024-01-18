import Tabs from "components/Comman/Tabs";
import React, { useEffect, useState } from "react";
import MobileDashboard from "components/Dashboard/MobileDashboard";
import { getDashboardData } from "config/APIs/dashboard";
import Verse from "components/Dashboard/Verse";

function Today() {
  const [selectedSharedTab, setSelectedSharedTab] = useState("my");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getDashboardData();
      let data = response.data.data;
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => fetchData(), []);

  return (
    <>
      <div className="flex flex-col">
        <Tabs
          tabs={[
            { label: "My Caarya", value: "my" },
            { label: "Across the verse", value: "verse" },
          ]}
          selectedTab={selectedSharedTab}
          setSelectedTab={setSelectedSharedTab}
        />

        <div className={`w-full max-h-[80vh] overflow-y-auto pb-20`}>
          {selectedSharedTab == "my" && <MobileDashboard data={data} />}
          {selectedSharedTab == "verse" && <Verse data={data} />}
        </div>
      </div>
    </>
  );
}

export default Today;
