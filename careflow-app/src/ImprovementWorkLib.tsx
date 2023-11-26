import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  deleteDoc,
  Query,
} from "firebase/firestore";
import { db } from "./firebase";
import { Timestamp, DocumentReference, DocumentData } from "firebase/firestore";
import { UserInfoType } from "./components/Start";
import { Tag, User } from "./components/CreateNewProject";

export type Id = string | number;

export interface FilterState {
  includeUser: boolean;
  includeClinic: boolean;
  tagFilter: string;
  closed: boolean;
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
  selected_idea: string;
  act: {
    choice: string;
    files: {
      file_descriptions: Array<string>;
      file_names: Array<string>;
      file_urls : Array<string>;
    };
    notes: string;
  };
  do: {
    files: {
      file_descriptions: Array<string>;
      file_names: Array<string>;
      file_urls : Array<string>;
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
      file_urls : Array<string>;
    };
    notes: string;
  };
  study: {
    analysis: string;
    files: {
      file_descriptions: Array<string>;
      file_names: Array<string>;
      file_urls : Array<string>;
    };
    notes: string;
  };
}

export interface ImprovementWork {
  id: Id;
  all_iterations: Array<Iteration>;
  centrum: string;
  clinic: string;
  closed: boolean;
  date_created: Timestamp;
  date_last_updated: Timestamp;
  goals: Array<string>;
  ideas: Array<string>;
  ideas_done: Array<boolean>;
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
    ideas_done: data.ideas_done,
    measure: data.measure,
    phase: data.phase,
    place: data.place,
    project_leader: data.project_leader,
    project_members: data.project_members,
    purpose: data.purpose,
    tags: data.tags,
    title: data.title,
    total_iterations: data.total_iterations,
  };
  return improvementWork;
}

export async function getAllImprovementWorks() {
  const improvementWorksCollectionRef = collection(db, "improvementWorks");

  const improvementWorksQuery = query(improvementWorksCollectionRef);
  let improvementWorksData: ImprovementWork[] = [];
  try {
    return Promise.all([getDocs(improvementWorksQuery)]).then(([snapshot]) => {
      const improvementWorks = [...snapshot.docs];

      improvementWorks.forEach((doc) => {
        let data = doc.data();
        let improvementWork: ImprovementWork = setImprovementWork(doc.id, data);
        improvementWorksData.push(improvementWork);
        // }
      });
      return sortByDateCreated(improvementWorksData);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return improvementWorksData;
  }
}

export async function getAllTags() {
  const tagsRef = collection(db, "tags");
  const tagsQuery = query(tagsRef);

  var tags: string[] = [];
  try {
    return Promise.all([getDocs(tagsQuery)]).then(([snapshot]) => {
      const fetchedTags = [...snapshot.docs];
      fetchedTags.forEach((doc) => {
        let tag = doc.data().description;
        tags.push(tag);
        // }
      });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return tags
}

export function sortByDateCreated<T extends { date_created: Timestamp }>(
  data: T[]
): T[] {
  return data.sort((a, b) => a.date_created.seconds - b.date_created.seconds);
}

export function sortByOldestDate<T extends { date_created: Timestamp }>(
  data: T[]
): T[] {
  return data.sort((a, b) => b.date_created.seconds - a.date_created.seconds);
}

export function sortByTitleAscending<T extends { title: string }>(
  data: T[]
): T[] {
  return data.sort((a, b) =>
    a.title.localeCompare(b.title, "sv", { sensitivity: "base" })
  );
}

export function sortByTitleDescending<T extends { title: string }>(
  data: T[]
): T[] {
  return data.sort((a, b) =>
    b.title.localeCompare(a.title, "sv", { sensitivity: "base" })
  );
}
export function findTagOptions(orgImprovementWorks: ImprovementWork[]) {
  let tagOptions: string[] = [];
  orgImprovementWorks.forEach((improvementWork) => {
    improvementWork.tags.forEach((tags) => {
      if (!tagOptions.includes(tags)) {
        tagOptions.push(tags);
      }
    });
  });
  return tagOptions;
}

// denna sköter hela filtreringen. Man går igenom alla projekt och kollar vilka som ska
// filtreras bort genom att anropa include
export function filterImprovementWorks(
  orgImprovementWorks: ImprovementWork[],
  filter: FilterState,
  userInfo: UserInfoType
) {
  let filteredImprovementWorks: ImprovementWork[] = [];
  orgImprovementWorks.forEach((improvementWork) => {
    // console.log(improvementWork)
    if (include(improvementWork, filter, userInfo)) {
      filteredImprovementWorks.push(improvementWork);
    }
  });
  return sortByOldestDate(filteredImprovementWorks);
}

function include(
  improvementWork: ImprovementWork,
  filter: FilterState,
  userInfo: UserInfoType
) {
  // if we are searching for closed ImpWorks and the focal ImpWork is open
  // OR if we are searching for open ImpWorks and the focal ImpWork is closed,
  // don't include it.
  if (
    (filter.closed && !improvementWork.closed) ||
    (!filter.closed && improvementWork.closed)
  ) {
    return false;
  }

  // if we are filtering users ImpWorks and the user neither a member nor a leader,
  // don't include it
  if (
    filter.includeUser &&
    !(
      improvementWork.project_leader == userInfo.hsaID ||
      improvementWork.project_members.includes(userInfo.hsaID)
    )
  ) {
    return false;
    // if we are filtering on the user's clinic and the focal ImpWork is not in the user's clinic,
    // don't include it
  }

  if (filter.includeClinic && improvementWork.clinic != userInfo.clinic) {
    return false;
  }

  // if we are filtering on specific tags, if filtering on specific tags, check if
  // focal ImpWork has the tag. If not, don't include it.
  if (filter.tagFilter !== "all_tags") {
    if (!improvementWork.tags.includes(filter.tagFilter)) {
      return false;
    }
  }

  return true;
}

export async function getMemberName(hsaId: string) {
  const docRef = doc(db, "users", hsaId);
  console.log("hämtar namn")
  try {
    return Promise.all([getDoc(docRef)]).then(([userSnapshot]) => {
      if (userSnapshot && userSnapshot.exists()) {
        let userData: string =
          userSnapshot.data().first_name + " " + userSnapshot.data().sur_name;
        // console.log(userData)
        return userData;
      } else {
        console.error("Document not found");
        return "";
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return "";
  }
}

export async function getMemberNames(hsaIds: string[]) {
  const fetchedMembers: string[] = [];
  console.log("hämtar namn")
  // Use map to create an array of promises
  const promises = hsaIds.map(async (hsaId) => {
    const memberRef = doc(db, "users", hsaId);
    const memberSnap = await getDoc(memberRef);

    if (memberSnap.exists()) {
      const member = memberSnap.data().first_name + " " + memberSnap.data().sur_name;
      fetchedMembers.push(member);
    } else {
      console.log("No such document!");
    }
  });

  // Use Promise.all to wait for all promises to resolve
  await Promise.all(promises);

  return fetchedMembers;
}

export async function deleteProject(id: string) {
  const Doc = doc(db, "improvementWorks", id);

  await deleteDoc(Doc);
  //console.log("deleting");
}


export async function getImprovementWork(ref: DocumentReference) {
  const doc = await getDoc(ref);
  // console.log("hämtat: " + doc.data())
  return doc
}

export async function getUsers() {
  const q = query(collection(db, "users"));
  const doc = await getDocs(q);
  // console.log("hämtat: " + doc.docs)
  return doc
}

export async function getUser(ref: DocumentReference<User>) {
  const doc = await getDoc(ref);
  // console.log("hämtat: " + doc.data())
  return doc
}

export async function getUser2(ref: DocumentReference) {
  const user = await getDoc(ref);
  // console.log("hämtat: " + user.data())
  return user
}

export async function getTags() {
  const q = query(collection(db, "tags"));
  const doc = await getDocs(q);
  // console.log("hämtat: " + doc)
  return doc
}

export async function getTag(ref: DocumentReference<Tag>) {
  const doc = await getDoc(ref);
  // console.log("hämtat: " + doc.data())
  return doc
}

export async function getGoals(q: Query) {
  const doc = await getDocs(q);
  // console.log("hämtat: " + doc)
  return doc
}