import disableBtn from "@/utils/btn/disableBtn";
import enableBtn from "@/utils/btn/enableBtn";
import { toast } from "react-hot-toast";

const sendRequest = (url, idBTN, router = false) => {
  return new Promise(async (resolve, reject) => {
    try {
      disableBtn(idBTN);
      const res = await fetch(url, {
        method: "DELETE",
      });
      enableBtn(idBTN);

      //   Redirect
      if (res.redirected && router) {
        router.push(res.url);
        resolve({ routePush: 1 });
        return;
      }
      const result = await res.json();
      if (res.status === 200 || res.status === 201) {
        resolve({ result, res });
      } else {
        reject(result.message);
      }
    } catch (error) {
      enableBtn(idBTN);
      console.log("error", error);
      reject("ارور در درخواست");
    }
  });
};

const deleteApi = async (
  url,
  idBTN,
  router = false
  //  setloading
) => {
  const result = await toast.promise(sendRequest(url, idBTN, router), {
    loading: "در حال پردازش اطلاعات ...",

    success: (data) => `${data.result.message}`,

    error: (err) => `${err.toString()}`,
  });
  return result;
};

export default deleteApi;
