import {Timestamp, DocumentReference, DocumentData} from "firebase/firestore";
export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
  columnDescription: string;
};

export type Project = {
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
  };
  checklist_do: {
    checklist_item: Array<string>;
    checklist_done: Array<boolean>;
  };
  checklist_study: {
    checklist_item: Array<string>;
    checklist_done: Array<boolean>;
  };
  checklist_act: {
    checklist_item: Array<string>;
    checklist_done: Array<boolean>;
  };
};
