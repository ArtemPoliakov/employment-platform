import { createContext, useContext } from "react";

type DialogContextType = {
  onClose: () => void;
  onSubmit: () => void;
};

export const DialogWindowContext = createContext<DialogContextType | undefined>(
  undefined
);

export const useDialogContext = () => {
  const context = useContext(DialogWindowContext);
  if (!context) {
    throw new Error(
      "useDialogContext must be used within a DialogWindowContext.Provider"
    );
  }
  return context;
};
