import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { Timestamp, DocumentReference, DocumentData } from "firebase/firestore";

export type Id = string | number;

export interface User {
  first_name: string;
  sur_name: string;
}

export interface Project {
  id: Id;
  title: string;
  description: string;
  phase: Id;
  place: string;
  centrum: string;
  tags: Array<string>;
  date_created: Timestamp;
  result_measurements: string;
  result_analysis: string;
  notes_plan: string;
  notes_do: string;
  notes_study: string;
  notes_act: string;
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

export interface Iteration {
  act: {
    choice: string;
    files: {
      file_descriptions: Array<string>;
      file_names: Array<string>;
    };
    notes: string;
  };
  do: {
    files: {
      file_descriptions: Array<string>;
      file_names: Array<string>;
    };
    idea: string;
    notes: string;
    results: string;
  };
  plan: {
    checklist: {
      checklist_done: Array<boolean>;
      checklist_items: Array<string>;
      checklist_members: Array<string>;
    };
    files: {
      file_descriptions: Array<string>;
      file_names: Array<string>;
    };
    notes: string;
  };
  study: {
    analysis: string;
    files: {
      file_descriptions: Array<string>;
      file_names: Array<string>;
    };
    notes: string;
  };
}

export interface ImprovementWork {
  id: Id;
  all_iterations: {
    iteration1: Iteration;
  };
  centrum: string;
  clinic: string;
  closed: boolean;
  date_created: Timestamp;
  date_last_updated: Timestamp;
  goals: Array<string>;
  ideas: Array<string>;
  measure: Array<string>;
  purpose: string;
  phase: Id;
  place: string;
  project_leader: string;
  project_members: Array<string>;
  tags: Array<string>;
  title: string;
  total_iterations: number;
}

function setProject(id: string, data: DocumentData) {
  let project: Project = {
    id: id,
    title: data.title,
    description: data.description,
    phase: data.phase,
    place: data.place,
    centrum: data.centrum,
    tags: data.tags,
    date_created: data.date_created,
    result_measurements: data.result_measurements,
    result_analysis: data.result_analysis,
    notes_plan: data.notes_plan,
    notes_do: data.notes_do,
    notes_study: data.notes_study,
    notes_act: data.notes_act,
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
  return project;
}

function setImprovementWork(id: string, data: DocumentData) {
  let improvementWork: ImprovementWork = {
    id: id,
    all_iterations: data.all_iterations,
    centrum: data.centrum,
    clinic: data.clinic,
    closed: data.closed,
    date_created: data.date_created,
    date_last_updated: data.date_last_updated,
    goals: data.goals,
    ideas: data.ideas,
    measure: data.measure,
    purpose: data.purpose,
    phase: data.phase,
    place: data.place,
    project_leader: data.project_leader,
    project_members: data.project_members,
    tags: data.tags,
    title: data.title,
    total_iterations: data.total_iterations,
  };
  return improvementWork;
}

//fetch the users projects based on hsa-id and if closed or open projects should be fetched.
export async function getUserProjects(hsaID: string, closed: boolean) {
  const projectsCollectionRef = collection(db, "projects");
  const memberQuery = query(
    projectsCollectionRef,
    where("project_members", "array-contains", hsaID)
  );
  const leaderQuery = query(
    projectsCollectionRef,
    where("project_leader", "==", hsaID)
  );

  try {
    return Promise.all([getDocs(memberQuery), getDocs(leaderQuery)]).then(
      ([memberSnapshot, leaderSnapshot]) => {
        const userProjects = [...memberSnapshot.docs, ...leaderSnapshot.docs];
        let projectsData: Project[] = [];
        userProjects.forEach((doc) => {
          let data = doc.data();
          if ((closed && data.closed) || (!closed && !data.closed)) {
            let project: Project = setProject(doc.id, data);
            projectsData.push(project);
          }
        });
        return projectsData;
      }
    );
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
    return Promise.all([getDocs(projectQuery)]).then(([memberSnapshot]) => {
      const projects = [...memberSnapshot.docs];
      let projectsData: Project[] = [];
      projects.forEach((doc) => {
        let data = doc.data();
        let project: Project = setProject(doc.id, data);
        projectsData.push(project);
        // }
      });
      return projectsData;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function getAllImprovementWorks() {
  const improvementWorksCollectionRef = collection(db, "improvementWorks");

  // const memberQuery = query(projectsCollectionRef, where("project_members", "array-contains", hsaID));
  // const leaderQuery = query(projectsCollectionRef, where("project_leader", "==", hsaID));

  const improvementWorksQuery = query(improvementWorksCollectionRef);

  try {
    return Promise.all([getDocs(improvementWorksQuery)]).then(([snapshot]) => {
      const improvementWorks = [...snapshot.docs];
      let improvementWorksData: ImprovementWork[] = [];
      improvementWorks.forEach((doc) => {
        let data = doc.data();
        let improvementWork: ImprovementWork = setImprovementWork(doc.id, data);
        improvementWorksData.push(improvementWork);
        // }
      });
      return improvementWorksData;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function getUserImprovementWorks(hsaID: string) {
  const improvementWorksCollectionRef = collection(db, "improvementWorks");
  const memberQuery = query(
    improvementWorksCollectionRef,
    where("project_members", "array-contains", hsaID)
  );
  const leaderQuery = query(
    improvementWorksCollectionRef,
    where("project_leader", "==", hsaID)
  );

  try {
    return Promise.all([getDocs(memberQuery), getDocs(leaderQuery)]).then(
      ([memberSnapshot, leaderSnapshot]) => {
        const userImprovementWorks = [
          ...memberSnapshot.docs,
          ...leaderSnapshot.docs,
        ];
        let improvementWorksData: ImprovementWork[] = [];
        userImprovementWorks.forEach((doc) => {
          let data = doc.data();
          let improvementWork: ImprovementWork = setImprovementWork(
            doc.id,
            data
          );
          improvementWorksData.push(improvementWork);
        });
        return improvementWorksData;
      }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function filterImprovementWorks(
  filter: string,
  filterValue: string,
  closed: boolean
) {
  const improvementWorksCollectionRef = collection(db, "improvementWorks");
  const clinicQuery = query(
    improvementWorksCollectionRef,
    where(filter, "==", filterValue)
  );
  try {
    return Promise.all([getDocs(clinicQuery)]).then(([clinicSnapshot]) => {
      const userImprovementWorks = [...clinicSnapshot.docs];
      let improvementWorksData: ImprovementWork[] = [];
      userImprovementWorks.forEach((doc) => {
        let data = doc.data();
        if ((closed && data.closed) || (!closed && !data.closed)) {
          let improvementWork: ImprovementWork = setImprovementWork(
            doc.id,
            data
          );
          improvementWorksData.push(improvementWork);
        }
      });
      return improvementWorksData;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export function findUserImprovementWorks(
  hsa: string,
  orgImprovementWorks: ImprovementWork[] | null,
  closed: boolean
) {
  let newImprovementWorks: ImprovementWork[] = [];
  if (orgImprovementWorks) {
    orgImprovementWorks.forEach((improvementWork) => {
      if (
        (improvementWork.closed && closed) ||
        (!improvementWork.closed && !closed)
      ) {
        if (improvementWork.project_leader === hsa) {
          newImprovementWorks.push(improvementWork);
        } else if (improvementWork.project_members.includes(hsa)) {
          newImprovementWorks.push(improvementWork);
        }
      }
    });
    return newImprovementWorks;
  } else {
    return newImprovementWorks;
  }
}

export async function getMemberName(hsaId: string) {
  const docRef = doc(db, "users", hsaId);

  try {
    return Promise.all([getDoc(docRef)]).then(([userSnapshot]) => {
      if (userSnapshot && userSnapshot.exists()) {
        let userData: string =
          userSnapshot.data().first_name + " " + userSnapshot.data().sur_name;
        return userData;
      } else {
        console.error("Document not found");
        return null;
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }

  //if (docSnap.exists()) {
  //  return docSnap.data().first_name;
  //} else {
  //  console.log("No such document!");
  //}
}
