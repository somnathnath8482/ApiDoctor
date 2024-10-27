import React, { useContext, useState } from "react";


import TaskToolbar from "../common/TaskToolbar";

import Dashboard from "./Dashboard/Dashboard";

import { UserContext } from "../context/MyContext";

// Functional Component
const AfterLoginHome = () => {
  // Render content based on selected page
  const renderContent = () => {
    return <Dashboard />;
  };

  return (
    <div>
      {/* Toolbar for menu icon */}
      <TaskToolbar setState={()=>{}}/>
      <main style={{ flexGrow: 1 }}>{renderContent()}</main>
    </div>
  );
};

export default AfterLoginHome;
