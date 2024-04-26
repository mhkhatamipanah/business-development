"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

import {
  MailCheckIcon,
  PhoneCall,
  User2Icon,
  UserCog,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";
import { Input, Select, SelectItem, Spinner } from "@nextui-org/react";

import getApi from "@/utils/api/ObjData/getApi";
import putApi from "@/utils/api/ObjData/putApi";

const Page = ({ params: { id } }) => {
  const router = useRouter()


  const [idUser, setIdUser] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [selectRole, setSelectRole] = useState("");
  const [selectTeam, setSelectTeam] = useState("");
  const [selectStatus, setSelectStatus] = useState("");

  const [error, setError] = useState({
    subject: "",
    isError: false,
    errorMessage: "",
  });

  const editUser = () => {
    const objBody = { id_user:idUser, username,phone , email ,status: selectStatus ,team:selectTeam};
    putApi(`/api/user/${id}`, objBody , "editBtn" , router);
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    if (data) {
      setIdUser(data.id_user);
      setUsername(data.username);
      setPhone(data.phone);
      setEmail(data.email);
      setSelectRole(data.role);
      setSelectStatus(data.status);
      setSelectTeam(data.team);
    } else {
      getApi(`/api/user/${id}`, setData);
    }
  }, [data]);

  return (
    <>
      <div className="w-full font-iranSans_2 ">
        {data ? (
          <>
            <section className="rtl grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3">
              <Input
                value={idUser}
                disabled={true}
                className="labelInputNextUi font-iranSans_2 mb-4 md:mb-8"
                classNames={{
                  innerWrapper: "!cursor-not-allowed",
                  input: ["!cursor-not-allowed"],
                  inputWrapper: ["bg-gray-200", "!cursor-not-allowed"],
                }}
                type="text"
                label=" شناسه :"
                labelPlacement="outside"
                startContent={
                  <UserRoundCheck className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
              <Input
                value={selectRole}
                disabled={true}
                className="labelInputNextUi font-iranSans_2 mb-4 md:mb-8"
                classNames={{
                  innerWrapper: "!cursor-not-allowed",
                  input: ["!cursor-not-allowed"],
                  inputWrapper: ["bg-gray-200", "!cursor-not-allowed"],
                }}
                type="text"
                label=" نقش :"
                labelPlacement="outside"
                startContent={
                  <UserCog color="#a4a4ac" />
                }
              />
            </section>
            <section className="rtl grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3">
              <Input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                id="username"
                className="labelInputNextUi font-iranSans_2 mb-4 md:mb-8"
                type="text"
                label="نام کاربری :"
                placeholder=" نام کاربری را وارد کنید..."
                isInvalid={error.subject == "username" && error.isError}
                errorMessage={error.subject == "username" && error.errorMessage}
                labelPlacement="outside"
                startContent={
                  <User2Icon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
              <Input
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                id="phone"
                className="labelInputNextUi font-iranSans_2 mb-4 md:mb-8"
                type="text"
                label="شماره تلفن  :"
                placeholder="شماره تلفن را وارد کنید..."
                isInvalid={error.subject == "phone" && error.isError}
                errorMessage={error.subject == "phone" && error.errorMessage}
                labelPlacement="outside"
                startContent={
                  <PhoneCall className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />

              <Input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                className="labelInputNextUi font-iranSans_2 mb-4 md:mb-8"
                type="email"
                label="ایمیل:"
                placeholder="your-email@example.com"
                isInvalid={error.subject == "email" && error.isError}
                errorMessage={error.subject == "email" && error.errorMessage}
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
                placeholder={selectStatus}
                isInvalid={error.subject == "status" && error.isError}
                errorMessage={error.subject == "status" && error.errorMessage}
                startContent={<UserCog color="#a4a4ac" />}
                labelPlacement="outside"
              >
                <SelectItem
                  key={"فعال"}
                  value={"فعال"}
                  className="font-iranSans_3"
                >
                  فعال
                </SelectItem>
                <SelectItem
                  key={"استراحت"}
                  value={"استراحت"}
                  className="font-iranSans_3"
                >
                  استراحت
                </SelectItem>
                <SelectItem
                  key={"غیرفعال"}
                  value={"غیرفعال"}
                  className="font-iranSans_3"
                >
                  غیرفعال
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
                placeholder={selectTeam}
                isInvalid={error.subject == "team" && error.isError}
                errorMessage={error.subject == "team" && error.errorMessage}
                startContent={<UsersRound color="#a4a4ac" />}
                labelPlacement="outside"
              >
                <SelectItem
                  key={"توسعه دهنده"}
                  value={"توسعه دهنده"}
                  className="font-iranSans_3"
                >
                  توسعه دهنده
                </SelectItem>
                <SelectItem
                  key={"فروش"}
                  value={"فروش"}
                  className="font-iranSans_3"
                >
                  فروش
                </SelectItem>
                <SelectItem
                  key={"طراحی"}
                  value={"طراحی"}
                  className="font-iranSans_3"
                >
                  طراحی
                </SelectItem>
                <SelectItem
                  key={"مارکتینگ"}
                  value={"مارکتینگ"}
                  className="font-iranSans_3"
                >
                  مارکتینگ
                </SelectItem>
                <SelectItem
                  key={"محصول"}
                  value={"محصول"}
                  className="font-iranSans_3"
                >
                  محصول
                </SelectItem>
                <SelectItem
                  key={" نیروی انسانی"}
                  value={" نیروی انسانی"}
                  className="font-iranSans_3"
                >
                  نیروی انسانی
                </SelectItem>
                <SelectItem
                  key={"مالی"}
                  value={"مالی"}
                  className="font-iranSans_3"
                >
                  مالی
                </SelectItem>
                <SelectItem
                  key={"مدیریت"}
                  value={"مدیریت"}
                  className="font-iranSans_3"
                >
                  مدیریت
                </SelectItem>

                <SelectItem
                  key={"تکنولوژی"}
                  value={"تکنولوژی"}
                  className="font-iranSans_3"
                >
                  تکنولوژی
                </SelectItem>
              </Select>
            </section>
          </>
        ) : (
          <div className="w-full h-40 flex justify-center items-center">
            <Spinner size="lg" />
          </div>
        )}

        <button
        id="editBtn"
          onClick={editUser}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          ادیت کاربر
        </button>
      </div>
    </>
  );
};

export default Page;
