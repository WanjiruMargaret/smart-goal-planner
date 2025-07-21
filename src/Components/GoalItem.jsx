import React from "react";

function GoalItem({ goal, onDelete }) {
  const percentage =
    goal.savedAmount && goal.targetAmount
      ? Math.min((goal.savedAmount / goal.targetAmount) * 100, 100)
      : 0;

  return (
    <div style={styles.card}>
      <h3>{goal.name}</h3>
      <p>Category: {goal.category}</p>
      <p>Target: Ksh {goal.targetAmount}</p>
      <p>Saved: Ksh {goal.savedAmount || 0}</p>
      <p>Deadline: {goal.deadline}</p>

      <div style={styles.progressBarBackground}>
        <div
          style={{
            ...styles.progressBarFill,
            width: `${percentage}%`,
          }}
        ></div>
      </div>

      <button onClick={() => onDelete(goal.id)} style={styles.deleteButton}>
        Delete
      </button>
    </div>
  );
}

const styles = {
  card: {
    background: "#f8f8f8",
    border: "1px solid #ddd",
    padding: "1rem",
    borderRadius: "10px",
    marginBottom: "1rem",
  },
  progressBarBackground: {
    height: "10px",
    background: "#e0e0e0",
    borderRadius: "5px",
    overflow: "hidden",
    margin: "8px 0",
  },
  progressBarFill: {
    height: "100%",
    background: "#4caf50",
    transition: "width 0.3s ease-in-out",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default GoalItem;

