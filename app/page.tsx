import Card from "@/app/card"
import Menu from "./menuState"
import getEquipments from "./libs/equipment/getEquipments"
export default async function Page() {
  const equipments = await getEquipments()

  return (
    <>
      <Menu />
      <div className='h-full w-full'>
        <div className="flex flex-wrap items-center justify-center mt-10">
          {equipments.map((equipment) => (
            <Card key={equipment.equipment.equipment_id} data={equipment} />
          ))}
        </div>
      </div>
    </>
  )
}
