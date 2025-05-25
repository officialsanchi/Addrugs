import axios from "../hooks/axios";

const baseUrl = "https://mobileapp-backend-5410.onrender.com/api/v1";
// const baseUrl = "http://localhost:8080/api/v1";

const authPaths = "/auth";
// const userPaths = "/user";
const drugPaths = "/drug";

//  auth service
const registerUser = async (payload: any) => {
  return await axios
    .post(`${baseUrl}${authPaths}/register`, payload)
    .then((res) => res.data);
};

const forgotPassword = async (payload: any) => {
  return await axios
    .post(`${baseUrl}${authPaths}/forgot-password`, payload)
    .then((res) => res.data);
};

const resetPassword = async (payload: any) => {
  return await axios
    .post(`${baseUrl}${authPaths}/reset-password`, payload)
    .then((res) => res.data);
};

const verifyOtp = async (payload: any) => {
  return await axios
    .post(`${baseUrl}${authPaths}/verify`, payload)
    .then((res) => res.data);
};

const loginUser = async (payload: any) => {
  return await axios
    .post(`${baseUrl}${authPaths}/login`, payload)
    .then((res) => res.data);
};
const createDrug = async (payload: any) => {
  return await axios
    .post(`${baseUrl}${drugPaths}/`, payload)
    .then((res) => res.data);
};
const updateDrug = async (payload: any, id: string) => {
  return await axios
    .post(`${baseUrl}${drugPaths}/${id}`, payload)
    .then((res) => res.data);
};
const getAllDrugs = async () => {
  return await axios.get(`${baseUrl}${drugPaths}/`).then((res) => res.data);
};
const getAllDrugSchedule = async () => {
  return await axios
    .get(`${baseUrl}${drugPaths}/schedule`)
    .then((res) => res.data);
};
const deleteDrug = async (id: string) => {
  return await axios
    .post(`${baseUrl}${drugPaths}/${id}`)
    .then((res) => res.data);
};



export {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyOtp,
  createDrug,
  updateDrug,
  deleteDrug,
  getAllDrugs,
  getAllDrugSchedule,
};
