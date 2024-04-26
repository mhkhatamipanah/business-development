import disableBtn from "@/utils/btn/disableBtn";
import enableBtn from "@/utils/btn/enableBtn";
import { toast } from "react-hot-toast";

const sendRequest = (url, data, idBTN ,  router ) => {
  return new Promise(async (resolve, reject) => {
    try {
        disableBtn(idBTN)
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      enableBtn(idBTN)
      // if (res.redirected && router) {
      //   router.push(res.url);
      //   resolve({ routePush: 1 });
      //   return;
      // }
      const result = await res.json();
      if (res.status === 200 || res.status === 201) {
        if(result.path){
           router.push(result.path);
        }
        resolve({ result, res });
      } else {
        reject(result.message);
      }
    } catch (error) {
      enableBtn(idBTN)
      console.log("error", error);
      reject("ارور در درخواست");
    }
  });
};

const putApi = async (
  url,
  data,
  idBTN,
  router = false
  //  setloading
) => {
  const result = await toast.promise(sendRequest(url, data,idBTN ,  router), {
    loading: "در حال پردازش اطلاعات ...",

    success:(data) => `${data.result.message}`,
    
    error: (err) => `${err.toString()}`
  });
  return result;
};

export default putApi;
