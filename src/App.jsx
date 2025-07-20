import React, { useState, useEffect } from "react";
import GoalList from "./Components/GoalList";
import Overview from "./Components/Overview";
import DepositForm from "./Components/DepositForm";

function App() {
  const [goals, setGoals] = useState([]);

  // Fetch goals from db.json on mount
  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((error) => console.error("Error fetching goals:", error));
  }, []);

  // Add a new goal
  function addGoal(newGoal) {
    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGoal),
    })
      .then((res) => res.json())
      .then((data) => setGoals([...goals, data]));
  }

  // Update a goal (PATCH)
  function updateGoal(updatedGoal) {
    fetch(`http://localhost:3000/goals/${updatedGoal.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedGoal),
    })
      .then((res) => res.json())
      .then((data) =>
        setGoals((prevGoals) =>
          prevGoals.map((goal) => (goal.id === data.id ? data : goal))
        )
      );
  }

  // Delete a goal
  function deleteGoal(goalId) {
    fetch(`http://localhost:3000/goals/${goalId}`, {
      method: "DELETE",
    }).then(() =>
      setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId))
    );
  }

  return (
    <div className="App">
      <h1>SMART GOAL PLANNER</h1>

      <GoalForm onAddGoal={addGoal} />

      <Overview goals={goals} />

      <h2>Deposit to Your Goals</h2>
      {goals.map((goal) => (
        <DepositForm
          key={goal.id}
          goal={goal}
          onDeposit={(updatedGoal) =>
            setGoals((prev) =>
              prev.map((g) => (g.id === updatedGoal.id ? updatedGoal : g))
            )
          }
        />
      ))}

      <h2>Your Goals</h2>
      <GoalList
        goals={goals}
        onDeleteGoal={deleteGoal}
        onUpdateGoal={updateGoal}
      />
    </div>
  );
}

export default App;
