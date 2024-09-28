import moment from "moment";

export const FormateDate = (date) => {
  try {
    return moment(date).format("DD/MM/YYYY hh:mm A");
  } catch (e) {
    return "";
  }
};
