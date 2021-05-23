import { toast } from 'react-toastify';

export const Toast = {
  success: (message) => {
    toast.success(message, {
      position: "top-center"
    })
  },
  info: (message) => {
    toast.info(message, {
      position: "top-center"
    })
  },
  warning: (message) => {
    toast.warn(message, {
      position: "top-center"
    })
  },
  error: (message) => {
    toast.error(message, {
      position: "top-center"
    })
  },
  dark: (message) => {
    toast.dark(message, {
      position: "top-center"
    })
  },
  white: (message) => {
    toast(message, {
      position: "top-center"
    })
  }
}