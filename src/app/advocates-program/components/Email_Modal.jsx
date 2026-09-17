import { db } from "@/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import React, { useEffect, useRef, useState } from "react";

const Email_Modal = ({ open, setOpen }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    schoolName: "",
  });
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
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email" }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
      return true;
    }
  };

  const verifyPhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (phone?.trim() !== "" && !phoneRegex.test(phone)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Please enter a valid 10-digit phone number",
      }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, phone: "" }));
      return true;
    }
  };

  const verifySchoolName = (name) => {
    if (name?.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        schoolName: "Please enter school name",
      }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, schoolName: "" }));
      return true;
    }
  };

  const handleSubmit = async () => {
    const isEmailValid = verifyEmail(email);
    const isPhoneValid = verifyPhone(phone);
    const isSchoolNameValid = verifySchoolName(schoolName);

    if (!isEmailValid || !isPhoneValid || !isSchoolNameValid) {
      return;
    }

    try {
      const emailCol = collection(db, "emails"); // Reference to the 'emails' collection
      const emailQuery = query(emailCol, where("email", "==", email));
      const querySnapshot = await getDocs(emailQuery);

      if (!querySnapshot.empty) {
        // console.log("Email already exists!");
      } else {
        const docRef = await addDoc(emailCol, {
          email,
          phone,
          schoolName,
          timestamp: new Date(),
        });
        // console.log("Document written with ID: ", docRef.id);
      }

      const fileUrl = "/assets/assets/young-advocates.pdf";
      const fileName = "Young Advocates 2025-3.pdf";

      // Fetch the PDF and create a blob URL for download
      fetch(fileUrl)
        .then((response) => response.blob())
        .then((blob) => {
          // Create blob URL
          const blobUrl = window.URL.createObjectURL(blob);

          // Download the file
          const downloadLink = document.createElement("a");
          downloadLink.href = blobUrl;
          downloadLink.download = fileName;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);

          // Clean up blob URL
          setTimeout(() => window.URL.revokeObjectURL(blobUrl), 100);
        })
        .catch((error) => {
          console.error("Error downloading file:", error);
        });

      setEmail("");
      setPhone("");
      setSchoolName("");
      setErrors({ email: "", phone: "", schoolName: "" });
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div
            ref={modalRef}
            className="bg-white flex items-center flex-col gap-5 justify-center relative rounded-lg lg:rounded-2xl shadow-lg w-[400px] p-6 lg:p-10"
          >
            <div className="flex flex-col items-center font-raleway font-medium text-[20px] justify-center gap-2">
              Enter your Details
            </div>

            <div className="w-full flex flex-col gap-4">
              {/* Email Field */}
              <div className="relative">
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  onBlur={(e) => verifyEmail(e.target.value)}
                  type="text"
                  id="email"
                  placeholder=" "
                  className={`${
                    errors.email
                      ? "border-red-600 focus:border-red-500"
                      : "border-[#6B737A] focus:border-[#6B7280] peer"
                  } block w-full px-2.5 pb-2.5 pt-4 text-sm bg-transparent rounded-lg lg:rounded-xl border appearance-none focus:outline-none focus:ring-0 `}
                />
                <label
                  htmlFor="email"
                  className={`absolute ${
                    errors.email ? "text-red-500" : ""
                  } text-sm text-[#6B7280] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:text-[#6B7280] peer-focus:scale-75 peer-focus:-translate-y-4 left-2`}
                >
                  Email
                </label>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Phone Number Field */}
              <div className="relative">
                <input
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  onBlur={(e) => verifyPhone(e.target.value)}
                  type="text"
                  id="phone"
                  placeholder=" "
                  className={`${
                    errors.phone
                      ? "border-red-600 focus:border-red-500"
                      : "border-[#6B737A] focus:border-[#6B7280] peer"
                  } block w-full px-2.5 pb-2.5 pt-4 text-sm bg-transparent rounded-lg lg:rounded-xl border appearance-none focus:outline-none focus:ring-0 `}
                />
                <label
                  htmlFor="phone"
                  className={`absolute ${
                    errors.phone ? "text-red-500" : ""
                  } text-sm text-[#6B7280] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:text-[#6B7280] peer-focus:scale-75 peer-focus:-translate-y-4 left-2`}
                >
                  Phone Number
                </label>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* School Name Field */}
              <div className="relative">
                <input
                  value={schoolName}
                  onChange={(e) => {
                    setSchoolName(e.target.value);
                  }}
                  onBlur={(e) => verifySchoolName(e.target.value)}
                  type="text"
                  id="schoolName"
                  placeholder=" "
                  className={`${
                    errors.schoolName
                      ? "border-red-600 focus:border-red-500"
                      : "border-[#6B737A] focus:border-[#6B7280] peer"
                  } block w-full px-2.5 pb-2.5 pt-4 text-sm bg-transparent rounded-lg lg:rounded-xl border appearance-none focus:outline-none focus:ring-0 `}
                />
                <label
                  htmlFor="schoolName"
                  className={`absolute ${
                    errors.schoolName ? "text-red-500" : ""
                  } text-sm text-[#6B7280] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:text-[#6B7280] peer-focus:scale-75 peer-focus:-translate-y-4 left-2`}
                >
                  Name of School
                </label>
                {errors.schoolName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.schoolName}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className={`bg-primary ${
                errors.email !== "" ||
                errors.phone !== "" ||
                errors.schoolName !== "" ||
                email?.trim() === "" ||
                phone?.trim() === "" ||
                schoolName?.trim() === ""
                  ? "pointer-events-none cursor-default opacity-50"
                  : ""
              } w-max mx-auto lg:m-0 px-4 p-2 hover:opacity-80 text-black font-raleway font-medium border-none outline-none rounded-md`}
            >
              Download
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Email_Modal;
