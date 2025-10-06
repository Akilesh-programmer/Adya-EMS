import { useState, useEffect } from "react";
import {
  FiMenu,
  FiBell,
  FiSettings,
  FiGrid,
  FiPlus,
  FiLogIn,
  FiLayers,
  FiUsers,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { resetEventState } from "../redux/EventSlice";
import { CalendarDays } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const HeaderComponent = ({ showSidebar }) => {
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Header component mounted.");
    const token = localStorage.getItem("token");
    const userDept = localStorage.getItem("user_dept");
    
    console.log("HeaderComponent - Token:", token ? 'Present' : 'Missing');
    console.log("HeaderComponent - userDept:", userDept);
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken);
        setUserName(decodedToken.name || "");
        
        // Store department if not already stored
        if (!userDept && decodedToken.dept) {
          localStorage.setItem("user_dept", decodedToken.dept);
        }
        
        console.log("HeaderComponent - Authentication successful, userName:", decodedToken.name);
      } catch (error) {
        console.error("Error decoding token:", error);
        // Clear invalid token
        localStorage.removeItem("token");
        navigate("/");
      }
    } else {
      // Redirect to login if no token
      navigate("/");
    }
  }, [navigate]);

  function initializeLocalStorage() {
    if (!localStorage.getItem("basicEvent")) {
      localStorage.setItem("basicEvent", JSON.stringify({}));
    }
    if (!localStorage.getItem("communicationForm")) {
      localStorage.setItem("communicationForm", JSON.stringify({}));
    }
    if (!localStorage.getItem("transportForm")) {
      localStorage.setItem("transportForm", JSON.stringify([]));
    }
    if (!localStorage.getItem("iqacno")) {
      localStorage.setItem("iqacno", "");
    }

    if (!localStorage.getItem("amenityForm")) {
      localStorage.setItem("amenityForm", JSON.stringify({}));
    }

    if (!localStorage.getItem("guestRoomForm")) {
      localStorage.setItem("guestRoomForm", JSON.stringify({}));
    }

    console.log("Local storage initialized with default forms.");
  }

  function clearLocalStorage() {
    dispatch(resetEventState());
    localStorage.removeItem("basicEvent");
    localStorage.removeItem("communicationForm");
    localStorage.removeItem("transportForm");
    localStorage.removeItem("iqacno");
    localStorage.removeItem("amenityForm");
    localStorage.removeItem("guestRoomForm");
  }

  return (
    <div className="flex bg-[#ffffff]">
      {showSidebar && (
        <div className="fixed left-0 top-0 h-full w-20 bg-[#ffffff] shadow-lg">
          <div className="p-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <FiGrid
                onClick={() => navigate("/dashboard")}
                className="text-white text-xl cursor-pointer"
                title="Dashboard"
              />
            </div>
          </div>
          <div className="mt-8">
            <div
              className="w-full h-10 bg-blue-50 border-blue-500 flex items-center justify-center"
              title="Active Dashboard"
            >
              <FiGrid
                onClick={() => navigate("/dashboard")}
                className="text-blue-500 text-xl cursor-pointer"
              />
            </div>
            <div className="w-full h-10 flex items-center justify-center mt-4">
              <FiPlus
                onClick={() => {
                  clearLocalStorage();
                  initializeLocalStorage();
                  navigate("/forms");
                }}
                className="text-gray-500 text-xl cursor-pointer"
                title="Add New"
              />
            </div>
            <div className="w-full h-10 flex items-center justify-center mt-4">
              <CalendarDays
                onClick={() => navigate("/calender")}
                className="text-gray-500 text-xl cursor-pointer"
                title="Information"
              />
            </div>
            <div className="w-full h-10 flex items-center justify-center mt-4">
              <FiLayers
                onClick={() => navigate("/pending")}
                className="text-gray-500 text-xl cursor-pointer"
                title="Layers"
              />
            </div>
            <div className="w-full h-10 flex items-center justify-center mt-4">
              <FiUsers
                onClick={() => navigate("/profile")}
                className="text-gray-500 text-xl cursor-pointer"
                title="Users"
              />
            </div>
            <div className="w-full h-10 flex items-center justify-center mt-4">
              <FiLogIn
                onClick={() => navigate("/create-login")}
                className="text-gray-500 text-xl cursor-pointer"
                title="FiLogIn"
              />
            </div>
          </div>
          <div className="absolute bottom-4 left-0 w-full flex justify-center">
            <img
              src="https://sece.ac.in/wp-content/uploads/2024/05/clg-logo2-scaled.webp"
              alt="College Logo"
              className="w-32 h-16 object-contain"
              title="College Logo"
            />
          </div>
        </div>
      )}

      <div className={`${showSidebar ? 'ml-20' : ''} rounded-l-3xl w-full pl-6 pt-6`}>
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center">
            <FiMenu className="text-gray-400 mr-4 text-xl" title="Menu" />
            <div>
              <div className="flex items-center gap-2">
                <p className="text-gray-600 font-bold">
                  Good evening,
                  <span className="text-blue-500 font-bold"> {userName}</span>
                </p>
                <span className="bg-green-100 font-bold text-green-600 text-xs px-2 py-1 rounded">
                  You're better than this!
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FiBell className="text-gray-400 text-xl cursor-pointer" title="Notifications" />
            <FiSettings className="text-gray-400 text-xl cursor-pointer" title="Settings" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200" title="Avatar"></div>
              <span className="text-gray-600">Supervisor</span>
              <svg
                className="w-4 h-4 text-gray-400 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                title="Expand"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
