// components/AddGoalForm.jsx
import { useState } from "react";

export default function AddGoalForm({ onAddGoal }) {
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    savedAmount: "",
    category: "",
    deadline: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddGoal(formData);
    setFormData({
      name: "",
      targetAmount: "",
      savedAmount: "",
      category: "",
      deadline: "",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="add-goal-form">
      <input name="name" placeholder="Goal Name" value={formData.name} onChange={handleChange} required />
      <input name="targetAmount" type="number" placeholder="Target Amount" value={formData.targetAmount} onChange={handleChange} required />
      <input name="savedAmount" type="number" placeholder="Saved Amount" value={formData.savedAmount} onChange={handleChange} />
      <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
      <input name="deadline" type="date" placeholder="Deadline" value={formData.deadline} onChange={handleChange} required />
      <button type="submit">Add Goal</button>
    </form>
  );
}
