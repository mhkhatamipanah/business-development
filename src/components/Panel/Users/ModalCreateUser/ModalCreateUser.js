"use client"
import { useState } from 'react';
import {
    Info,
    LockKeyhole,
    MailCheckIcon,
    PhoneCall,
    User2Icon,
    UserCog,
    UsersRound,
  } from "lucide-react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Select,
    SelectItem,
  } from "@nextui-org/react";
import postApi from '@/utils/api/ObjData/postApi';

const ModalCreateUser = ({isOpen , onOpenChange , toggleReernder }) => {
    
    const [selectRole, setSelectRole] = useState("");
    const [selectTeam, setSelectTeam] = useState("");
    const [selectStatus, setSelectStatus] = useState("");
  
    const [error, setError] = useState({
        subject: "",
        isError: false,
        errorMessage: "",
      });
    
      function emptyInput(text) {
        return `لطفا ${text} را خالی نگذارید`;
      }
      function lessChar(text, number) {
        return ` ${text} نمیتواند کمتر از ${number} حرف باشد`;
      }
    
      const registerUser = () => {
        const userName = document.getElementById("username").value;
        const phone = document.getElementById("phone").value;
        const repeatPassword = document.getElementById("repeat-password").value;
        const password = document.getElementById("password").value;
    
        const email = document.getElementById("email").value;
    
        // if(!userName){
        //   setError({
        //     subject: "username" ,  isError : true ,  errorMessage: emptyInput("نام کاربری")
        //   })
        //   return
    
        // }else if(userName.length < 2 ){
        //   setError({
        //     subject: "username" ,  isError : true ,  errorMessage: lessChar("نام کاربری" , 2)
        //   })
        //   return
    
        // }else if(!phone){
        //   setError({
        //     subject: "phone" ,  isError : true ,  errorMessage: emptyInput("تلفن")
        //   })
        //   return
    
        // }else if(phone.length < 3 ){
        //   setError({
        //     subject: "phone" ,  isError : true ,  errorMessage: lessChar("تلفن" , 3)
        //   })
        //   return
    
        // }else if(!password){
        //   setError({
        //     subject: "password" ,  isError : true ,  errorMessage: emptyInput("رمز عبور")
        //   })
        //   return
    
        // }else if(password.length < 3 ){
        //   setError({
        //     subject: "password" ,  isError : true ,  errorMessage: lessChar("رمز عبور" , 3)
        //   })
        //   return
    
        // }else if(!repeatPassword){
        //   setError({
        //     subject: "repeatPassword" ,  isError : true ,  errorMessage: emptyInput("تکرار رمز عبور")
        //   })
        //   return
    
        // }else if(repeatPassword.length < 3 ){
        //   setError({
        //     subject: "repeatPassword" ,  isError : true ,  errorMessage: lessChar("تکرار رمز عبور" , 3)
        //   })
        //   return
    
        // }else if(password !== repeatPassword ){
        //   setError({
        //     subject: "repeatPassword" ,  isError : true ,  errorMessage: "رمز عبور و تکرار آن با هم یکسان نیست"
        //   })
        //   return
    
        // }else if(!selectRole){
        //   setError({
        //     subject: "role" ,  isError : true ,  errorMessage: emptyInput("نقش")
        //   })
        //   return
    
        // }else if(!email){
        //   setError({
        //     subject: "email" ,  isError : true ,  errorMessage: emptyInput("ایمیل")
        //   })
        //   return
    
        // }else if(!selectTeam){
        //   setError({
        //     subject: "team" ,  isError : true ,  errorMessage: emptyInput("تیم")
        //   })
        //   return
    
        // }else if(!selectStatus){
        //   setError({
        //     subject: "status" ,  isError : true ,  errorMessage: emptyInput("وضعیت")
        //   })
        //   return
    
        // }
    
        let userObj = {
          username: userName,
          phone: phone,
          password: password,
          role: selectRole,
          email: email,
          team: selectTeam,
          status: selectStatus,
        };
        const sendApiRequest = async()=>{
          const res = await postApi("/api/user/" ,userObj ,"CreateUser")
          toggleReernder()
        }
        sendApiRequest()
      };
  return (
    <Modal
    placement="center"
    className="!transition-all !max-w-[600px]"
    closeButton={<></>}
    isOpen={isOpen}
    onOpenChange={onOpenChange}
  >
    <ModalContent className="rtl">
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1 font-iranSans_2 my-3">
            <p className="flex gap-2 flex-row-reverse justify-end">
              اضافه کردن اطلاعات کاربر <Info color="#0070f0" />
            </p>
          </ModalHeader>
          <ModalBody>
            <section className="rtl grid  grid-cols-1 md:grid-cols-2 gap-x-3">
              <Input
                id="username"
                className="labelInputNextUi font-iranSans_2 mb-4 md:mb-8"
                type="text"
                label="نام کاربری :"
                placeholder=" نام کاربری را وارد کنید..."
                isInvalid={error.subject == "username" && error.isError}
                errorMessage={
                  error.subject == "username" && error.errorMessage
                }
                labelPlacement="outside"
                startContent={
                  <User2Icon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
              <Input
                id="phone"
                className="labelInputNextUi font-iranSans_2 mb-4 md:mb-8"
                type="text"
                label="شماره تلفن  :"
                placeholder="شماره تلفن را وارد کنید..."
                isInvalid={error.subject == "phone" && error.isError}
                errorMessage={
                  error.subject == "phone" && error.errorMessage
                }
                labelPlacement="outside"
                startContent={
                  <PhoneCall className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
              <Input
                id="password"
                className="labelInputNextUi font-iranSans_2 mb-4 md:mb-8"
                type="text"
                label="رمز عبور :"
                placeholder=" رمز عبور را وارد کنید..."
                isInvalid={error.subject == "password" && error.isError}
                errorMessage={
                  error.subject == "password" && error.errorMessage
                }
                labelPlacement="outside"
                startContent={
                  <LockKeyhole className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
              <Input
                id="repeat-password"
                className="labelInputNextUi font-iranSans_2 mb-4 md:mb-8"
                type="text"
                label="تکرار رمز عبور :"
                placeholder="  رمز عبور را مجدد وارد کنید..."
                isInvalid={
                  error.subject == "repeatPassword" && error.isError
                }
                errorMessage={
                  error.subject == "repeatPassword" && error.errorMessage
                }
                labelPlacement="outside"
                startContent={
                  <LockKeyhole className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
              <Input
                id="email"
                className="labelInputNextUi font-iranSans_2 mb-4 md:mb-8"
                type="email"
                label="ایمیل:"
                placeholder="your-email@example.com"
                isInvalid={error.subject == "email" && error.isError}
                errorMessage={
                  error.subject == "email" && error.errorMessage
                }
                labelPlacement="outside"
                startContent={
                  <MailCheckIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
              <Select
                //  defaultSelectedKeys={1}
                id="status"
                value={selectStatus}
                onChange={(e) => {
                  setSelectStatus(e.target.value);
                }}
                className={`labelInputNextUi font-iranSans_2 mb-4  md:mb-8 ${
                  error.subject == "status" ? "labelSpace" : ""
                }`}
                label="وضعیت :"
                placeholder="وضعیت کاربر را انتخاب کنید"
                isInvalid={error.subject == "status" && error.isError}
                errorMessage={
                  error.subject == "status" && error.errorMessage
                }
                startContent={<UserCog color="#a4a4ac" />}
                labelPlacement="outside"
                // defaultSelectedKeys={["cat"]}
                // className="max-w-xs"
              >
                {/* {animals.map((animal) => (
    <SelectItem key={animal.value} value={animal.value}  className="font-iranSans_3">
      {animal.label}
    </SelectItem>
  ))} */}
                <SelectItem key={"فعال"} value={"فعال"}  className="font-iranSans_3">
                  فعال
                </SelectItem>
                <SelectItem key={"استراحت"} value={"استراحت"}  className="font-iranSans_3">
                  استراحت
                </SelectItem>
                <SelectItem key={"غیرفعال"} value={"غیرفعال"}  className="font-iranSans_3">
                  غیرفعال
                </SelectItem>
              </Select>
              <Select
                //  defaultSelectedKeys={1}
                id="role"
                value={selectRole}
                onChange={(e) => {
                  setSelectRole(e.target.value);
                }}
                className={`labelInputNextUi font-iranSans_2 mb-4  md:mb-8 ${
                  error.subject == "role" ? "labelSpace" : ""
                }`}
                label="نقش :"
                placeholder="نقش کاربر را انتخاب کنید"
                isInvalid={error.subject == "role" && error.isError}
                errorMessage={error.subject == "role" && error.errorMessage}
                startContent={<UserCog color="#a4a4ac" />}
                labelPlacement="outside"
                // defaultSelectedKeys={["cat"]}
                // className="max-w-xs"
              >
                {/* {animals.map((animal) => (
    <SelectItem key={animal.value} value={animal.value}  className="font-iranSans_3">
      {animal.label}
    </SelectItem>
  ))} */}
                <SelectItem key={"مدیرکل"} value={"مدیرکل"}  className="font-iranSans_3">
                  مدیرکل
                </SelectItem>
                <SelectItem key={"حسابدار"} value={"حسابدار"}  className="font-iranSans_3">
                  حسابدار
                </SelectItem>
                <SelectItem key={"طراح"} value={"طراح"}  className="font-iranSans_3">
                  طراح
                </SelectItem>
              </Select>
              <Select
                id="team"
                value={selectTeam}
                onChange={(e) => {
                  setSelectTeam(e.target.value);
                }}
                className={`labelInputNextUi font-iranSans_2 mb-4  md:mb-8 ${
                  error.subject == "team" ? "labelSpace" : ""
                }`}
                label="تیم :"
                placeholder="تیم کاربر را انتخاب کنید"
                isInvalid={error.subject == "team" && error.isError}
                errorMessage={error.subject == "team" && error.errorMessage}
                startContent={<UsersRound color="#a4a4ac" />}
                labelPlacement="outside"
              >
                <SelectItem key={"توسعه دهنده"} value={"توسعه دهنده"}  className="font-iranSans_3">
                  توسعه دهنده
                </SelectItem>
                <SelectItem key={"فروش"} value={"فروش"}  className="font-iranSans_3">
                  فروش
                </SelectItem>
                <SelectItem key={"طراحی"} value={"طراحی"}  className="font-iranSans_3">
                  طراحی
                </SelectItem>
                <SelectItem key={"مارکتینگ"} value={"مارکتینگ"}  className="font-iranSans_3">
                  مارکتینگ
                </SelectItem>
                <SelectItem key={"محصول"} value={"محصول"}  className="font-iranSans_3">
                  محصول
                </SelectItem>
                <SelectItem key={" نیروی انسانی"} value={" نیروی انسانی"}  className="font-iranSans_3">
                  نیروی انسانی
                </SelectItem>
                <SelectItem key={"مالی"} value={"مالی"}  className="font-iranSans_3">
                  مالی
                </SelectItem>
                <SelectItem key={"مدیریت"} value={"مدیریت"}  className="font-iranSans_3">
                  مدیریت
                </SelectItem>

                <SelectItem key={"تکنولوژی"} value={"تکنولوژی"}  className="font-iranSans_3">
                  تکنولوژی
                </SelectItem>
              </Select>
            </section>
          </ModalBody>

          <ModalFooter>
            <Button
              className="font-iranSans_1"
              color="danger"
              variant="light"
              onPress={onClose}
            >
              بستن
            </Button>
            <Button
              className="font-iranSans_1"
              color="primary"
              onPress={registerUser}
              id="CreateUser"
            >
              ثبت کاربر
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
  )
}

export default ModalCreateUser