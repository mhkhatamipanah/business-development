import connectDB from "@/configs/db";
import { NextResponse } from "next/server";
import User from "@/models/user";
const bcrypt = require("bcrypt");

export async function POST(req, res) {
  try {
    connectDB();

    // Validate Data
    const body = await req.json();
    const { username, phone, role, team, status  , email} = body;
    // if (!name || name.length < 4) {
    //   return NextResponse.json(
    //     { message: " نام را به درستی وارد کنید" },
    //     { status: 400 }
    //   );
    // }
    // if (!phone || phone.length !== 11) {
    //   return NextResponse.json(
    //     { message: " شماره را به درستی وارد کنید" },
    //     { status: 400 }
    //   );
    // }
    // if (!isInteger(phone)) {
    //   return NextResponse.json(
    //     { message: " شماره باید عدد باشد" },
    //     { status: 400 }
    //   );
    // }
    // if (!role) {
    //   return NextResponse.json(
    //     { message: " نقش کاربر را به درستی وارد کنید" },
    //     { status: 400 }
    //   );
    // }
    // if (role === "agent" && !address) {
    //   return NextResponse.json(
    //     { message: "آدرس را وارد کنید" },
    //     { status: 400 }
    //   );
    // }

    // Check Phone in Users
    const checkPhone = await User.findOne({ phone: body.phone }).catch(
      (err) => {
        console.log(err);
      }
    );

    if (checkPhone) {
      return NextResponse.json(
        { message: "کاربر قبلا ساخته شده" },
        { status: 409 }
      );
    }

    const hashPassword = await bcrypt.hash(body.password, 10);

    // Create Data
    //   const timeAndDate = time_date();

    const user = await User.create({
      username,
      phone,
      role,
      email,
      team,
      status,
      role,
      password: hashPassword,
    //   time: timeAndDate.output,
    //   createdDate: timeAndDate.dateJalali,
    });
    if (user) {
      return NextResponse.json(
        { message: "کابر با موفقیت ساخته شد" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "کاربر  ساخته نشد" },
        { status: 400 }
      );
    }
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: "ارور ناشناخته" }, { status: 500 });
  }
}




export async function GET(req, res) {
  try{
    connectDB();
    const { searchParams } = new URL(req.url);
  
    let status = searchParams.get("status");
    
    let arrayPersianStatus = []
    let arrayStatus = status.split(",")
    arrayStatus.map((e)=>{
      if (e =="active") arrayPersianStatus.push("فعال")
      if (e =="inactive") arrayPersianStatus.push("غیرفعال")
      if (e =="rest") arrayPersianStatus.push("استراحت")
    })

    let search = searchParams.get("search");

    let regesSearch = `.*${search}.*`
    let query = search ?
    { status: { "$in": arrayPersianStatus }  , $or: [
      { username: { $regex: regesSearch , $options: 'i' } },
      { email: { $regex: regesSearch, $options: 'i'  } },
      { phone: { $regex: regesSearch, $options: 'i'  } }

    ] }
    : { status: { "$in": arrayPersianStatus } }

    let count = searchParams.get("count");
  
    if (count) {
      let countData = await User.find(query)
        .count()
        .catch((err) => {
          console.log(err);
        });
  
      return NextResponse.json({ message:countData });
    }
  
    let sortingBy = searchParams.get("sortBy");
    let sortWay = searchParams.get("sortWay");

    let sortBy = {};
    if (sortingBy && sortWay) {
      sortBy[sortingBy] = sortWay; // Ascending order
    }
   
    const perPage = searchParams.get("perPage");
    const page = searchParams.get("page");
  
  
    const user = await  User.find(query).
    collation({locale:"fa"} , "-password")
    .sort( sortingBy ? sortBy : {updatedAt:-1} )
    .limit(perPage ? perPage : 5 )
    .skip((perPage && page) ? (perPage *( page - 1)) : 0 )
     
      .catch((err) => {
        console.log(err);
      });


 
  
    return NextResponse.json(user);








  }catch(err){
    console.log(err)
    return NextResponse.json({ message: "ارور ناشناخته" }, { status: 500 });
  }

}
