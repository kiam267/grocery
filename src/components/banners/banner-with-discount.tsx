import Image from 'next/image';
import React from 'react';
import { useAllTypes } from '../../framework/rest/type';
import Button from '../ui/button';
import Link from '../ui/link';
import { ArrowNextIcon } from '../icons/arrow-next';
import { LongArrowIcon } from '../icons/long-arrow-icon';
import { ArrowRight } from '../icons/arrow-right';
import ErrorMessage from '../ui/error-message';
import { TypeFindAll } from '@/types';

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
    discountedPrice: '45% Off',
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

//TODO: first image padding need to update

function BannerWithDicount({ type }: { type: TypeFindAll[] }) {
  return (
    <div className={'textClass relative  flex flex-col  justify-center my-10'}>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:mt-16 px-2 lg:px-6">
        {/* Left side large image */}
        <div className="lg:col-span-2 flex flex-col items-center relative ">
          {type
            .filter((d) => d.slug === 'big')
            .map((d) => (
              <div
                key={d.shop_id}
                className="relative w-full h-full min-h-[250px] rounded-xl"
              >
                {/* Image with black overlay */}
                <div className="relative h-full w-full">
                  <Image
                    className="w-full h-full  rounded-lg"
                    loading="lazy"
                    fill
                    src={d.discount_image_url}
                    alt={d.discount_title}
                    title={d.discount_seo_title || d.discount_title}
                  />
                  {/* Black background overlay with opacity */}
                  <div className="absolute inset-0 bg-black opacity-5 rounded-lg"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute left-4 inset-y-0 flex items-center p-4 rounded-lg z-10">
                  {/* Discount and Button */}
                  <div>
                    <div className="flex gap-4 items-center">
                      <p className="text-black/80 font-semibold">
                        {/* {d.dic} NOTE: add table name that is discount_sort_title */}
                      </p>
                      <div className="rounded-xl bg-red-100 px-3 py-[2px] text-[13px] font-bold text-red-500">
                        {d.discount_presentence}
                      </div>
                    </div>
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-black w-[80%] lg:w-[75%]">
                      {d.discount_title.split(' ').slice(0, -2).join(' ')}{' '}
                      <span className="text-accent">
                        {d.discount_title.split(' ').slice(-2).join(' ')}
                      </span>
                    </h1>
                    <Link href={d.shop_link} title={d.seo_title}>
                      <Button
                        type="button"
                        className="flex justify-between items-center mt-3 rounded-2xl"
                        name={d.button_name}
                      >
                        <span>{d.button_name}</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 grid-rows-1 xl:grid-rows-[50%] gap-5 ">
          {type
            .filter((d) => d.slug === 'medium')
            .map((d) => (
              <div
                key={d.shop_id}
                className="relative min-h-[250px] rounded-xl"
              >
                <Image
                  className=" w-full h-full min-h-[240px] object-cover shadow-sm rounded-lg"
                  loading="lazy"
                  src={d.discount_image_url}
                  alt={d.discount_title}
                  title={d.discount_title}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-black opacity-10 rounded-lg"></div>
                <div className="absolute left-4 inset-y-0 flex items-center p-4 rounded-lg">
                  <div>
                    <div className="flex gap-4 items-center">
                      {/* <p className="text-black/80 font-semibold">
                        {d.discountContent}
                      </p> */}
                      <div className="rounded-xl bg-red-100 px-3 py-[2px] text-[13px] font-bold text-red-500">
                        {d.discount_presentence}
                      </div>
                    </div>
                    <h1 className="text-xl md:text-2xl font-bold text-black w-[80%] lg:w-[75%]">
                      {d.discount_title.split(' ').slice(0, -2).join(' ')}{' '}
                      <span className="text-accent">
                        {d.discount_title.split(' ').slice(-2).join(' ')}
                      </span>
                    </h1>
                    <Link href={d.shop_link} title={d.discount_title}>
                      <Button
                        type="button"
                        className="flex justify-between items-center mt-3 rounded-2xl"
                        name={d.button_name}
                      >
                        <span>{d.button_name}</span>
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
