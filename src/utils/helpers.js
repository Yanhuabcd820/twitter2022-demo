import axios from 'axios'
import Swal from 'sweetalert2'


const baseURL = 'http://13.113.156.193'

export const apiHelper = axios.create({
  baseURL
})

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
})
