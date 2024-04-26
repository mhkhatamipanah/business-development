import connectDB from "@/configs/db";
import { NextResponse } from "next/server";
import User from "@/models/user";

export async function DELETE(req, { params }) {
  try {
    connectDB();
    const id = params.id;

    const updateUser = await User.findOneAndDelete({ id_user: id }).catch(
      (err) => {
        console.log(err);
      }
    );

    if (updateUser) {
      return NextResponse.json({ message: "کاربر حذف شد" });
    } else {
      return NextResponse.json({ message: "خطا !! حذف نشد" }, { status: 400 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "ارور ناشناخته" }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    connectDB();
    const id = params.id;

    const user = await User.findOne({ id_user: id } , "-password -__v -updatedAt -createdAt").catch((err) => {
      console.log(err);
    });
    if (!user) {
      return NextResponse.json({ message: " این کاربر وجود ندارد" } , {status:401});
    }

    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "ارور ناشناخته" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
    try {
      connectDB();
  
      // Validate Data
      const body = await req.json();
      const {id_user, username, phone ,team , status} = body;

    //   if (!username.trim() || username.trim().length < 4) {
    //     return NextResponse.json(
    //       { message: " نام را به درستی وارد کنید" },
    //       { status: 400 }
    //     );
    //   }
    //   if (!phone.trim() || phone.trim().length !== 11) {
    //     return NextResponse.json(
    //       { message: " شماره را به درستی وارد کنید" },
    //       { status: 400 }
    //     );
    //   }
    //   if (!isInteger(phone.trim())) {
    //     return NextResponse.json(
    //       { message: " شماره باید عدد باشد" },
    //       { status: 400 }
    //     );
    //   }
      // if (!role.trim()) {
      //   return NextResponse.json(
      //     { message: " نقش کاربر را به درستی وارد کنید" },
      //     { status: 400 }
      //   );
      // }
  
    //   const id = params.id;
  
      const updateUser = await User.findOneAndUpdate(
        { id_user },
        { username, phone, team , status
         }
      ).catch((err) => {
        console.log(err);
      });
  
      if (updateUser) {
        return NextResponse.json({ message: "ادیت شد" , path:"/dashboard/users/" }, { status: 200 });
      } else {
        return NextResponse.json({ message: "خطا !! ادیت نشد" }, { status: 409 });
      }
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "ارور ناشناخته" }, { status: 500 });
    }
  }