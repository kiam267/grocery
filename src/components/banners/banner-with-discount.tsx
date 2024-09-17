import Image from 'next/image';
import React from 'react';
import Button from '../ui/button';
import Link from '../ui/link';
import { ArrowNextIcon } from '../icons/arrow-next';
import { LongArrowIcon } from '../icons/long-arrow-icon';
import { ArrowRight } from '../icons/arrow-right';

/* 
UPDATED: 

database query : 

id,
title ,
seo-title,
dicountcontent,
dicountPrice,
imageUrl,
buttonUrl,
buttonTitle

*/

const DISCOUNT_SHOP = [
  {
    id: 1,
    title: 'Stay home & delivered your Daily Needs',
    link: 'https://shop-2.vercel.app/',
    discountContent: 'Exclusive offer',
    discountedPrice: '2% Off',
    image: '/hero/discount-image-1.jpg',
    button: 'Shop Now ',
  },
  {
    id: 2,
    title: 'Start your daily shopping with some Organic food',
    link: 'https://shop-2.vercel.app/',
    discountContent: 'Healthy Food',
    discountedPrice: '5% Off',
    image: '/hero/discount-image-2.jpg',
    button: 'Shop Now ',
  },
  {
    id: 3,
    title: 'Stay home & delivered your Daily Needs',
    link: 'https://shop-2.vercel.app/',
    discountContent: 'Exclusive offer',
    discountedPrice: '2% Off',
    image: '/hero/discount-image-3.jpg',
    button: 'Shop Now ',
  },
];

function BannerWithDicount() {
  return (
    <div className={'textClass relative  flex flex-col  justify-center my-10'}>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-16  px-2 lg:px-6">
        {/* Left side large image */}
        <div className="lg:col-span-2 flex flex-col items-center relative">
          {DISCOUNT_SHOP.slice(0, 1).map((discountItem) => (
            <div
              key={discountItem.id}
              className="relative w-full  min-h-[250px] rounded-xl"
            >
              <Image
                className="w-full h-full shadow-sm rounded-lg"
                loading="lazy"
                width={400}
                height={500}
                src={discountItem.image}
                alt={discountItem.title}
                title={discountItem.title}
              />
              {/* Content Overlay */}
              <div className="absolute left-4 inset-y-0 flex items-center p-4 rounded-lg">
                {/* Discount and Button */}
                <div>
                  <div className="flex gap-4 items-center">
                    <p className="text-black/80 font-semibold">
                      {discountItem.discountContent}
                    </p>
                    <div className="rounded-xl bg-red-100 p-1 text-[13px] font-bold text-red-600">
                      {discountItem.discountedPrice}
                    </div>
                  </div>
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-black w-[80%] lg:w-[75%]">
                    {discountItem.title.split(' ').slice(0, -2).join(' ')}{' '}
                    <span className="text-accent">
                      {discountItem.title.split(' ').slice(-2).join(' ')}
                    </span>
                  </h1>
                  <Link href={discountItem.link} title={discountItem.title}>
                    <Button
                      type="button"
                      className="flex justify-between items-center mt-3 rounded-2xl"
                      name={discountItem.button}
                    >
                      <span>{discountItem.button}</span>
                      <span>
                        {' '}
                        <p className="animate-left-to-right px-2">
                          <ArrowRight className="w-5 h-5" />
                        </p>
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right side smaller images */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 grid-rows-2 xl:grid-rows-[50%] gap-5">
          {DISCOUNT_SHOP.slice(1).map((discountItem) => (
            <div
              key={discountItem.id}
              className="relative min-h-[250px] rounded-xl"
            >
              <Image
                className="w-full h-full min-h-[250px] object-cover shadow-sm rounded-lg"
                loading="lazy"
                src={discountItem.image}
                alt={discountItem.title}
                title={discountItem.title}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute left-4 inset-y-0 flex items-center p-4 rounded-lg">
                <div>
                  <div className="flex gap-4 items-center">
                    <p className="text-black/80 font-semibold">
                      {discountItem.discountContent}
                    </p>
                    <div className="rounded-xl bg-red-100 p-1 text-[13px] font-bold text-red-600">
                      {discountItem.discountedPrice}
                    </div>
                  </div>
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-black w-[80%] lg:w-[75%]">
                    {discountItem.title.split(' ').slice(0, -2).join(' ')}{' '}
                    <span className="text-accent">
                      {discountItem.title.split(' ').slice(-2).join(' ')}
                    </span>
                  </h1>
                  <Link href={discountItem.link} title={discountItem.title}>
                    <Button
                      type="button"
                      className="flex justify-between items-center mt-3 rounded-2xl"
                      name={discountItem.button}
                    >
                      <span>{discountItem.button}</span>
                      <span>
                        {' '}
                        <p className="animate-left-to-right px-2">
                          <ArrowRight className="w-5 h-5" />
                        </p>
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BannerWithDicount;
