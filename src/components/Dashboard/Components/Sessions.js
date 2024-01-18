import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);
function Sessions({ list }) {
  const [labels, setLabels] = useState([
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
  ]);
  const [total, setTotal] = useState(0);
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
    setTotal(tot);
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
    <div className="p-4 rounded-xl shadow bg-white flex flex-col items-start space-y-8 w-full">
      <p className="text-primary-neutral-800 font-lato text-base font-semibold">
        Sessions
      </p>
      <div className="flex flex-col items-center space-y-2 w-full">
        <p className="text-primary-neutral-800 font-lato text-5xl font-semibold">
          {total}
        </p>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}

export default Sessions;
