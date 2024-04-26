import ProviderSideBar from "@/components/Panel/MainPanel/SideBar/ProviderSideBar";
import { Toaster } from "react-hot-toast";


export default function RootLayout({ children }) {

  return (
 <>
 <Toaster 
 position="bottom-right"
 reverseOrder={true}
 toastOptions={{
  className: '',
  style: {
    padding: '10px',
    fontSize:"14px" ,
    fontFamily: "var(--font_2)"
  },
}}
 />
 <ProviderSideBar getChildren={children}/>
</>

  
  );
}
