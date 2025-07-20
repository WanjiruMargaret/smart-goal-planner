import React from "react";

function Overview({ goals }) {
  const totalTarget = goals.reduce((sum, goal) => sum + Number(goal.targetAmount), 0);
  const totalSaved = goals.reduce((sum, goal) => sum + Number(goal.savedAmount), 0);
  const totalRemaining = totalTarget - totalSaved;

  return (
    <div className="overview">
      <h2>Overview</h2>
      <p><strong>Total Target:</strong> Ksh {totalTarget}</p>
      <p><strong>Total Saved:</strong> Ksh {totalSaved}</p>
      <p><strong>Remaining:</strong> Ksh {totalRemaining}</p>
    </div>
  );
}

export default Overview;
