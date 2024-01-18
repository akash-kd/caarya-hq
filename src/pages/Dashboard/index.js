import React, { useEffect, useState } from "react";
import LaptopDashboard from "components/Dashboard/LaptopDashboard";
import MobileDashboard from "components/Dashboard/MobileDashboard";
import { getDashboardData } from "config/APIs/dashboard";

function Dashboard() {
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
      <div className="hidden lg:block">
        <LaptopDashboard data={data} />
      </div>
      <div className="block lg:hidden">
        <MobileDashboard data={data} />
      </div>
    </>
  );
}

export default Dashboard;
