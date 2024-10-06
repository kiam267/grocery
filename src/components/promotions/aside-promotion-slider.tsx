import { ArrowNext, ArrowPrev } from '@/components/icons';
import {
  Swiper,
  SwiperSlide,
  Navigation,
  Autoplay,
  Pagination,
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
};

/* NOTE: Contact with balcend and sliderwithdicount add and get from slider  */
export default function AsidePromotionSlider({
  sliders,
}: {
  sliders: TypeFindAll['discountB'];
}) {
  const id = useId();

  const { t } = useTranslation();

  return (
    <div className="border bg-gray-100 m-3 rounded-lg xl:w-72 h-[500px] ">
      <div className="relative">
        <Swiper
          id="offer"
          //TODO: need discussion
          loop={true}
          breakpoints={offerSliderBreakpoints}
          modules={[Navigation, Autoplay, Pagination]}
          navigation={{
            nextEl: '.next',
            prevEl: '.prev',
          }}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
        >
          {sliders?.map((d) => (
            <SwiperSlide key={id}>
              <div className="relative grid grid-rows-2 w-full  rounded-xl">
                {/* Image with black overlay */}
                <div className="relative w-full h-full  p-3">
                  <Image
                    className="w-full"
                    loading="lazy"
                    fill
                    src={d.discount_image_url}
                    alt={d.discount_title}
                    title={d.discount_seo_title || d.discount_title}
                  />
                </div>

                {/* Content Overlay */}
                <div className="relative h-full w-full  shadow-sm p-6">
                  <div>
                    <div>
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
            </SwiperSlide>
          ))}
        </Swiper>

        {/*  */}
        {/* <div
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
        </div> */}
      </div>
    </div>
  );
}

/* 





*/
