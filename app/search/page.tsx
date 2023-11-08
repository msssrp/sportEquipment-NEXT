import Menu from "../menuState"
import Card from "../card"
export const dynamic = "force-dynamic"
import getEquipmentBySearch from "../libs/equipment/getEquipmentBySearch"

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const result = await getEquipmentBySearch(searchParams.q)

  return (
    <>
      <Menu />
      <div className='h-full w-full'>
        <div className="flex flex-wrap items-center justify-center mt-10">
          {result.equipment ? result.equipment.map((equipment) => (
            <Card key={equipment.equipment.equipment_id} data={equipment} />
          )) :
            <div className="h-[500px] w-full flex items-center justify-center">{result.error}</div>
          }
        </div>
      </div>
    </>
  )
}
