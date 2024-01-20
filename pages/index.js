/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link';
import { Inter } from 'next/font/google'
import Product from "../models/Product"
import mongoose from 'mongoose'

const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), { ssr: false });
import dynamic from 'next/dynamic';
import HomeCard from '@/components/HomeCard';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ mens, womens, hoodies, sneakers }) {
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
            <p className="sm:text-6xl font-medium title-font lg:w-1/3 lg:mb-0 mb-4 text-center m-auto text-3xl text-indigo-600">XenithGoods</p>
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

      <HomeCard title='MEN Wears' products={mens} />
      <HomeCard title='WOMEN Wears' products={womens} />
      <HomeCard title='HOODIES' products={hoodies} />
      {/* <HomeCard title='SNEAKERS' products={sneakers} /> */}

    </>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let mens = await Product.find({ category: 'men' })
  let womens = await Product.find({ category: 'women' })
  let hoodies = await Product.find({ category: 'hoodie' })
  let sneakers = await Product.find({ category: 'sneaker' })

  return {
    props: {
      mens: JSON.parse(JSON.stringify(mens)),
      womens: JSON.parse(JSON.stringify(womens)),
      hoodies: JSON.parse(JSON.stringify(hoodies)),
      sneakers: JSON.parse(JSON.stringify(sneakers))
    },
  }
}