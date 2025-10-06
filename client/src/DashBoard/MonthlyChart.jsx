import React from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";

const MonthlyChart = ({ monthlyData = [] }) => {
  // Default data if no props provided
  const defaultData = [
    { name: "Jan", uv: 4000 },
    { name: "Feb", uv: 3000 },
    { name: "Mar", uv: 2000 },
    { name: "Apr", uv: 2780 },
    { name: "May", uv: 1890 },
    { name: "Jun", uv: 2390 },
    { name: "Jul", uv: 3490 },
    { name: "Aug", uv: 2780 },
    { name: "Sep", uv: 1890 },
    { name: "Oct", uv: 2390 },
    { name: "Nov", uv: 3490 },
    { name: "Dec", uv: 3490 },
  ];

  // Use provided data or fallback to defaults
  const data = monthlyData.length > 0 ? monthlyData : defaultData;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="mt-10 ml-10">
      <AreaChart
        width={670}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="pv"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
      </div>
    </div>
  );
};

export default MonthlyChart;
