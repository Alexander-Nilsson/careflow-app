import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateProjectButton from "./CreateProjectButton";
import CreateProjectModal from "./CreateProjectModal";
import ContinueButton from "./ContinueButton";
import { Id } from "../types";
import {
  doc,
  setDoc,
  getDocs,
  getDoc,
  collection,
  Timestamp,
  query,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase";

var users: any[] = [];

async function fetchUsers() {
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);
  const ids = querySnapshot.docs.map((doc) => doc.id);

  ids.map(async (id) => {
    const projectReference = doc(db, "users", id).withConverter(
      memberConverter
    );
    const snapshot = await getDoc(projectReference);
    const userData = snapshot.data() as User;

    if (!users.includes(userData.sur_name)) {
      users.push(userData.sur_name);
    }
  });
}

class User {
  id: Id;
  admin: boolean;
  centrum: string;
  clinic: string;
  email: string;
  first_name: string;
  sur_name: string;
  phone_number: string;
  place: string;
  profession: string;
  projects: Array<string>;

  constructor(
    id: Id,
    admin: boolean,
    centrum: string,
    clinic: string,
    email: string,
    first_name: string,
    sur_name: string,
    phone_number: string,
    place: string,
    profession: string,
    projects: Array<string>
  ) {
    this.id = id;
    this.admin = admin;
    this.centrum = centrum;
    this.clinic = clinic;
    this.email = email;
    this.first_name = first_name;
    this.sur_name = sur_name;
    this.phone_number = phone_number;
    this.place = place;
    this.profession = profession;
    this.projects = projects;
  }
}

class Tag {
  id: Id;
  description: string;
  constructor(id: Id, description: string) {
    this.id = id;
    this.description = description;
  }
}

const memberConverter = {
  toFirestore: (memberData: any) => ({
    id: memberData.id,
    admin: memberData.admin,
    centrum: memberData.centrum,
    clinic: memberData.clinic,
    email: memberData.email,
    first_name: memberData.first_name,
    sur_name: memberData.sur_name,
    phone_number: memberData.phone_number,
    place: memberData.place,
    profession: memberData.profession,
    projects: memberData.projects,
  }),
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);

    return new User(
      snapshot.id,
      data.admin,
      data.centrum,
      data.clinic,
      data.email,
      data.first_name,
      data.sur_name,
      data.phone_number,
      data.place,
      data.profession,
      data.projects
    );
  },
};

const tagConverter = {
  toFirestore: (tagData: any) => ({
    description: tagData.description,
  }),
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);

    return new Tag(snapshot.id, data.description);
  },
};

var tags: any[] = [];

async function fetchTags() {
  const q = query(collection(db, "tags"));
  const querySnapshot = await getDocs(q);
  const ids = querySnapshot.docs.map((doc) => doc.id);

  ids.map(async (id) => {
    const tagReference = doc(db, "tags", id).withConverter(tagConverter);
    const snapshot = await getDoc(tagReference);
    const tagData = snapshot.data() as Tag;

    if (!tags.includes(tagData.description)) {
      tags.push(tagData.description);
    }
  });

  //tags.length = 0;
  //return tags;
}

function CreateNewProject() {
  const [show, setShow] = useState(false);

  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);

  fetchUsers();
  fetchTags();
  console.log("users: ", users);

  return (
    <div>
      <CreateProjectButton onClick={modalShow} />
      {/* <ContinueButton onClick={modalShow} /> */}
      <CreateProjectModal
        show={show}
        onHide={modalClose}
        users={users}
        tags={tags}
      />
    </div>
  );
}

export default CreateNewProject;
