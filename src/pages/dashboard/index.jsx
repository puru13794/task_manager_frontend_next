import { useAuth } from "../../../context/AuthContext";
import Tasks from "../../../components/tasks";
// import Router from "next/router";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getAuthToken, removeAuthToken } from "../../../utils/authUtils";
import { redirect } from "next/dist/server/api-utils";
import axios from "axios";

const dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    
    const fetchData = async () => {
      if (!auth.isAuthenticated) {
        router.push("/login");
        return;
      }

      const authToken = getAuthToken("auth_token");
      if (authToken) {
        try {
          const response = await axios.get(`http://localhost:3000/tasks`, {
            headers: {
              Authorization: authToken,
            },
          });

          if (response.status === 200) {
            console.log("data", response.data);
            setTasks(response.data);
          } else {
            removeAuthToken("auth_token");
            router.push("/login");
          }
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      }
    };
    fetchData();
  }, [auth, router]);
  return (
    <>
      <Tasks />
    </>
  );
};

export default dashboard;
