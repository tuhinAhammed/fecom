const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DOMAIN_NAME = import.meta.env.VITE_API_DOMAIN_NAME;

export const signInApi = `${BASE_URL}/login`;
export const signUnApi = `${BASE_URL}/registration`;
export const categoryListApi = `${BASE_URL}/category/list`;
export const langingPageApi = `${BASE_URL}/landing-page`;




// ToasterPosition
export const toastr_position = "top-right"