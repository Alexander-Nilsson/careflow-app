import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../firebase"; // Import Firebase configuration
import "./FetchUserData.css";

function FetchUserData() {
  const [user, setUser] = useState({
    admin: false,
    centrum: "",
    clinic: "",
    email: "",
    first_name: "",
    phone_number: "",
    place: "",
    profession: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    /* //Ensure that the user is authenticated
    const userAuth = auth.currentUser;
    */

    const collectionRef = collection(db, "users");
    const userQuery = query(
      collectionRef
      //where("email", "==", userAuth.email)    //matches the loaded user data to the logged in user
    );

    const getUserData = async () => {
      try {
        const data = await getDocs(userQuery);
        if (data.docs.length === 1) {
          const userData = data.docs[0].data() as {
            admin: boolean;
            centrum: string;
            clinic: string;
            email: string;
            first_name: string;
            phone_number: string;
            place: string;
            profession: string;
          };
          setUser(userData);
          setLoading(false);
        } else {
          setError(
            new Error("User not found or multiple users with the same email.")
          );
          setLoading(false);
        }
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="UserData">
      <h1>User Data</h1>
      <p>Admin: {user.admin ? "true" : "false"}</p>
      <p>Centrum: {user.centrum}</p>
      <p>Clinic: {user.clinic}</p>
      <p>Email: {user.email}</p>
      <p>First Name: {user.first_name}</p>
      <p>Phone Number: {user.phone_number}</p>
      <p>Place: {user.place}</p>
      <p>Profession: {user.profession}</p>
    </div>
  );
}

export default FetchUserData;
