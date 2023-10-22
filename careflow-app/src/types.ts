import {Timestamp} from "firebase/firestore";
export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};

export type Project = {
  id: Id;
  title: String;
  description: String;
  phase: Id;
  place: String;
  centrum: String;
  tags: Array<string>;
  date_created: Timestamp;
};
