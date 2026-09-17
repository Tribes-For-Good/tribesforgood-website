import { create } from "zustand";

const useFormStore = create((set) => ({
  openForm: false,
  formUrl: "",
  setOpenForm: (isOpen) => set({ openForm: isOpen }),
  setFormUrl: (url) => set({ formUrl: url }),
}));

export default useFormStore;
