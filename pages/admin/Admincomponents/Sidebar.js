import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { FaHome } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoBagCheck,IoList } from "react-icons/io5";

const Sidebar = () => {
    return (
        <div className="sticky top-0 left-0 flex flex-row h-screen">
            <div className="relative column-1 w-[15vw] h-full bg-custom-indigo px-1 xl:px-0 items-center justify-center bg-indigo-950">
                <div className="flex xl:flex-row flex-col items-center justify-center py-4 bg-indigo-900 xl:mb-20 mb-0">
                    <Link href={'/'} className='flex xl:flex-col flex-row justify-center items-center'>
                        <Image src={'/symbol.png'} width={40} height={40} alt='logo' style={{ "filter": "brightness(100)" }} />
                        <p className='text-white ml-2 mt-2 text-xl xl:block hidden'>XenithGoods</p>
                    </Link>
                </div>
                <Link href={'/admin'} className="flex xl:flex-row flex-col justify-start items-center py-4 my-4 hover:bg-indigo-700 hover:cursor-pointer">
                    <div className='w-fit xl:pl-6 '>
                        <FaHome color='white' size={'24px'} />
                    </div>
                    <p className='text-white ml-6 text-lg xl:block hidden'>Dashboard</p>
                </Link>
                <Link href={'/admin/add'} className="flex xl:flex-row flex-col justify-start items-center  py-4 my-4 hover:bg-indigo-700 hover:cursor-pointer">
                    <div className='w-fit xl:pl-6'>
                        <FaPlus color='white' size={'24px'} />
                    </div>
                    <p className='text-white ml-6 text-lg xl:block hidden'>New Product</p>
                </Link>
                <Link href={'/admin/allproducts'} className="flex xl:flex-row flex-col justify-start items-center  py-4 my-4 hover:bg-indigo-700 hover:cursor-pointer">
                    <div className='w-fit xl:pl-6'>
                        <IoList color='white' size={'24px'} />
                    </div>
                    <p className='text-white ml-6 text-lg xl:block hidden'>Product List</p>
                </Link>
                {/* <Link href={'/admin/imageUploader'} className="flex xl:flex-row flex-col justify-start items-center py-4 my-4 hover:bg-indigo-700 hover:cursor-pointer">
                    <div className='w-fit xl:pl-6'>
                        <FiUpload color='white' size={'24px'} />
                    </div>
                    <p className='text-white ml-6 text-lg xl:block hidden'>ImageUploader</p>
                </Link> */}
                <Link href={'/admin/allorders'} className="flex xl:flex-row flex-col justify-start items-center py-4 my-4 hover:bg-indigo-700 hover:cursor-pointer">
                    <div className='w-fit xl:pl-6'>
                        <IoBagCheck color='white' size={'24px'} />
                    </div>
                    <p className='text-white ml-6 text-lg xl:block hidden'>Orders</p>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar