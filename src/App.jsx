import React, { useState, useEffect } from "react";
import GoalForm from "./Components/GoalForm";
import "./App.css"; 
import DepositForm from "./Components/DepositForm";
import Overview from "./Components/Overview";



function App() {
  const [goals, setGoals] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    category: "",
    deadline: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newGoal = {
      ...formData,
      targetAmount: parseFloat(formData.targetAmount),
      savedAmount: 0, // default for new goals
    };

    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGoal),
    })
      .then((res) => res.json())
      .then((data) => {
        setGoals([...goals, data]);
        setFormData({
          name: "",
          targetAmount: "",
          category: "",
          deadline: "",
        });
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/goals/${id}`, {
      method: "DELETE",
    }).then(() => {
      setGoals(goals.filter((goal) => goal.id !== id));
    });
  };
  
  const handleDepositUpdate = (updatedGoal) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === updatedGoal.id ? updatedGoal : goal
    );
    setGoals(updatedGoals);
  };

  return (
    <div className="app-container">
      <h1>🎯 Smart Goal Planner</h1>
      <Overview goals={goals} />
      <GoalForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <div className="goal-list">
        {goals.map((goal) => {
          const percentage =
            goal.targetAmount > 0
              ? ((goal.savedAmount || 0) / goal.targetAmount) * 100
              : 0;

          return (
            <div key={goal.id} className="goal-card">
              <h3>{goal.name}</h3>
              <p>Category: {goal.category || "N/A"}</p>
              <p>Deadline: {goal.deadline}</p>
              <p>Target: KES {goal.targetAmount}</p>
              <p>Saved: KES {goal.savedAmount || 0}</p>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              <DepositForm goal={goal} onDeposit={handleDepositUpdate} />
              <button onClick={() => handleDelete(goal.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
