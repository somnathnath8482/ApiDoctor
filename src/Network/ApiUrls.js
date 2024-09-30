export const BaseUrl = "http://localhost:5555/api/"
//export const BaseUrl = "https://easysent.site:5555/api/"
export const ApiUrls = {
  register: BaseUrl + "auth/signup",
  login: BaseUrl + "auth/login",
  sendOtp: BaseUrl + "auth/send-otp",
  verifyOtp: BaseUrl + "auth/verify-otp",
  forgotPassword: BaseUrl + "auth/forgot-password",
  setPassword: BaseUrl + "auth/set-password",
  createProject: BaseUrl + "projects/create",
  getProjects: BaseUrl + "projects",
  getProjectsAccess: BaseUrl + "projects/project-access/",
  addProjectsAccess: BaseUrl + "projects/project-access",
};
