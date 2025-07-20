import React, { useState, useEffect } from "react";
import GoalForm from "./Components/GoalForm";
import GoalList from "./Components/GoalList";
import Overview from "./Components/Overview";
import DepositForm from "./Components/DepositForm";

function App() {
  const [goals, setGoals] = useState([]);

  // 🟢 Form state for GoalForm
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    category: "",
    deadline: "",
  });

  // 🟢 Fetch goals from db.json
  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((error) => console.error("Error fetching goals:", error));
  }, []);

  // 🟢 Handle input changes in the form
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // 🟢 Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    addGoal(formData);
    setFormData({
      name: "",
      targetAmount: "",
      category: "",
      deadline: "",
    }); // reset form
  }

  // 🟢 Add a new goal
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

  // 🟢 Update a goal
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

  // 🟢 Delete a goal
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

      <GoalForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

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
