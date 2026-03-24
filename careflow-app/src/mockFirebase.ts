// @ts-nocheck

// Mock Firebase Types
export class Timestamp {
  seconds: number;
  nanoseconds: number;
  constructor(seconds: number, nanoseconds: number) {
    this.seconds = seconds;
    this.nanoseconds = nanoseconds;
  }
  static now() {
    return new Timestamp(Date.now() / 1000, 0);
  }
  static fromDate(date: Date) {
    return new Timestamp(date.getTime() / 1000, 0);
  }
  toDate() {
    return new Date(this.seconds * 1000);
  }
}

export class DocumentReference<T = any> {
  id: string = "mock-id";
  path: string = "mock/path";
}

const mockFileData = {
  file_names: [],
  file_descriptions: [],
  file_urls: []
};

const mockIteration = {
  plan: { checklist: { checklist_items: [], checklist_done: [], checklist_members: [] }, files: mockFileData, notes: "" },
  do: { idea: "", results: "", files: mockFileData, notes: "" },
  study: { analysis: "", files: mockFileData, notes: "" },
  act: { choice: "", files: mockFileData, notes: "" }
};

const getMockData = (): any => ({
  id: "user123",
  hsaID: "user123",
  first_name: "Anna",
  sur_name: "Andersson",
  clinic: "Medicinkliniken",
  centrum: "Medicinskt Centrum",
  admin: true,
  email: "anna@example.com",
  phone_number: "070-1234567",
  place: "Västerås",
  profession: "Läkare",
  ideas: [],
  ideas_done: [],
  all_iterations: [mockIteration],
  active: true,
  description: "Mock Description",
  title: "Mock Title",
  phase: 2,
  tags: [],
  goals: [],
  measure: [],
  purpose: "",
  project_leader: "user123",
  project_members: [],
  checklist_plan: { checklist_item: [], checklist_items: [], checklist_done: [], checklist_members: [] },
  checklist_do: { checklist_item: [], checklist_items: [], checklist_done: [], checklist_members: [] },
  checklist_study: { checklist_item: [], checklist_items: [], checklist_done: [], checklist_members: [] },
  checklist_act: { checklist_item: [], checklist_items: [], checklist_done: [], checklist_members: [] }
});


// Global any for everything else to kill all TS errors
export const collection = (db: any, name: string): any => ({ name });
export const doc = (db: any, name: string, id?: string): any => ({ name, id });
export const query = (...args: any[]): any => ({});
export const where = (...args: any[]): any => ({});

export const getDocs = async (q: any): Promise<any> => {
  const mockDoc = {
    id: "mock-id",
    exists: () => true,
    data: getMockData
  };
  const docs = [mockDoc];
  return {
    docs,
    forEach: (cb: any) => docs.forEach(cb),
    [Symbol.iterator]: function* () { yield* docs; }
  };
};

export const getDoc = async (ref: any): Promise<any> => {
  return {
    exists: () => true,
    id: "mock-id",
    data: getMockData
  };
};

export const addDoc = async (col: any, data: any): Promise<any> => ({ id: "new-id" });
export const updateDoc = async (ref: any, data: any): Promise<any> => Promise.resolve();
export const deleteDoc = async (ref: any): Promise<any> => Promise.resolve();

export const db: any = { type: "firestore" };

export const fileStorage: any = {
  ref: (path: string) => ({
    put: () => Promise.resolve({}),
    getDownloadURL: () => Promise.resolve("mock-url")
  })
};

export const ref = (storage: any, path: string): any => ({ path });
export const getDownloadURL = async (ref: any): Promise<any> => "mock-url";
export const uploadBytesResumable = (storageRef: any, file: any): any => {
  return {
    on: (event: string, next: any, error: any, complete: any) => {
      if (next) next({ bytesTransferred: 100, totalBytes: 100 });
      if (complete) complete();
    },
    snapshot: { ref: { fullPath: "mock/path" } }
  };
};

export type DocumentData = any;
export type Query = any;
