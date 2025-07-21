import React, { useState } from "react";

function DepositForm({ goal, onDeposit }) {
  const [amount, setAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Please enter a valid positive amount.");
      return;
    }

    const newSavedAmount = Number(goal.savedAmount) + numericAmount;

    fetch(`http://localhost:3000/goals/${goal.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ savedAmount: newSavedAmount }),
    })
      .then((res) => res.json())
      .then((updatedGoal) => {
        onDeposit(updatedGoal); // update parent state
        setAmount(""); // reset input
      });
  }

  return (
    <form onSubmit={handleSubmit} className="deposit-form">
      <label>
        Deposit to <strong>{goal.name}</strong>:
      </label>
      <div className="deposit-input-group">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          min="1"
          step="0.01"
          required
        />
        <button type="submit">Add Deposit</button>
      </div>
    </form>
  );
}

export default DepositForm;

