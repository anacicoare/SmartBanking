import axiosInstance from "../axiosInstance";

export const CardServices = {
    //Get project members
    callApiGetCards: () => {
        return axiosInstance.get("/cards/");
    },

    callApiCreateCard: (data: any) => {
        return axiosInstance.post("/cards/", data)
    },
}