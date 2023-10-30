"use client"
import { useState } from "react"
import updateEquipment from "../libs/equipment/updateEquipment"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/hooks/authContext"
type Equipment = {
  name: string,
  category: string,
  description: string,
  quantity_available: string,
  condition: string,
  image_url: string,
}

type propsData = {
  equipment: Equipment,
  id: string | string[]
}

const UpdateForm: React.FC<propsData> = ({ id, equipment }) => {

  const [newEquipment, setNewEquipment] = useState<Equipment>({
    name: "",
    category: "",
    description: "",
    quantity_available: "",
    condition: "",
    image_url: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEquipment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const router = useRouter()
  const { logout } = useAuthContext()
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const resp = await updateEquipment(id, newEquipment)
    if (resp.result === "updated") {
      router.push("/")
    } else if (resp.error === "token is expired") {
      setError("session is out of date please log in again")
      setTimeout(() => {
        logout()
        document.cookie = "token=; Max-Age=0;"
        document.cookie = "refresh_token=; Max-Age=0;"
        router.push("/signIn")
        setIsLoading(false)
      }, 3500)
    } else if (resp.error) {
      setError(resp.error)
      setIsLoading(false)
    }

  }

  return (
    <form className="py-6 px-9" onSubmit={handleOnSubmit}>
      <div className="mb-5">
        <label
          htmlFor="category"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Equipment name
        </label>
        <input
          type="text"
          name="name"
          id='name'
          placeholder={equipment.name}
          onChange={handleOnchange}
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="category"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Category
        </label>
        <input
          type="text"
          name="category"
          id="category"
          placeholder={equipment.category}
          onChange={handleOnchange}
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="description"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Description (max 154 character)
        </label>
        <input
          type="text"
          name="description"
          id="description"
          placeholder={equipment.description}
          onChange={handleOnchange}
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="condition"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Condition
        </label>
        <input
          type="text"
          name="condition"
          id="condition"
          placeholder={equipment.condition}
          onChange={handleOnchange}
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="imageUrl"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          image url
        </label>
        <input
          type="text"
          name="image_url"
          id="image_url"
          placeholder={equipment.image_url}
          onChange={handleOnchange}
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      {error && <div className='text-red-600 text-center'>{error}</div>}
      <div>
        <button type='submit' className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none mt-[25px]">
          {isLoading ? <div className='animate-spin w-full flex items-center justify-center'>🍎</div> :
            <p>Update Equipment</p>}
        </button>
      </div>
    </form>
  )
}

export default UpdateForm
