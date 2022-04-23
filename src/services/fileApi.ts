import axios from "services/api.cofig";

const getUserFiles = async () =>
  await axios
    .get("/file", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((response: any) => response)
    .catch((error: any) => error);

const getAFile = async (id: string) => {
  await axios
    .get(`/file/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      responseType: "blob",
    })
    .then((response: any) => {
      const file = new Blob([response.data], {
        type: "application/octet-stream",
      });

      const fileURL = URL.createObjectURL(file);
      const anchor = document.createElement("a");
      anchor.download = response.headers["filename"];
      anchor.href = fileURL;
      anchor.click();
    })
    .catch((error: any) => error);
};

const sendUserFile = async (data: FormData) =>
  await axios
    .post("file/upload", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response: any) => response)
    .catch((error: any) => error.response);

const deleteAFile = async (id: string) => {
  await axios
    .delete(`file/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((response: any) => response)
    .catch((error: any) => new Error(error));
};

export { getUserFiles, getAFile, sendUserFile, deleteAFile };
