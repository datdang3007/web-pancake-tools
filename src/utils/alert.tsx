import Swal from "sweetalert2";

export const showAlertSuccess = (title?: string) => {
  return Swal.fire({
    toast: true,
    timer: 3000,
    icon: "success",
    title: title ?? "",
    position: "top-end",
    timerProgressBar: true,
    showConfirmButton: false,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
};

export const showAlertError = (title?: string) => {
  return Swal.fire({
    toast: true,
    timer: 3000,
    icon: "error",
    title: title ?? "",
    position: "top-end",
    timerProgressBar: true,
    showConfirmButton: false,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
};
