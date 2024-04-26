"use client";

import { useEffect, useState } from "react";


import {Card, CardHeader, CardBody, CardFooter, Divider, Spinner , Chip} from "@nextui-org/react";

import getApi from "@/utils/api/ObjData/getApi";

const Page = ({ params: { id } }) => {

  const [data, setData] = useState(null);

  useEffect(() => {
    if(!data) {
      getApi(`/api/user/${id}`, setData);
    }
  }, [data]);

  return (
    <>
      <div className="w-full font-iranSans_2 ">
        {data ? (
          <>
          
            <section className="rtl grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 py-1">
         <Card shadow="sm" className="max-w-[400px]">
      <CardHeader className="flex gap-3">
       
        <div className="flex flex-col">
          <p className="text-sm">{data.username}</p>
          <p className="text-small text-default-500">{data.role}</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <div className="flex flex-col gap-1">
        <p className="text-right">شناسه : <span className="text-gray-700 text-sm">{data.id_user} </span></p>
        <p className="text-right">ایمیل : <span className="text-gray-700 text-sm">{data.email} </span></p>
        <p className="text-right">تلفن : <span className="text-gray-700 text-sm">{data.phone} </span></p>
        
        <p className="text-right">تیم : <span className="text-gray-700 text-sm">{data.team} </span></p>
        </div>
      </CardBody>
      <Divider/>
      <CardFooter>
        {data.status ==="فعال" ?  <Chip color="success">{data.status}</Chip>:
        data.status ==="استراحت" ?  <Chip color="warning">{data.status}</Chip>:
        data.status ==="غیرفعال" ?  <Chip color="danger">{data.status}</Chip>:
        null
        }
     
      </CardFooter>
    </Card>
            </section>
          </>
        ) : (
          <div className="w-full h-40 flex justify-center items-center">
            <Spinner size="lg" />
          </div>
        )}

      
      </div>
    </>
  );
};

export default Page;
