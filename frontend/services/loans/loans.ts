import axiosInstance from "../axiosInstance";

export const LoansServices = {
    //Get project members
    callApiTransfer: (data: any) => {
        return axiosInstance.post("/loan/", data);
    },
};
