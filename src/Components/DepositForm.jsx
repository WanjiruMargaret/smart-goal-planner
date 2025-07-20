import React, { useState } from "react";

function DepositForm({ goal, onDeposit }) {
  const [amount, setAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newSavedAmount = Number(goal.savedAmount) + Number(amount);

    fetch(`http://localhost:3000/goals/${goal.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ savedAmount: newSavedAmount }),
    })
      .then((res) => res.json())
      .then((updatedGoal) => {
        onDeposit(updatedGoal); // let parent update the state
        setAmount("");
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Deposit to {goal.name}:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <button type="submit">Add Deposit</button>
    </form>
  );
}

export default DepositForm;
