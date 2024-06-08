export const getError: (message: string) => {
  status: "error";
  message: string;
} = (message) => ({ status: "error", message });
