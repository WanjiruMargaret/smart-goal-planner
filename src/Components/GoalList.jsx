import React from "react";
import GoalItem from "./GoalItem";

function GoalList({ goals }) {
  return (
    <ul>
      {goals.map((goal) => (
        <GoalItem key={goal.id} goal={goal} />
      ))}
    </ul>
  );
}

export default GoalList;
