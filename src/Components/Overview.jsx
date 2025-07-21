import React from "react";

function Overview({ goals }) {
  const totalTarget = goals.reduce((sum, goal) => sum + Number(goal.targetAmount), 0);
  const totalSaved = goals.reduce((sum, goal) => sum + Number(goal.savedAmount), 0);
  const totalRemaining = totalTarget - totalSaved;

  return (
    <div>
      <h2>Overview</h2>
      <p>Total Target: Ksh {totalTarget}</p>
      <p>Total Saved: Ksh {totalSaved}</p>
      <p>Remaining: Ksh {totalRemaining}</p>
    </div>
  );
}

export default Overview;

