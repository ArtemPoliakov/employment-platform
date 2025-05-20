import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.log("Full error:", error);
    console.log("Axios error.response:", error?.response);
    console.log("Error data:", error?.response?.data);

    var err = error.response;
    if (Array.isArray(err?.data.errors)) {
      for (let val of err?.data.errors) {
        toast.warning(val.description);
      }
    } else if (Array.isArray(err?.data)) {
      for (let val of err?.data) {
        toast.warning(val.description);
      }
    } else if (typeof err?.data.errors === "object") {
      for (let e in err?.data.errors) {
        toast.warning(err.data.errors[e][0]);
      }
    } else if (typeof err?.data === "object") {
      for (let e in err?.data) {
        toast.warning(err.data[e][0]);
      }
    } else if (err?.data) {
      toast.warning(err.data);
    } else if (err?.status == 401) {
      toast.warning("Please login");
    } else if (err?.status == 403) {
      toast.warning("You are not authorized to perform this action");
    } else if (err) {
      toast.warning(err?.data);
    }
  }
};
