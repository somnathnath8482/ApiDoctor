


    export const Server = "http://localhost"
   //export const Server = "https://easysent.site";

export const BaseUrl = Server+":5555/api/";
export const ProfilePath = Server+"/apiflow/backend/ApiFlow-Hosting/uploads/"

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
  createApi: BaseUrl + "apis/create",
  getApi: BaseUrl + "apis/",
  getApisOfProject: BaseUrl + "projects/api/",
  deleteApi: BaseUrl + "apis/",
  addApiUsesAnalitics: BaseUrl + "api-usage-analytics",
  getApiUsesAnalitics: BaseUrl + "api-usage-analytics/",
  getStatistics: BaseUrl + "apis/statistics",
  deleteProject: BaseUrl + "projects/",
  addNotification: BaseUrl + "notifications/add",
  addBug: BaseUrl + "bug/add",
  getNotification: BaseUrl + "notifications",
  getBug: BaseUrl + "bug/",
  getBugTimeline: BaseUrl + "bug/timeline/",
  updateBugStatus: BaseUrl + "bug/update-status",
  sendBugMessage: BaseUrl + "bug/messages",
  getBugMessage: BaseUrl + "bug/messages/",
  deleteBug: BaseUrl + "bug/delete/",
  updateProfile: BaseUrl + "users/updateProfile",
  getActivityHistory: BaseUrl + "users/activity-history",
  getLoginHistory: BaseUrl + "users/login-history",

};
