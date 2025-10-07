const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DOMAIN_NAME = import.meta.env.VITE_API_DOMAIN_NAME;
export const api = DOMAIN_NAME
const baseApi = BASE_URL
export const signInApi = `${baseApi}/login`;
export const signUnApi = `${baseApi}/registration`;
export const categoryListApi = `${baseApi}/category/list`;
export const langingPageApi = `${baseApi}/landing-page`;
export const singleProductApi = `${baseApi}/product/`;




// ToasterPosition
export const toastr_position = "top-right"