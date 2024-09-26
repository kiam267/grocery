import { ArrowNext, ArrowPrev } from '@/components/icons';
import {
  Swiper,
  SwiperSlide,
  Navigation,
  Autoplay,
} from '@/components/ui/slider';
import { Image } from '@/components/ui/image';
import { useTranslation } from 'next-i18next';
import Link from '../ui/link';
import Button from '../ui/button';
import { ArrowRight } from '../icons/arrow-right';
import { TypeFindAll } from '@/types';
import { useId } from 'react';

const SLIDERWITHDISCOUNT = [
  {
    id: 1,
    title: 'Hot Deals on New Items',
    describe: 'Hot Deals on New Items',
    discount: '5% OFF',
    image: '/hero/mini-slider-1.jpg',
    link: '/product/123',
    button: 'Buy Now',
  },
  {
    id: 2,
    title: 'Hot Deals on New Items',
    describe: 'Hot Deals on New Items',
    discount: '5% OFF',
    image: '/hero/mini-slider-1.jpg',
    link: '/product/123',
    button: 'Buy Now',
  },
];

const offerSliderBreakpoints = {
  320: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  580: {
    slidesPerView: 1,
    spaceBetween: 16,
  },
  1200: {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  1920: {
    slidesPerView: 3,
    spaceBetween: 24,
  },
};

/* NOTE: Contact with balcend and sliderwithdicount add and get from slider  */
export default function PromotionSlider({
  sliders,
}: {
  sliders: TypeFindAll[];
}) {
  const id = useId();

  const { t } = useTranslation();

  return (
    <div className="border-t border-border-200 bg-light px-5 py-5 md:p-8 lg:px-6">
      <div className="relative">
        <Swiper
          id="offer"
          //TODO: need discussion
          loop={true}
          breakpoints={offerSliderBreakpoints}
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: '.next',
            prevEl: '.prev',
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {sliders?.map((d) => (
            <SwiperSlide key={id}>
              {/* <Image
                className="h-auto w-full"
                src={d.original}
                alt={d.id}
                width="580"
                height="270"
              /> */}

              <div className="relative w-full h-full min-h-[250px] rounded-xl">
                {/* Image with black overlay */}
                <div className="relative w-full h-full">
                  <Image
                    className="w-full h-full min-h-[250px]  rounded-lg"
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
                    <div className="bg-white shadow-sm p-6 w-full rounded-3xl">
                      <div className="flex gap-4 items-center">
                        <div className="rounded-xl bg-red-100 px-3 py-[2px] text-[13px] font-bold text-red-500">
                          {d.discount_presentence}
                        </div>
                      </div>
                      <h1 className="text-sm font-semibold text-black mt-2">
                        {d.discount_title.split(' ').slice(0, -2).join(' ')}{' '}
                        <span className="text-accent">
                          {d.discount_title.split(' ').slice(-2).join(' ')}
                        </span>
                      </h1>
                      <p className="text-black/40">{d.discount_description}</p>
                    </div>
                    <Link href={d.shop_link} title={d.button_name}>
                      <Button
                        variant="outline"
                        type="button"
                        className="flex justify-between items-center mt-3 rounded-2xl border border-accent text-black "
                        name={d.button_name}
                      >
                        <span className="text-black">{d.button_name}</span>
                        <span>
                          {' '}
                          <p className="animate-left-to-right px-2 ">
                            <ArrowRight className="w-5 h-5 text-black" />
                          </p>
                        </span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className="prev absolute top-2/4 z-10 -mt-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border-200 border-opacity-70 bg-light text-heading shadow-xl transition-all duration-200 hover:border-accent hover:bg-accent hover:text-light ltr:-left-4 rtl:-right-4 md:-mt-5 md:h-9 md:w-9 ltr:md:-left-5 rtl:md:-right-5"
          role="button"
        >
          <span className="sr-only">{t('common:text-previous')}</span>
          <ArrowPrev width={18} height={18} />
        </div>
        <div
          className="next absolute top-2/4 z-10 -mt-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border-200 border-opacity-70 bg-light text-heading shadow-xl transition-all duration-200 hover:border-accent hover:bg-accent hover:text-light ltr:-right-4 rtl:-left-4 md:-mt-5 md:h-9 md:w-9 ltr:md:-right-5"
          role="button"
        >
          <span className="sr-only">{t('common:text-next')}</span>
          <ArrowNext width={18} height={18} />
        </div>
      </div>
    </div>
  );
}
