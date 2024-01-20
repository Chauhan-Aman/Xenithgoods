import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ModalContainer = ({ func, product, isOpen, onOpenChange }) => {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('')
    const [img, setImg] = useState('')
    const [category, setCategory] = useState('')
    const [size, setSize] = useState('')
    const [color, setColor] = useState('')
    const [price, setPrice] = useState()
    const [availableQty, setAvailableQty] = useState()
    const [imgupload, setImgupload] = useState()

    useEffect(() => {
        setTitle(product?.title || '');
        setDesc(product?.desc || '');
        setImg(product?.img || '');
        setCategory(product?.category || '');
        setSize(product?.size || '');
        setColor(product?.color || '');
        setPrice(product?.price || '');
        setAvailableQty(product?.availableQty || '');
    }, [product]);

    const Resetimageurl = () => {
        setImg()
    }

    const handleChange = async (e) => {

        if (e.target.name === 'title') {
            setTitle(e.target.value)
        }
        else if (e.target.name === 'desc') {
            setDesc(e.target.value)
        }
        else if (e.target.name === 'img') {
            setImg(e.target.value)
        }
        else if (e.target.name === 'category') {
            setCategory(e.target.value)
        }
        else if (e.target.name === 'size') {
            setSize(e.target.value)
        }
        else if (e.target.name === 'color') {
            setColor(e.target.value)
        }
        else if (e.target.name === 'price') {
            setPrice(e.target.value)
        }
        else if (e.target.name === 'availableQty') {
            setAvailableQty(e.target.value)
        }
        else if (e.target.name === 'imgupload') {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImgupload(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }
    }

    const UpdateProduct = async () => {

        let data = { _id: product._id, title, desc, img: img ? img : imgupload, category, size, color, price, availableQty }
        let body = [data];

        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateproducts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        let res = await a.json();
        console.log(res)
        if (res.success) {
            toast.success("SuccessFully Updated Product!", {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.error("Some Error Occurred", {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const DeleteProduct = async () => {

        let data = { _id: product._id }
        let body = [data];

        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/deleteproduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        let res = await a.json();
        console.log(res)
        if (res.success) {
            toast.success("SuccessFully Deleted Product!", {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.error("Some Error Occurred", {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    return (
        <>
            <ToastContainer
                position="top-left"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='bg-violet-300'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{func} Product</ModalHeader>
                            {func == 'Update' && <>
                                <ModalBody>
                                    <div className='flex md:flex-row flex-col my-0'>
                                        <div className='px-2 w-full'>
                                            <div className=" mb-0">
                                                <label htmlFor="title" className="leading-7 text-sm text-gray-950">Title</label>
                                                <input onChange={handleChange} value={title} type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='px-2 w-full'>
                                        <div className=" mb-0">
                                            <label htmlFor="desc" className="leading-7 text-sm text-gray-950">Description</label>
                                            <textarea onChange={handleChange} value={desc} name='desc' id='desc' cols="30" rows="2" className="w-full max-h-20 overflow-auto resize-none bg-white rounded border border-gray-300 focus:border-pin k-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete='off'></textarea>
                                        </div>
                                    </div>
                                    <div className='flex flex-col my-0'>
                                        <div className='px-2 w-full'>
                                            <div className=" mb-0">
                                                <label htmlFor="img" className="leading-7 text-sm text-gray-950">Image Url</label>
                                                <input onChange={handleChange} value={img ? img : imgupload} placeholder='Image Url' type="text" id="img" name="img" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete='off' />
                                            </div>
                                        </div>
                                        <div>
                                            <div className='px-2 w-full'>
                                                <div className="md:mt-3 mt-0 md:mb-0 mb-0">
                                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="imgupload">Or Upload file</label>
                                                    <input onClick={Resetimageurl} onChange={handleChange} name='imgupload' className="p-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-200 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="imgupload" type="file" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex md:flex-row flex-col mx-auto my-0'>
                                        <div className='px-2 md:w-1/2 w-full'>
                                            <div className=" mb-0">
                                                <label htmlFor="size" className="leading-7 text-sm text-gray-950">Size</label>
                                                <input onChange={handleChange} value={size} type="text" id="size" name="size" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>
                                        <div className='px-2 md:w-1/2 w-full'>
                                            <div className=" mb-0">
                                                <label htmlFor="color" className="leading-7 text-sm text-gray-950">Color</label>
                                                <input onChange={handleChange} value={color} type="text" id="color" name="color" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex md:flex-row flex-col mx-auto my-0'>
                                        <div className='px-2 md:w-1/2 w-full'>
                                            <div className=" mb-0">
                                                <label htmlFor="price" className="leading-7 text-sm text-gray-950">Price</label>
                                                <input onChange={handleChange} value={price} type="number" id="price" name="price" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>
                                        <div className='px-2 md:w-1/2 w-full'>
                                            <div className=" mb-0">
                                                <label htmlFor="availableQty" className="leading-7 text-sm text-gray-950">AvailableQty</label>
                                                <input onChange={handleChange} value={availableQty} type="number" id="availableQty" name="availableQty" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onPress={onClose}>Cancel</Button>
                                    <Button className='bg-green-600' onPress={() => {
                                        UpdateProduct();
                                        setTimeout(() => {
                                            onClose()
                                        }, 2000);
                                    }}>Update</Button>
                                </ModalFooter>
                            </>}
                            {func == 'Delete' && <>
                                <ModalBody>
                                    <p>Are you sure you want to delete the product ?</p>
                                    <p className="text-lg font-semibold">&quot;{product.title}&quot;</p>
                                    <p className="mt-2 text-red-500 font-semibold">This action cannot be undone.</p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="warning" variant="solid" onPress={onClose}>
                                        Cancel
                                    </Button>
                                    <Button color="danger" onPress={() => {
                                        DeleteProduct();
                                        setTimeout(() => {
                                            onClose()
                                        }, 2000);
                                    }}>Delete</Button>
                                </ModalFooter>
                            </>}
                        </>
                    )}
                </ModalContent >
            </Modal>
        </>
    );
}

export default ModalContainer
