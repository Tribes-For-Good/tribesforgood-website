import { db } from "@/firebase";
import useFormStore from "@/store/useFormStore";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import React, { useContext, useEffect, useRef, useState } from "react";

const FormModal = () => {
  const {
    openForm: open,
    setOpenForm: setOpen,
    formUrl,
    setFormUrl,
  } = useFormStore();
  const [email, setEmail] = useState("");
  const modalRef = useRef(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const verifyEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email?.trim() !== "" && !emailRegex.test(email)) {
      setError("Please enter a valid email");
      return; // Don't proceed if the email is invalid
    } else {
      setError("");
    }
  };

  const handleSubmit = async () => {
    verifyEmail(email);
    try {
      const emailCol = collection(db, "emails"); // Reference to the 'emails' collection
      const emailQuery = query(emailCol, where("email", "==", email));
      const querySnapshot = await getDocs(emailQuery);

      if (!querySnapshot.empty) {
        // console.log("Email already exists!");
      } else {
        const docRef = await addDoc(emailCol, { email });
        // console.log("Document written with ID: ", docRef.id);
      }

      const fileUrl = "/assets/assets/program_schedule.pdf"; // Path to your file
      const anchor = document.createElement("a");
      anchor.href = fileUrl;
      anchor.download = "program_schedule.pdf"; // Optional: Specify the file name for download

      anchor.click();
      setEmail("");
      setOpen(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleOverlayClick = (e) => {
    // Close modal only if the click is outside the modal content
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <>
      {open && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-3 sm:p-6"
        >
          <div
            ref={modalRef}
            className="relative h-[85vh] w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-2xl sm:h-[80vh] sm:w-[80%]"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close form"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-2xl leading-none text-[#0F1C4D] shadow-md transition hover:bg-gray-100"
            >
              &times;
            </button>
            <iframe
              src={formUrl}
              title="Application form"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              className="h-full w-full"
            >
              Loading&hellip;
            </iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
