"use client"
import { useState } from "react";
import Sidebar , {SidebarItem} from "@/components/Panel/MainPanel/SideBar/Sidebar";
import { Mail, UserRound } from "lucide-react";
import DropDownSideBar from "./DropDownSideBar";




const ProviderSideBar = ({getChildren}) => {
  const [sidebar, setSidebar] = useState(false);



  return (
    <div className="flex">
    <Sidebar sidebar={sidebar} setSidebar={setSidebar}>
      <SidebarItem
        icon={<UserRound size={20} />}
        text={"کاربران"}
        link={"/dashboard/users"}
      />

 
  

  
      <DropDownSideBar sidebar={sidebar} heightBox={"h-[96px]"} mainIcon={   <UserRound />} mainText={"سلام"}
      items={[{icon: <Mail/> , text:"سلام"}  , {icon: <Mail/> , text:"خدافظ"} ]}
      />
       <DropDownSideBar sidebar={sidebar} heightBox={'h-[144px]'} mainIcon={   <UserRound />} mainText={"تست"}
      items={[{icon: <Mail/> , text:"سلام"}  , {icon: <Mail/> , text:"خدافظ"} , {icon: <Mail/> , text:"خدافظ"} ]}
      />

        <SidebarItem
          icon={<UserRound size={20} />}
          text={" تست  "}
          link={"/test"}
        />
    </Sidebar>
    <div className="w-full overflow-hidden bg-gray-50">
      <div className=" h-[64px] w-full bg-white  border-gray-200 border-b-[2px]"></div>
      <div className="my-5 px-5  overflow-y-hidden">
      {getChildren}
      </div>
    </div>
   

   
  </div>
  )
}

export default ProviderSideBar