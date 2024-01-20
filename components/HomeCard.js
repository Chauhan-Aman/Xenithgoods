/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

const HomeCard = ({ link, title, products }) => {
    const getUniqueProducts = () => {
        const uniqueProducts = [];
        const titles = [];

        for (const item in products) {
            const product = products[item];
            if (!titles.includes(product.title) && uniqueProducts.length < 5) {
                titles.push(product.title);
                uniqueProducts.push(product);
            }
        }

        return uniqueProducts;
    };

    const uniqueProducts = getUniqueProducts();

    return (
        <section className="text-gray-400 bg-gray-900 body-font">
            <div className="container px-5 pb-20 mx-auto w-[93vw]">
                <Link href={`${link}`}>
                    <h1 className='text-white pb-5 sm:pl-4 pl-2 text-lg sm:text-2xl'>Checkout Trending {title} &rarr;</h1>
                </Link>
                <div className='flex flex-wrap justify-center w-full mx-auto'>
                    {uniqueProducts.map((product) => (
                        <div key={product._id} className="p-0 w-fit cursor-pointer shadow-xl my-4 mx-2 border-2 border-gray-800">
                            <div className="p-2 mx-0 w-full">
                                <Link passHref={true} href={`/product/${product.slug}`} className="block relative h-50 w-60 rounded overflow-hidden">
                                    <img alt="ecommerce" className="m-auto w-[28vh] h-[34vh] block" src={product.img} />
                                </Link>
                                <div className="mt-4">
                                    <h3 className="text-gray-400 text-xs tracking-widest title-font mb-1 ml-3">{product.type}</h3>
                                    <h2 className="text-gray-50 title-font text-lg font-medium ml-3">{product.title.split('-')[1]}</h2>
                                    <p className="text-gray-400 title-font text-xs font-medium ml-3">{product.title.split('-')[0]}</p>
                                    <p className="my-2 ml-3">₹{product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeCard;
