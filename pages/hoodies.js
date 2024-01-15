import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Product from "../models/Product"
import mongoose from 'mongoose'

const Hoodies = ({ products }) => {
  return (
    <div>
       <Head>
        <title>Hoodies - XenithGoods</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <section className="min-h-screen text-gray-600 body-font">
        <div className="container px-5 md:py-24 py-12 mx-auto">
          <div className="flex justify-center flex-wrap -m-4  mx-5 text-center">
            {Object.keys(products).length === 0 && <p className='text-gray-50'>Sorry all the Hoodies are currently out of stock. New stock coming soon. Stay Tuned!</p>}
            {Object.keys(products).map((item) => (
              <div key={products[item]._id} className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-xl m-5">
                <Link passHref={true} href={`/product/${products[item].slug}`}>
                  <div className="block relative rounded overflow-hidden">
                    <img alt="ecommerce" className="m-auto h-[30vh] md:h-[36vh] block" src={products[item].img} />
                  </div>
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-400 text-xs tracking-widest title-font mb-1">Hoodies</h3>
                    <h2 className="text-gray-50 title-font text-lg font-medium">{products[item].title}</h2>
                    <p className="mt-2 mb-4 text-gray-100">₹{products[item].price}</p>
                    <div className="mt-1">
                      {products[item].size.includes('S') && <span className='border border-gray-300 px-2 py-1 mx-1 text-gray-400'>S</span>}
                      {products[item].size.includes('M') && <span className='border border-gray-300 px-2 py-1 mx-1 text-gray-400'>M</span>}
                      {products[item].size.includes('L') && <span className='border border-gray-300 px-2 py-1 mx-1 text-gray-400'>L</span>}
                      {products[item].size.includes('XL') && <span className='border border-gray-300 px-2 py-1 mx-1 text-gray-400'>XL</span>}
                      {products[item].size.includes('XXL') && <span className='border border-gray-300 px-2 py-1 mx-1 text-gray-400'>XXL</span>}
                    </div>
                    <div className='mt-5'>
                      {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('white') && <button className="border-2 border-gray-900 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('purple') && <button className="border-2 border-gray-300 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Product.find({ category: 'hoodies' })

  let hoods = {}
  for (let item of products) {
    if (item.title in hoods) {
      if (!hoods[item.title].color.includes(item.color) && item.availableQty > 0) {
        hoods[item.title].color.push(item.color)
      }
      if (!hoods[item.title].size.includes(item.size) && item.availableQty > 0) {
        hoods[item.title].size.push(item.size)
      }
    }
    else {
      hoods[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        hoods[item.title].color = [item.color]
        hoods[item.title].size = [item.size]
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(hoods)) },
  }
}

export default Hoodies