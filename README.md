🧠 Smart Goal Planner 💰
A simple React app to help users create, track, and deposit into savings goals — all managed locally using json-server.

🚀 Features
✅ Add and view savings goals

📈 Track total saved, target amounts, and remaining balance

💸 Deposit money into goals (with real-time updates)

📊 Overview of all your financial goals

🌈 Clean UI and responsive layout

🛠️ Tech Stack
React – Frontend framework

JSON Server – Local backend for simulating API

CSS / Tailwind – Styling (based on your setup)

Fetch API – For async communication with the backend

📦 Installation & Setup
1. Clone the repo
bash
Copy
Edit
git clone https://github.com/your-username/smart-goal-planner.git
cd smart-goal-planner
2. Install dependencies
bash
Copy
Edit
npm install
3. Start the local API
Make sure json-server is installed globally:

bash
Copy
Edit
npm install -g json-server
Then run:

bash
Copy
Edit
json-server --watch db.json --port 3000
4. Start the React app
bash
Copy
Edit
npm run dev
Open your browser at: http://localhost:5173

📁 Folder Structure
bash
Copy
Edit
/components
  ├── GoalForm.jsx
  ├── GoalList.jsx
  ├── GoalItem.jsx
  ├── DepositForm.jsx
  ├── Overview.jsx
App.jsx
main.jsx
db.json
🔮 Future Enhancements
 Edit and delete goals

 User authentication

 Cloud sync and analytics

 Visual progress bars

 Better mobile layout

👩🏽‍💻 Author
Maggie – Game Logic Dev, React Dev, and UI Enthusiast
💬 “Plan smart. Save smarter.”