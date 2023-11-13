import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
// import { ProjectCardProps } from "./components/ProjectCard";
import {Timestamp, DocumentReference, DocumentData} from "firebase/firestore";

// export interface Project {
//     title: string;
//     date_created: any;
//     place: string;
//     tags: string[];
//     phase: number;
//     displayPhaseImage?: boolean;
// }


export interface Project1 {
    id: string;
    title: string;
    description: string;
    phase: number;
    place: string;
    centrum: string;
    tags: Array<string>;
    date_created: Timestamp;
    project_leader: DocumentReference<DocumentData>;
    project_members: Array<string>;
    checklist_plan: {
      checklist_item: Array<string>;
      checklist_done: Array<boolean>;
      checklist_members: Array<string>;
    };
    checklist_do: {
      checklist_item: Array<string>;
      checklist_done: Array<boolean>;
      checklist_members: Array<string>;
    };
    checklist_study: {
      checklist_item: Array<string>;
      checklist_done: Array<boolean>;
      checklist_members: Array<string>;
    };
    checklist_act: {
      checklist_item: Array<string>;
      checklist_done: Array<boolean>;
      checklist_members: Array<string>;
    };
}

type Id = string | number;

export interface Project2 {
    id: Id;
    title: string;
    description: string;
    phase: Id;
    place: string;
    centrum: string;
    tags: Array<string>;
    date_created: Timestamp;
    project_leader: DocumentReference<DocumentData>;
    project_members: Array<string>;
    checklist_plan: {
      checklist_item: Array<string>;
      checklist_done: Array<boolean>;
      checklist_members: Array<string>;
    };
    checklist_do: {
      checklist_item: Array<string>;
      checklist_done: Array<boolean>;
      checklist_members: Array<string>;
    };
    checklist_study: {
      checklist_item: Array<string>;
      checklist_done: Array<boolean>;
      checklist_members: Array<string>;
    };
    checklist_act: {
      checklist_item: Array<string>;
      checklist_done: Array<boolean>;
      checklist_members: Array<string>;
    };
}

//fetch the users projects based on hsa-id and if closed or open projects should be fetched.
export async function getUserProjects(hsaID: string, closed: boolean) {
    const projectsCollectionRef = collection(db, "projects");
    const memberQuery = query(projectsCollectionRef, where("project_members", "array-contains", hsaID));
    const leaderQuery = query(projectsCollectionRef, where("project_leader", "==", hsaID));

    try {
        return Promise.all([getDocs(memberQuery), getDocs(leaderQuery)])
            .then(([memberSnapshot, leaderSnapshot]) => {
                const userProjects = [...memberSnapshot.docs, ...leaderSnapshot.docs]
                let projectsData: Project1[] = [];
                userProjects.forEach((doc) => {
                    let data = doc.data();
                    console.log(doc.id)
                    if ((closed && data.closed) || (!closed && !data.closed)) {
                        let project: Project1 = {
                            id: doc.id,
                            title: data.title,
                            description: data.description,
                            phase: data.phase,
                            place: data.place,
                            centrum: data.centrum,
                            tags: data.tags,
                            date_created: data.date_created,
                            project_leader: data.project_leader,
                            project_members: data.project_members,
                            checklist_plan: {
                                checklist_item: data.checklist_plan.checklist_item,
                                checklist_done: data.checklist_plan.checklist_done,
                                checklist_members: data.checklist_plan.checklist_members,
                            },
                            checklist_do: {
                                checklist_item: data.checklist_do.checklist_item,
                                checklist_done: data.checklist_do.checklist_done,
                                checklist_members: data.checklist_do.checklist_members,
                            },
                            checklist_study: {
                                checklist_item: data.checklist_study.checklist_item,
                                checklist_done: data.checklist_study.checklist_done,
                                checklist_members: data.checklist_study.checklist_members,
                            },
                            checklist_act: {
                                checklist_item: data.checklist_act.checklist_item,
                                checklist_done: data.checklist_act.checklist_done,
                                checklist_members: data.checklist_act.checklist_members,
                            },
                        };
                        projectsData.push(project)
                    }
                });
                console.log(projectsData)
                return (projectsData);
            })
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}


export async function getAllProjects(closed: boolean) {
    const projectsCollectionRef = collection(db, "projects");

    // const memberQuery = query(projectsCollectionRef, where("project_members", "array-contains", hsaID));
    // const leaderQuery = query(projectsCollectionRef, where("project_leader", "==", hsaID));

    const projectQuery = query(projectsCollectionRef);

    try {
        return Promise.all([getDocs(projectQuery)])
            .then(([memberSnapshot]) => {
                const projects = [...memberSnapshot.docs]
                let projectsData: Project2[] = [];
                projects.forEach((doc) => {
                    let data = doc.data();
                    console.log(doc.id)
                    // if ((closed && data.closed) || (!closed && !data.closed)) {
                        let project: Project2 = {
                            id: doc.id,
                            title: data.title,
                            description: data.description,
                            phase: data.phase,
                            place: data.place,
                            centrum: data.centrum,
                            tags: data.tags,
                            date_created: data.date_created,
                            project_leader: data.project_leader,
                            project_members: data.project_members,
                            checklist_plan: {
                                checklist_item: data.checklist_plan.checklist_item,
                                checklist_done: data.checklist_plan.checklist_done,
                                checklist_members: data.checklist_plan.checklist_members,
                            },
                            checklist_do: {
                                checklist_item: data.checklist_do.checklist_item,
                                checklist_done: data.checklist_do.checklist_done,
                                checklist_members: data.checklist_do.checklist_members,
                            },
                            checklist_study: {
                                checklist_item: data.checklist_study.checklist_item,
                                checklist_done: data.checklist_study.checklist_done,
                                checklist_members: data.checklist_study.checklist_members,
                            },
                            checklist_act: {
                                checklist_item: data.checklist_act.checklist_item,
                                checklist_done: data.checklist_act.checklist_done,
                                checklist_members: data.checklist_act.checklist_members,
                            },
                        };
                        projectsData.push(project)
                    // }
                });
                console.log(projectsData)
                return (projectsData);
            })
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}