import { useEffect } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { app, db, auth } from "../firebase"
import { useNavigate } from "react-router-dom";
// import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function Projects() {

    const navigate = useNavigate()
    const [user, loading, error] = useAuthState(auth);

    // example of how to fetch from the db.
    async function fetchProjects() {
        const q = query(collection(db, "projects")); //create a query

        const querySnapshot = await getDocs(q); //use the query to fetch the items

        querySnapshot.forEach((doc) => { //do something with the response
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    };

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (!user) navigate("/login");
        fetchProjects();

    }, [user, loading]);

    // useEffect(() => { //useEffect is a function which runs when the component is mounted
    //     const auth = getAuth(app)
    //     const user = auth.currentUser

    //     if (user) {
    //         fetchProjects();
    //     } else {
    //         navigate("/login")
    //     }
    // }, []);


    return (
        <>
            {loading ? (
                <p>Loading...</p> // Show a loading indicator
            ) : (
                <h1>Förändringsarbeten</h1>
            )}
        </>
    );
}

export default Projects