"use client";
import TableUsers from "@/components/Panel/MainPanel/Table/TableUsers";
import ModalCreateUser from "@/components/Panel/Users/ModalCreateUser/ModalCreateUser";
import ModalDeleteUser from "@/components/Panel/Users/ModalDeleteUser/ModalDeleteUser";

import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";

const Page = () => {
  // Modal Create User
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Modal Delete User
  const [isOpen2, setIsOpen2] = useState(false);
  const onOpenChange2 = () => {
    setIsOpen2(!isOpen2);
  };
  const onOpen2 = () => {
    setIsOpen2(true);
  };

  // ID User
  const [idUser, setIdUser] = useState(null);


  // Rerender
  const [rerender, serRerender] = useState(null);
  const toggleReernder =()=>{
    serRerender(!rerender)
  }

  return (
    <>
      <ModalCreateUser isOpen={isOpen} onOpenChange={onOpenChange} toggleReernder={toggleReernder} />
      <ModalDeleteUser
        isOpen={isOpen2}
        onOpenChange={onOpenChange2}
        idUser={idUser}
        toggleReernder={toggleReernder}
      />

      <TableUsers
        onOpenCreateUser={onOpen}
        onOpenDeleteUser={onOpen2}
        setIdUser={setIdUser}
        rerender={rerender}
      />
    </>
  );
};

export default Page;
