/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { Inter } from 'next/font/google'
import Product from "../models/Product"
import mongoose from 'mongoose'

const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), { ssr: false });
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ hoodies, tshirts, stickers, mugs }) {
  return (
    <>
      <Head>
        <title>XenithGoods - Elevate Your Shopping Experience</title>
        <meta name="description" content="XenithGoods - Elevate Your Shopping Experience" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <section className="text-gray-400 bg-gray-900 body-font container w-[76vw] mx-auto">
        <div className="container px-5 py-12 md:py-24 mx-auto flex flex-wrap">
          <div className="flex w-full mb-20 flex-wrap flex-col">
            <p className="sm:text-5xl font-medium title-font lg:w-1/3 lg:mb-0 mb-4 text-center m-auto text-3xl text-indigo-600">XenithGoods</p>
            <p className='text-xl text-white mx-auto mt-5 text-center'>Elevate Your Shopping Experience with XenithGoods</p>
            <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-center mt-5 text-gray-50 text-sm">Welcome to XenithGoods, your gateway to a world where innovation, quality, and style converge seamlessly. We believe that shopping is more than a transaction; it&apos;s an experience that should transcend the ordinary. At XenithGoods, we curate a selection of goods that embody the pinnacle of excellence, catering to individuals who seek not just products, but a lifestyle elevated by sophistication and innovation.</p>
          </div>
          <div className="flex flex-wrap md:-m-2 -m-1">
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-1/2">
                <div className="w-full object-cover h-full object-center block">
                  <VideoPlayer width={270} height={200} url={1} />
                </div>
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <VideoPlayer width={270} height={200} url={2} />
              </div>
              <div className="md:p-2 p-1 w-full">
                <VideoPlayer width={560} height={300} url={3} />
              </div>
            </div>
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-full">
                <VideoPlayer width={560} height={300} url={4} />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <VideoPlayer width={270} height={200} url={5} />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <VideoPlayer width={270} height={200} url={6} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 pb-20 mx-auto w-[93vw]">
          <Link href={'/tshirts'}><h1 className='text-white pb-10 sm:pl-4 pl-2 text-lg sm:text-2xl'>Checkout Trending Tshirts &rarr;</h1></Link>
          <div className='flex flex-wrap'>
            {Object.keys(tshirts).map((item, index) => (
              index < 5 && (
                <div key={tshirts[item]._id} className="flex flex-wrap -m-4 mb-3 mx-auto shadow-xl">
                  <div className="p-4 mx-0 w-full">
                    <Link passHref={true} href={`/product/${tshirts[item].slug}`} className="block relative h-50 w-60 rounded overflow-hidden">
                      <img alt="ecommerce" className="object-cover object-center w-72 h-80 block" src={tshirts[item].img} />
                    </Link>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">TSHIRT</h3>
                      <h2 className="text-white title-font text-lg font-medium">{tshirts[item].title}</h2>
                      <p className="mt-1">₹{tshirts[item].price}</p>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </section >

      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 pb-20 mx-auto w-[93vw]">
          <Link href={'/hoodies'}><h1 className='text-white pb-10 sm:pl-4 pl-2 text-lg sm:text-2xl'>Checkout Trending Hoodies &rarr;</h1></Link>
          <div className='flex flex-wrap'>
            {Object.keys(hoodies).map((item, index) => (
              index < 5 && (
                <div key={hoodies[item]._id} className="flex flex-wrap -m-4  mb-3 mx-auto shadow-xl">
                  <div className=" p-2 mx-0 w-full">
                    <Link passHref={true} href={`/product/${hoodies[item].slug}`} className="block relative h-50 w-64 rounded overflow-hidden">
                      <img alt="ecommerce" className="object-fill object-center w-76 h-80 block" src={hoodies[item].img} />
                    </Link>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">HOODIE</h3>
                      <h2 className="text-white title-font text-lg font-medium">{hoodies[item].title}</h2>
                      <p className="mt-1">₹{hoodies[item].price}</p>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </section >

      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 pb-20 mx-auto w-[93vw]">
          <Link href={'/stickers'}><h1 className='text-white pb-10 sm:pl-4 pl-2 text-lg sm:text-2xl mb-5'>Checkout Trending Stickers &rarr;</h1></Link>
          <div className="flex flex-wrap -m-4">
          {Object.keys(stickers).map((item, index) => (
              index < 5 && (
                <div key={stickers[item]._id} className="flex flex-wrap -m-4  mb-3 mx-auto shadow-xl">
                  <div className=" p-2 mx-0 w-full">
                    <Link passHref={true} href={`/product/${stickers[item].slug}`} className="block relative h-50 w-64 rounded overflow-hidden">
                      <img alt="ecommerce" className="object-fill object-center w-72 h-80 block" src={stickers[item].img} />
                    </Link>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">STICKER</h3>
                      <h2 className="text-white title-font text-lg font-medium">{stickers[item].title}</h2>
                      <p className="mt-1">₹{stickers[item].price}</p>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </section >

      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 pb-20 mx-auto w-[93vw]">
          <Link href={'/mugs'}><h1 className='text-white pb-10 sm:pl-4 pl-2 text-lg sm:text-2xl'>Checkout Trending Mugs &rarr;</h1></Link>
          <div className="flex flex-wrap -m-4">
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/420x260" />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                <h2 className="text-white title-font text-lg font-medium">The Catalyzer</h2>
                <p className="mt-1">$16.00</p>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let tshirts = await Product.find({ category: 'tshirt' })
  let hoodies = await Product.find({ category: 'hoodies' })
  let stickers = await Product.find({ category: 'sticker' })
  let mugs = await Product.find({ category: 'mug' })

  return {
    props: {
      tshirts: JSON.parse(JSON.stringify(tshirts)),
      hoodies: JSON.parse(JSON.stringify(hoodies)),
      stickers: JSON.parse(JSON.stringify(stickers)),
      mugs: JSON.parse(JSON.stringify(mugs))
    },
  }
}