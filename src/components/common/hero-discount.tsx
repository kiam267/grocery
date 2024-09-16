import React from 'react';
import Banner from '../banners/banner';
import PromotionSliders from '../promotions/promotions';
import FilterBar from '../layouts/filter-bar';
import { Element } from 'react-scroll';
import Categories from '../categories/categories';
import ProductGridHome from '../products/grids/home';
import { HomePageProps } from '@/types';

function HeorDiscount({ variables }: HomePageProps) {
  return (
    <>
      <Banner layout="classic" variables={variables.types} />
      <PromotionSliders variables={variables.types} />
      <FilterBar variables={variables.categories} />
      <Element
        name="grid"
        className="flex border-t border-solid border-border-200 border-opacity-70"
      >
        <Categories layout="classic" variables={variables.categories} />
        <ProductGridHome
          className="px-4 pt-3.5 pb-16 lg:p-6 xl:p-8"
          variables={variables.products}
        />
      </Element>
    </>
  );
}

export default HeorDiscount;
