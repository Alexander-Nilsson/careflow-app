import React, { useRef, FormEvent } from "react";
import { firestore } from '../firebase';
import { addDoc, collection } from '@firebase/firestore';

export default function Home() {
  const messageRef = useRef<HTMLInputElement | null>(null);
  const ref = collection(firestore, "messages");

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    // Check if messageRef.current is not null before accessing its value
    if (messageRef.current) {
      const messageValue = messageRef.current.value;
      const data = {
        message: messageValue,
      };

      try {
        await addDoc(ref, data);
        console.log("Message added successfully!");
      } catch (error) {
        console.error("Error adding message to Firestore:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSave}>
      <label>Enter Message</label>
      <input type="text" ref={messageRef} />
      <button type="submit">Submit</button>
    </form>
  );
}

