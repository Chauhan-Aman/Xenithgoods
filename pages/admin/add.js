import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Combobox } from '@headlessui/react'
import Sidebar from './Admincomponents/Sidebar'

import Product from "../../models/Product"
import mongoose from 'mongoose'

import { useRouter } from 'next/router'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Add = ({ slugs, isAdmin }) => {

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [desc, setDesc] = useState('')
  const [img, setImg] = useState('')
  const [category, setCategory] = useState('')
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [price, setPrice] = useState()
  const [availableQty, setAvailableQty] = useState()
  const [imgupload, setImgupload] = useState()

  const [selectedSlug, setSelectedSlug] = useState('')
  const [query, setQuery] = useState('')

  const filteredSlug =
    query === ''
      ? slugs
      : slugs.filter((slug) => {
        return slug.toLowerCase().includes(query.toLowerCase())
      })

  const handleChange = async (e) => {

    if (e.target.name === 'title') {
      setTitle(e.target.value)
    }
    else if (e.target.name === 'slug') {
      setQuery(e.target.value)
      setSlug(e.target.value)
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

  const Resetimageurl = () => {
    setImg()
  }

  const router = useRouter()

  // useEffect(() => {
  //   if (!isAdmin) {
  //     router.push('/error')
  //   }
  //   //eslint-disable-next-line
  // }, [])

  const AddProduct = async () => {

    let data = { title, slug, desc, img: img ? img : imgupload, category, size, color, price, availableQty }
    let body = [data];

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    let res = await a.json();
    console.log(res)
    if (res.success) {
      toast.success("SuccessFully Added Product!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      router.push('/admin')
    } else {
      toast.error("Error Adding Product! \n Duplicate Slug", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
          whiteSpace: "pre-line",
        },
      });
    }
  }

  return (
    <>
      {isAdmin ? <div className='flex min-h-max sm:min-h-screen'>
        <Head>
          <title>AddProduct - XenithGoods</title>
          <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
        </Head>
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
        <Sidebar />
        <div className='flex flex-col w-full h-full justify-center items-center overflow-x-hidden'>
          <div className='mx-auto w-full h-full lg:px-10 px-5'>
            <h1 className='font-bold text-3xl my-8 lg:mt-16 text-center text-gray-100 font-mono'>Add Product</h1>
            <div className='flex md:flex-row flex-col mx-auto my-2'>
              <div className='px-2 md:w-1/2 w-full'>
                <div className=" mb-4">
                  <label htmlFor="title" className="leading-7 text-sm text-gray-300">Title</label>
                  <input onChange={handleChange} value={title} type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className='px-2 md:w-1/2 w-full'>
                <div className=" mb-4 ">
                  {/* <label htmlFor="slug" className="leading-7 text-sm text-gray-300">Slug</label>
                  <input onChange={handleChange} value={slug} type="text" id="slug" name="slug" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /> */}
                  <Combobox value={selectedSlug} onChange={setSelectedSlug}>
                    <label htmlFor="slug" className="leading-7 text-sm text-gray-300">Slug</label>
                    <Combobox.Input onChange={handleChange} value={slug} id="slug" name="slug" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete='off' />
                    <Combobox.Options className="h-[40vh] overflow-y-scroll sm:w-[39vw] w-[76vw] absolute z-100 cursor-pointer bg-gray-700 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out">
                      {filteredSlug.map((slug) => (
                        <Combobox.Option className='text-white hover:bg-violet-700 py-1 px-3' key={slug} onClick={() => setSlug(slug)}>
                          {slug}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  </Combobox>
                </div>
              </div>
            </div>
            <div className='px-2 w-full'>
              <div className=" mb-4">
                <label htmlFor="desc" className="leading-7 text-sm text-gray-300">Description</label>
                <textarea onChange={handleChange} value={desc} name='desc' id='desc' cols="30" rows="2" className="w-full max-h-20 overflow-auto resize-none bg-white rounded border border-gray-300 focus:border-pin k-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete='off'></textarea>
              </div>
            </div>
            <div className='flex md:flex-row flex-col mx-auto my-2'>
              <div className='px-2 md:w-1/2 w-full'>
                <div className=" mb-4">
                  <label htmlFor="img" className="leading-7 text-sm text-gray-300">Image Url</label>
                  <input onChange={handleChange} value={img ? img : imgupload} placeholder='Image Url' type="text" id="img" name="img" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete='off' />
                </div>
              </div>
              <div>
                <div className='px-2 w-full'>
                  <div className="md:mt-3 mt-0 md:mb-0 mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="imgupload">Or Upload file</label>
                    <input onClick={Resetimageurl} onChange={handleChange} name='imgupload' className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-200 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="imgupload" type="file" />
                  </div>
                </div>
              </div>
            </div>
            <div className='flex md:flex-row flex-col mx-auto my-2'>
              <div className='px-2 md:w-1/2 w-full'>
                <div className=" mb-4">
                  <label htmlFor="category" className="leading-7 text-sm text-gray-300">Category</label>
                  <input onChange={handleChange} value={category} type="text" id="category" name="category" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className='px-2 md:w-1/2 w-full'>
                <div className=" mb-4">
                  <label htmlFor="size" className="leading-7 text-sm text-gray-300">Size</label>
                  <input onChange={handleChange} value={size} type="text" id="size" name="size" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className='px-2 md:w-1/2 w-full'>
                <div className=" mb-4">
                  <label htmlFor="color" className="leading-7 text-sm text-gray-300">Color</label>
                  <input onChange={handleChange} value={color} type="text" id="color" name="color" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className='px-2 md:w-1/2 w-full'>
                <div className=" mb-4">
                  <label htmlFor="price" className="leading-7 text-sm text-gray-300">Price</label>
                  <input onChange={handleChange} value={price} type="number" id="price" name="price" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className='px-2 md:w-1/2 w-full'>
                <div className=" mb-4">
                  <label htmlFor="availableQty" className="leading-7 text-sm text-gray-300">AvailableQty</label>
                  <input onChange={handleChange} value={availableQty} type="number" id="availableQty" name="availableQty" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
            </div>
            <button onClick={AddProduct} className="disabled:bg-indigo-400 w-fit mx-auto justify-center items-center flex mt-8 mb-4 text-white bg-indigo-600 border-2 border-gray-500 py-2 px-2 focus:outline-none hover:bg-indigo-500 rounded text-sm">Add Product</button>
          </div>
        </div>
      </div> : <div className='md:min-h-screen min-h-[80vh] flex justify-center items-center bg-gray-900'>
        <main class="grid place-items-center px-6 py-24 sm:py-32 lg:px-8">
          <div class="text-center">
            <p class="text-4xl font-semibold text-gray-50">404</p>
            <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-100 sm:text-5xl">Page not found</h1>
            <p class="mt-6 text-base leading-7 text-gray-100">Sorry, we couldn’t find the page you’re looking for.</p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
              <Link href={'/'} class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</Link>
            </div>
          </div>
        </main>
      </div>}
    </>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }

  let products = await Product.find({}, 'slug')

  const slugs = products.map(product => product.slug);

  return {
    props: { slugs: slugs },
  }
}

export default Add