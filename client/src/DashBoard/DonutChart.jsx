import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FiMoreHorizontal } from "react-icons/fi";
import HeaderComponent from "../Components/HeaderComponent";

const DonutChart = ({ departmentBookings = [], eventTypes = [], eventSatisfaction = [] }) => {
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
    name,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  };

  // Default data if no props provided
  const defaultDepartmentBookings = [
    { name: "CSE", value: 4 },
    { name: "ECE", value: 3 },
    { name: "MECH", value: 2 },
    { name: "CIVIL", value: 2 },
  ];

  const defaultEventTypes = [
    { name: "Workshops", value: 25 },
    { name: "Seminars", value: 15 },
    { name: "Conferences", value: 13 },
    { name: "Others", value: 10 },
  ];

  const defaultEventSatisfaction = [
    { name: "Very Satisfied", value: 5 },
    { name: "Satisfied", value: 4 },
    { name: "Neutral", value: 3 },
    { name: "Dissatisfied", value: 2 },
  ];

  // Use provided data or fallback to defaults
  const deptBookings = departmentBookings.length > 0 ? departmentBookings : defaultDepartmentBookings;
  const evtTypes = eventTypes.length > 0 ? eventTypes : defaultEventTypes;
  const satisfaction = eventSatisfaction.length > 0 ? eventSatisfaction : defaultEventSatisfaction;

  const COLORS = {
    blue: ["#60A5FA", "#3B82F6", "#2563EB", "#1D4ED8"],
    green: ["#4ADE80", "#22C55E", "#16A34A", "#15803D"],
    red: ["#FF8A8A", "#EF4444", "#DC2626", "#B91C1C"],
  };

  // Calculate totals for center text
  const totalDeptBookings = deptBookings.reduce((sum, item) => sum + item.value, 0);
  const totalEventTypes = evtTypes.reduce((sum, item) => sum + item.value, 0);
  const totalSatisfaction = satisfaction.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      {/* Department Bookings */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-6">Department Bookings</h2>
        <div className="h-64 flex items-center justify-center">
          <PieChart width={200} height={200}>
            <Pie
              data={deptBookings}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {deptBookings.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS.blue[index % COLORS.blue.length]}
                />
              ))}
            </Pie>
            <text x={100} y={100} textAnchor="middle" dominantBaseline="middle">
              <tspan x={100} dy="-0.5em" className="text-xl font-bold">
                {totalDeptBookings}
              </tspan>
              <tspan x={100} dy="1.5em" className="text-sm">
                Total Booking
              </tspan>
            </text>
          </PieChart>
        </div>
      </div>

      {/* Event Types */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-6">Event Types</h2>
        <div className="h-64 flex items-center justify-center">
          <PieChart width={200} height={200}>
            <Pie
              data={evtTypes}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {evtTypes.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS.green[index % COLORS.green.length]}
                />
              ))}
            </Pie>
            <text x={100} y={100} textAnchor="middle" dominantBaseline="middle">
              <tspan x={100} dy="-0.5em" className="text-xl font-bold">
                {totalEventTypes}
              </tspan>
              <tspan x={100} dy="1.5em" className="text-sm">
                Total Events
              </tspan>
            </text>
          </PieChart>
        </div>
      </div>

      {/* Event Satisfaction */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-6">Event Satisfaction</h2>
        <div className="h-64 flex items-center justify-center">
          <PieChart width={200} height={200}>
            <Pie
              data={satisfaction}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {satisfaction.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS.red[index % COLORS.red.length]}
                />
              ))}
            </Pie>
            <text x={100} y={100} textAnchor="middle" dominantBaseline="middle">
              <tspan x={100} dy="-0.5em" className="text-xl font-bold">
                {totalSatisfaction}
              </tspan>
              <tspan x={100} dy="1.5em" className="text-sm">
                Total Rating
              </tspan>
            </text>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
