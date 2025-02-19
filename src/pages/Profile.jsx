import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../style/Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    dob: "",
    country: "",
    city: "",
    phone: "",
    avatar: "", // Added avatar field
  });
  const [loading, setLoading] = useState(true);
  const [avatarUploaded, setAvatarUploaded] = useState(false); // State to track avatar upload status
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login");
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData(data);
        setAvatarUploaded(!!data.avatar); // Set avatarUploaded based on whether an avatar exists
      } else {
        console.log("No user data found");
      }
      setLoading(false);
    };

    fetchUserData();
  }, [navigate]);

  const handleUpdate = async () => {
    const user = auth.currentUser;
    if (user) {
      await updateDoc(doc(db, "users", user.uid), userData);
      alert("Profile updated!");
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, avatar: reader.result }); // Save the base64 image
        setAvatarUploaded(true); // Set avatarUploaded to true
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeAvatar = () => {
    setAvatarUploaded(false); // Reset avatarUploaded to allow new upload
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>

      {/* Avatar upload section */}
      <div className="avatar-upload">
        <img
          src={userData.avatar || "default-avatar.png"} // Display default image if no avatar is set
          alt="Avatar"
          className="avatar"
        />
        {!avatarUploaded ? (
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        ) : (
          <button className="change-avatar-button" onClick={handleChangeAvatar}>
            Change Avatar
          </button>
        )}
      </div>

      <input
        type="text"
        value={userData.username}
        placeholder="Username"
        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
      />
      <input type="email" value={userData.email} placeholder="Email" disabled />
      <input
        type="date"
        value={userData.dob}
        onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
      />
      <input
        type="text"
        value={userData.country}
        placeholder="Country"
        onChange={(e) => setUserData({ ...userData, country: e.target.value })}
      />
      <input
        type="text"
        value={userData.city}
        placeholder="City"
        onChange={(e) => setUserData({ ...userData, city: e.target.value })}
      />
      <input
        type="text"
        value={userData.phone}
        placeholder="Phone Number"
        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
      />
      <div className="bottom-buttons">
      <button className="update-profile-button" onClick={handleUpdate}>Update Profile</button>
      <button className="back-home-button" onClick={() => navigate("/")}>
        Back Home
      </button></div>
    </div>
  );
};

export default Profile;
