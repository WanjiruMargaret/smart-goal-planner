import React from "react";

function GoalItem({ goal }) {
  return (
    <li>
      <strong>{goal.name}</strong> - Ksh {goal.targetAmount} (
      {goal.category}) by {goal.deadline}
    </li>
  );
}

export default GoalItem;
