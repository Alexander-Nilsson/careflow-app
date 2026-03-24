
// Mock Firebase
export const db = {
  // Add minimal mock to avoid crashes if someone calls collection(db, ...)
  type: "firestore",
  toJSON: () => ({})
};

export const fileStorage = {
  ref: () => ({
    put: () => Promise.resolve({}),
    getDownloadURL: () => Promise.resolve("")
  })
};

// Also mock common firestore functions if they are imported from this file
// But they are usually imported from "../mockFirebase"
