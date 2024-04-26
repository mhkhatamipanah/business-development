"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Page() {


  return (
    <>
    <div className="flex justify-center items-center w-full h-[500px]">
    <Button
 style={{padding:"30px"}}
     color="primary"
    >

    <Link className="font-iranSans_2 text-2xl" href="./dashboard/users">داشبورد</Link>
    </Button>
    </div>
    </>
  );
}
