import React, { Fragment } from "react";
import SideBar from "./components/sidebar";
import TopBar from "./components/topbar";

const Dashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <div>
        <SideBar />
      </div>
      <div style={{ width: "100%" }}>
        <TopBar />
      </div>
    </div>
  );
};

export default Dashboard;
