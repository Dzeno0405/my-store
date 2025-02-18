import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome! You are logged in.</p>
      <button onClick={() => signOut(auth)}>Logout</button>
    </div>
  );
};

export default Dashboard;
