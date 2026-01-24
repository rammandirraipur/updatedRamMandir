import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // <-- Import Google icon
import "./Auth.css";

const Auth = () => {
  const navigate = useNavigate();

  const login = async () => {
    await signInWithPopup(auth, googleProvider);
    navigate("/");
  };

  return (
    <div className="auth-wrapper">
      <h2>Log in to donate and make a difference 🙏</h2>
      <button className="google-btn" onClick={login}>
        <FcGoogle size={24} style={{ marginRight: "8px" }} /> Sign in with Google
      </button>
    </div>
  );
};

export default Auth;
