import UpdateForm from "./updateForm"
import { redirect } from "next/navigation"
import getEquipmentByID from "../libs/equipment/getEquipmentByID"
export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const equipmentID = searchParams.id
  if (!equipmentID) {
    redirect("/")
  }
  const equipment = await getEquipmentByID(equipmentID)
  if (!equipment.result) {
    console.log(equipment.result, equipment.error)
    redirect("/")
  }
  return (
    <div className="flex mt-[40px]">
      <main className={`flex-1 "h-full"}`}>
        <div className="flex flex-col justify-center items-center h-full  pt-[50px] pb-[50px]">

          <div className="w-full max-w-[550px] h-full bg-white">
            <UpdateForm id={equipmentID} equipment={equipment.result} />
          </div>
        </div>
      </main >
    </div >
  )
}
