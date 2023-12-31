"use client"
import React, { useState } from "react"
import addEquipment from "../libs/equipment/addEquipment"
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

const AddForm = () => {

  const [newEquipment, setNewEquipment] = useState<Equipment>({
    name: "",
    category: "",
    description: "",
    quantity_available: "",
    condition: "",
    image_url: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errorText, setErrorText] = useState("")
  const router = useRouter()
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEquipment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { logout } = useAuthContext()

  const handleOnsubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    if (!newEquipment.quantity_available || !newEquipment.name || !newEquipment.condition || !newEquipment.description || !newEquipment.category || !newEquipment.image_url) {
      setIsLoading(false)
      return setErrorText("Please input all the fields")
    }
    if (newEquipment.description.length > 154) {
      setIsLoading(false)
      return setErrorText("Description must be 154 characters or less")
    }
    try {
      const resp = await addEquipment(newEquipment)
      if (resp.result === "added") {
        router.push("/")
        return
      } else if (resp.error === "token is expired") {
        setErrorText("session is out of date please log in again")
        setTimeout(() => {
          logout()
          document.cookie = "token=; Max-Age=0;"
          document.cookie = "refresh_token=; Max-Age=0;"
          router.push("/signIn")
          setIsLoading(false)
        }, 3500)
      } else if (resp.error) {
        setErrorText(resp.error)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <form className="py-6 px-9" onSubmit={handleOnsubmit}>
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
          onChange={handleOnchange}
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="available"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          available
        </label>
        <input
          type="text"
          name="quantity_available"
          id="quantity_available"
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
          onChange={handleOnchange}
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div>
        {errorText && <div className='text-red-500'>{errorText}</div>}
        <button type='submit' className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none mt-[25px]">
          {isLoading ? <div className='animate-spin w-full flex items-center justify-center'>🍎</div> :
            <p>Create New Equipment</p>}
        </button>
      </div>
    </form>
  )
}

export default AddForm
