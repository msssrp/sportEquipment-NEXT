import MyBookButton from "./myBookButton"
import getEquipmentByID from "../libs/equipment/getEquipmentByID"
import getUserByID from "../libs/user/getUserByID"
type Borrow = {
  borrowing_id: string,
  user_id: string,
  equipment_id: string,
  borrow_date: string,
  return_date: string,
  days_left: number,
  status: string
}

type BorrowProps = {
  borrow: Borrow
}


const MyBookState: React.FC<BorrowProps> = async ({ borrow }) => {
  const equipment = await getEquipmentByID(borrow.equipment_id)
  const user = await getUserByID(borrow.user_id)
  return (
    <tbody className="bg-white divide-y ">

      <tr className="bg-gray-50 hover:bg-gray-100 text-gray-700" >
        <td className="px-4 py-3">
          <div className="flex items-center text-sm">
            <div>
              <p className="font-semibold">{borrow.borrowing_id}</p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-sm">{user?.f_name} {user?.l_name}</td>
        <td className="px-4 py-3 text-sm">{equipment.result?.name}</td>
        <td className="px-4 py-3 text-sm">{borrow.borrow_date}</td>
        <td className="px-4 py-3 text-sm">{borrow.return_date}</td>
        <td className="px-4 py-3 text-sm text-center">{borrow.days_left}</td>
        <td className={`px-4 py-3 text-sm inline-block rounded-full font-semibold ${borrow.status === "pending" ? "text-orange-500" : borrow.status === 'In use' ? "text-red-500" : "text-green-500"}`}>
          {borrow.status === "pending" ? "pending 😪" : borrow.status === "In use" ? "In use 🏃" : "Approve ✅"}
        </td>
        <td className="px-4 py-3 text-sm">
          <MyBookButton borrowingID={borrow.borrowing_id} equipmentID={borrow.equipment_id} />
        </td>
      </tr>


    </tbody>
  )
}

export default MyBookState
