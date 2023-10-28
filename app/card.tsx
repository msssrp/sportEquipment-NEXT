import getUserByID from "@/app/libs/user/getUserByID";
import CardState from "./cardState";
import React from "react";
import dynamic from "next/dynamic";

const CardButton = dynamic(() => import("./cardButton"), { ssr: false })
type Equipment = {
  equipment: {
    name: string,
    category: string,
    description: string,
    quantity_available: string,
    condition: string,
    image_url: string,
    borrowing_id?: string,
    user_id?: string,
    equipment_id?: string,
    borrow_date?: string,
    return_date?: string,
    days_left?: string,
    status?: string
  }
}

const Card: React.FC<{ data: Equipment }> = async ({ data }) => {

  const user = await getUserByID(data.equipment.user_id)

  return (
    <div className="max-w-[410px] max-h-[950px] rounded-lg overflow-hidden shadow-lg sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-8 mr-[45px]">
      <div className='h-[350px] flex justify-center items-center'>
        <div className='h-[300px] w-[280px]'>
          <img className="w-full h-full object-contain" src={`${data.equipment.image_url}`} alt={`${data.equipment.category}`} />
        </div>
      </div>
      <div className="w-full h-[210px] px-6 py-4">
        <div className="font-bold text-xl mb-2">{data.equipment.name}</div>
        <p className="text-gray-700 text-base">
          {data.equipment.description}
        </p>
      </div>
      <div className="px-6 pt-2 pb-2 w-full h-full">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{data.equipment.category}</span>
        <span className={`inline-block ${data.equipment.condition === "new" ? "bg-[#f8e652]" : "bg-[#aa6bce]"} rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}>🧙 {data.equipment.condition}</span>
        <span className={`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold ${data.equipment.quantity_available === "available" ? "bg-green-300" : data.equipment.quantity_available === 'pending' ? "bg-orange-300" : "bg-red-300"} mr-2 mb-2`}>👨‍🍳 {data.equipment.quantity_available}</span>
      </div>

      <div className="px-6 pt-2 pb-2">
        {data.equipment.borrowing_id ?
          <>
            {data.equipment.status === "pending" ? <>
              <p className="inline-block bg-[#ADD8E6] rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2" >Booking by by Mr.{user?.username}</p>
              <p className="inline-block bg-orange-300 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2" >{data.equipment.status} 📖</p></>
              : <><p className="inline-block bg-[#ADD8E6] rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2" >In use by Mr.{user?.username}</p>
                <p className="inline-block bg-[#ADD8E6] rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2" >{data.equipment.days_left} days remain 🕒</p></>}

          </>
          : <CardState equipmentID={data.equipment.equipment_id} />
        }
      </div>

      <CardButton equipmentID={data.equipment.equipment_id} />

    </div>

  )
}


export default Card
