import { ArrowRight } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import { useHistory } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);
function ClockInHistory({ list }) {
  const history = useHistory();

  const [labels, setLabels] = useState([
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
  ]);

  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: "Session",
        data: [2, 4, 3, 6, 12, 0, 5],
        backgroundColor: "#A193F2",
      },
    ],
  });
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
  };

  useEffect(() => {
    let minDate = moment().add(-7, "days");
    let maxDate = moment();
    let array = [];
    let tot = 0;
    while (minDate.isSameOrBefore(maxDate)) {
      array.push(minDate.format("YYYY-MM-DD"));
      minDate.add(1, "days");
    }
    let data = [];
    array.map((i) => {
      data?.push(
        list?.find(
          (a) =>
            moment(a?.date).format("YYYY-MM-DD") ==
            moment(i).format("YYYY-MM-DD")
        )?.sessionCount || 0
      );
      tot += parseInt(
        list?.find(
          (a) =>
            moment(a?.date).format("YYYY-MM-DD") ==
            moment(i).format("YYYY-MM-DD")
        )?.sessionCount || 0
      );
    });

    setLabels(array.reverse()?.map((a) => moment(a).format("DD")));
    setData({
      labels,
      datasets: [
        {
          label: "Session",
          data: data?.reverse(),
          backgroundColor: "#A193F2",
        },
      ],
    });
  }, [list]);
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col space-y-8">
      <div className="w-full flex flex-row items-center justify-between">
        <p className="text-primary-neutral-800 font-lato text-base font-semibold">
          Clock In History
        </p>
        <div
          onClick={() => {
            history.push("/journal");
          }}
          className="text-xs text-secondary-indigo-700 font-lato font-semibold underline underline-offset-2 flex flex-row items-center space-x-1"
        >
          <p>View Timesheet</p>
          <ArrowRight size={12} />
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-4">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}

export default ClockInHistory;
