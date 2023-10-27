import Card from "@/app/card"
import Menu from "./menuState"
import getEquipments from "./libs/equipment/getEquipments"
import { Suspense } from "react"
import Loading from "./loading"
export default async function Page() {
  const equipments = await getEquipments()

  return (
    <>
      <Menu />
      <div className='h-full w-full'>
        <div className="flex flex-wrap items-center justify-center mt-10">
          {equipments.map((equipment) => (<>
            <Suspense fallback={<Loading />}>
              <Card key={equipment.equipment.equipment_id} data={equipment} />
            </Suspense>
          </>
          ))}
        </div>
      </div>
    </>
  )
}

