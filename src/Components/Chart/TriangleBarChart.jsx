import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

// Sample data for the bar chart
const data = [
  { name: "Worker", uv: 400, pv: 2400, amt: 2400 },
  { name: "Buyer", uv: 300, pv: 2400, amt: 2400 },
  { name: "Admin", uv: 500, pv: 2400, amt: 2400 },
];

// Custom tooltip content
function getIntroOfPage(label) {
  if (label === "Worker") {
    return "Workers are essential for completing tasks";
  } else if (label === "Buyer") {
    return "Buyers purchase items from the platform";
  } else if (label === "Admin") {
    return "Admins manage the platform and users";
  }
}

// Custom Tooltip component to display detailed info on hover
function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">{getIntroOfPage(label)}</p>
        <p className="desc">This is a custom description based on the data.</p>
      </div>
    );
  }

  return null;
}

// Custom TriangleBar Shape for bars
const getTrianglePath = (x, y, width, height) =>
  `M${x},${y + height} 
   L${x + width / 2},${y} 
   L${x + width},${y + height} 
   Z`;

const TriangleBar = ({ fill, x, y, width, height }) => {
  const path = getTrianglePath(x, y, width, height);
  return <path d={path} stroke="none" fill={fill} />;
};

// TriangleBarChart component
const TriangleBarChart = () => {
  return (
    <BarChart width={600} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} />
    </BarChart>
  );
};

export default TriangleBarChart;
