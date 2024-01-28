import { useAuth } from "../../../context/AuthContext";
import Tasks from "../../../components/tasks";
// import Router from "next/router";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getAuthToken, removeAuthToken } from "../../../utils/authUtils";
import NavHoc from "../../../components/navhoc";
import axios from "axios";

const dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const authToken = getAuthToken("auth_token");
      //   console.log("authToken", authToken);
      if (authToken) {
        // console.log("customKey", process.env.customKey);
        try {
          const response = await axios.get(`${process.env.base_url}/tasks`, {
            headers: {
              Authorization: authToken,
            },
          });

          if (response.status == 200) {
            console.log("data", response.data);
            setTasks(response.data.data);
          } else {
            removeAuthToken("auth_token");
            router.push("/login");
          }
        } catch (error) {
            if (error.status != 200) {
              removeAuthToken("auth_token");
              router.push("/login");
            }
          console.error("Error fetching tasks:", error);
        }
      } else {
        router.push("/login");
      }
    };
    fetchData();
  }, [router]);
  return (
    <>
      <NavHoc>
        <Tasks tasks={tasks} />
      </NavHoc>
    </>
  );
};

export default dashboard;
