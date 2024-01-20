import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Product from "../../models/Product"
import mongoose from 'mongoose'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Error from '../error'

import Head from 'next/head'

const Slug = ({ addToCart, buyNow, product, variants, error }) => {
    const router = useRouter()
    const { slug } = router.query

    const [pin, setPin] = useState()
    const [service, setService] = useState(null)

    const [color, setColor] = useState()
    const [size, setSize] = useState()

    useEffect(() => {
        if (!error) {
            setColor(product.color)
            setSize(product.size)
        }
    }, [router.query])


    const checkServiceability = async () => {
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
        let pinJson = await pins.json()
        if (Object.keys(pinJson).includes(pin)) {
            setService(true)
            toast.success('Your Pincode is serviceable!', {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }
        else {
            setService(false)
            toast.error('Sorry, Pincode Not serviceable!', {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }
    }

    const onChangePin = (e) => {
        setPin(e.target.value)
    }

    const refreshVariant = (newSize, newColor) => {
        let url = `${variants[newColor][newSize]['slug']}`
        router.push(url)
    }

    if (error == 404) {
        return <>
            <div className='bg-white text-black'>
                <Error />
            </div>
        </>
    }

    return (
        <>
            <section className="min-h-screen text-gray-600 body-font overflow-hidden">
                <Head>
                    <title>{product.title} - XenithGoods</title>
                    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
                </Head>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />

                <div className="container px-5 py-16 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto px-24 object-contain object-center rounded" src={product.img} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm mb-4 title-font text-gray-300 tracking-widest">XENITHGOODS</h2>
                            <h1 className="text-gray-50 text-3xl title-font font-medium mb-3">{product.title} ({product.size}/{product.color})</h1>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <span className="text-gray-400 ml-3">4 Reviews</span>
                                </span>
                            </div>
                            <p className="leading-relaxed text-gray-100">{product.desc}</p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div className="flex">
                                    <span className="mr-3 text-gray-50">Color</span>
                                    {Object.keys(variants).includes('white') && Object.keys(variants['white']).includes(size) && <button onClick={(e) => { refreshVariant(size, 'white') }} className={`border-2 bg-white rounded-full w-6 h-6 focus:outline-none ${color === 'white' ? 'border-black' : 'border-gray-300'}`}></button>}
                                    {Object.keys(variants).includes('red') && Object.keys(variants['red']).includes(size) && <button onClick={(e) => { refreshVariant(size, 'red') }} className={`border-2 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                                    {Object.keys(variants).includes('blue') && Object.keys(variants['blue']).includes(size) && <button onClick={(e) => { refreshVariant(size, 'blue') }} className={`border-2 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                                    {Object.keys(variants).includes('black') && Object.keys(variants['black']).includes(size) && <button onClick={(e) => { refreshVariant(size, 'black') }} className={`border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none`}></button>}
                                    {Object.keys(variants).includes('green') && Object.keys(variants['green']).includes(size) && <button onClick={(e) => { refreshVariant(size, 'green') }} className={`border-2 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                                    {Object.keys(variants).includes('purple') && Object.keys(variants['purple']).includes(size) && <button onClick={(e) => { refreshVariant(size, 'purple') }} className={`border-2 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                                    {Object.keys(variants).includes('yellow') && Object.keys(variants['yellow']).includes(size) && <button onClick={(e) => { refreshVariant(size, 'yellow') }} className={`border-2 ml-1 bg-yellow-400 rounded-full w-6 h-6 focus:outline-none`}></button>}
                                    {Object.keys(variants).includes('orange') && Object.keys(variants['orange']).includes(size) && <button onClick={(e) => { refreshVariant(size, 'orange') }} className={`border-2 ml-1 bg-orange-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                                    {Object.keys(variants).includes('gray') && Object.keys(variants['gray']).includes(size) && <button onClick={(e) => { refreshVariant(size, 'gray') }} className={`border-2 ml-1 bg-gray-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
                                    {Object.keys(variants).includes('pink') && Object.keys(variants['pink']).includes(size) && <button onClick={(e) => { refreshVariant(size, 'pink') }} className={`border-2 ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
                                </div>
                                <div className="flex ml-6 items-center">
                                    <span className="mr-3 text-gray-50">Size</span>
                                    <div className="relative">
                                        <select value={size} onChange={(e) => { refreshVariant(e.target.value, color) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                                            {color && Object.keys(variants[color]).includes('S') && <option value={'S'}>S</option>}
                                            {color && Object.keys(variants[color]).includes('M') && <option value={'M'}>M</option>}
                                            {color && Object.keys(variants[color]).includes('L') && <option value={'L'}>L</option>}
                                            {color && Object.keys(variants[color]).includes('XL') && <option value={'XL'}>XL</option>}
                                            {color && Object.keys(variants[color]).includes('XXL') && <option value={'XXL'}>XXL</option>}
                                        </select>
                                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                {product.availableQty > 0 && <span className="title-font font-medium text-2xl text-gray-50">₹{product.price}</span>}
                                {product.availableQty <= 0 && <span className="title-font font-medium text-2xl text-gray-100">Out of Stock!</span>}
                                <button disabled={product.availableQty <= 0} onClick={() => { buyNow(slug, 1, product.price, product.title, size, color, product.img, product.slug) }} className="flex ml-8 text-white disabled:bg-indigo-300 bg-indigo-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-indigo-600 rounded">Buy Now</button>
                                <button disabled={product.availableQty <= 0} onClick={() => { addToCart(slug, 1, product.price, product.title, size, color, product.img, product.slug) }} className="flex ml-4 text-white disabled:bg-indigo-300 bg-indigo-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-indigo-600 rounded">Add to Cart</button>
                            </div>
                            <div className='pin mt-6 flex space-x-2 text-sm'>
                                <input onChange={onChangePin} className='px-2 border-2 border-grey-400 rounded-md text-black' type='text' placeholder='Enter your Pincode' />
                                <button onClick={checkServiceability} className='flex ml-4 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded'>Check</button>
                            </div>
                            {(!service && service !== null) && <div className='text-red-700 text-sm mt-3'>Sorry! We do not deliver to this pincode yet</div>}
                            {(service && service !== null) && <div className='text-green-700 text-sm mt-3'>Yay! This pincode is serviceable</div>}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}


export async function getServerSideProps(context) {
    let error = null;

    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let product = await Product.findOne({ slug: context.query.slug })
    if (product == null) {
        return {
            props: { error: 404 },
        }
    }
    let variants = await Product.find({ title: product.title, category: product.category })
    let colorSizeSlug = {}

    for (let item of variants) {
        if (Object.keys(colorSizeSlug).includes(item.color)) {
            colorSizeSlug[item.color][item.size] = { slug: item.slug }
        }
        else {
            colorSizeSlug[item.color] = {}
            colorSizeSlug[item.color][item.size] = { slug: item.slug }
        }
    }

    return {
        props: { error: error, product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) },
    }
}

export default Slug