"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import deleteApi from "@/utils/api/ObjData/deleteApi";

const ModalDeleteUser = ({ isOpen, onOpenChange, idUser , toggleReernder }) => {


  const deleteUser = () => {
    const deleteFunc = async () => {
      const res = await deleteApi(`/api/user/${idUser}`, "deleteUser");
      if (res.res.status === 200 || res.res.status === 201) {
        onOpenChange();
        toggleReernder()
      }
    };
    deleteFunc();
  };

  return (
    <Modal
      placement="center"
      className="!transition-all !max-w-[500px]"
      closeButton={<></>}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent className="rtl py-2">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 mt-2 pt-3 pb-2">
              <p className="flex gap-2 flex-row-reverse justify-end font-iranSans_2 ">
                حذف کردن کاربر <Trash2 color="#dc2626" />
              </p>
            </ModalHeader>
            <ModalBody>
              <p className="font-iranSans_2 text-sm text-gray-500">
                آیا از حذف کردن کاربر با شناسه {idUser} مطمئن هستید ؟
              </p>
            </ModalBody>
            <ModalFooter className="pb-4 pt-2">
              <Button
                className="font-iranSans_1 bg-gray-100"
                variant="light"
                onPress={onClose}
              >
                بستن
              </Button>
              <Button
                className="font-iranSans_1 bg-[#dc2626] text-white"
                onPress={deleteUser}
                id="deleteUser"
              >
                حذف کاربر
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalDeleteUser;
