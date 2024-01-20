import React from 'react'
import Link from 'next/link';
import Head from 'next/head';
import Sidebar from './Admincomponents/Sidebar';

const Index = ({ isAdmin }) => {

  return (
    <>
      {isAdmin ? <>
        <div className='flex min-h-screen'>
          <Head>
            <title>Admin - XenithGoods</title>
            <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
          </Head>
          <Sidebar />
          <div className="flex w-full mb-20 justify-center items-center flex-wrap flex-col px-10">
            <p className="sm:text-7xl font-medium title-font lg:mb-0 mb-4 text-center text-5xl text-indigo-600">XenithGoods</p>
            <p className='text-xl text-white mx-auto mt-5 text-center'>Elevate Your Shopping Experience with XenithGoods</p>
            <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-center mt-5 text-gray-50 text-sm">Welcome to XenithGoods, your gateway to a world where innovation, quality, and style converge seamlessly. We believe that shopping is more than a transaction; it&apos;s an experience that should transcend the ordinary. At XenithGoods, we curate a selection of goods that embody the pinnacle of excellence, catering to individuals who seek not just products, but a lifestyle elevated by sophistication and innovation.</p>
          </div>
        </div></> : <div className='md:min-h-screen min-h-[80vh] flex justify-center items-center bg-gray-900'>
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

export default Index