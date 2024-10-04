import React from 'react';
import Banner from '../banners/banner';
import PromotionSliders from '../promotions/promotions';
import FilterBar from '../layouts/filter-bar';
import { Element } from 'react-scroll';
import Categories from '../categories/categories';
import ProductGridHome from '../products/grids/home';
import { HomePageProps } from '@/types';
import BannerWithDicount from '../banners/banner-with-discount';
import { useAllTypes } from '../../framework/rest/type';
import ErrorMessage from '../ui/error-message';
import BannerWithPagination from '../banners/banner-with-pagination';
import CompactLayout from '../layouts/compact';
import { getLayoutWithFooter } from '../layouts/layout-with-footer';
import Footer from '../layouts/footer';

function ShopHome({ variables }: HomePageProps) {
  const { type, error } = useAllTypes();

  if (error) return <ErrorMessage />;

  if (!type) return null;

  return (
    <>
      {/* CHANGED: This components need to delete  */}
      {/* compact */}
      {/* NOTE: edit me  */}
      {/* <Banner layout="compact" variables={variables.types} /> */}

      {/* <CompactLayout variables={variables} /> */}
      {/* ADD: this banner */}

      <FilterBar variables={variables.categories} isHome />

      <BannerWithDicount type={type} />
      <PromotionSliders type={type} variables={variables.types} />
      <Element
        name="grid"
        className="flex border-t border-solid border-border-200 border-opacity-70"
      >
        <Categories
          layout="classic"
          variables={variables.categories}
          isHomeCatagories
          type={type}
          variablesTypes={variables.types}
        />
        <ProductGridHome
          className="px-4 pt-3.5 pb-16 lg:p-6 xl:p-8"
          variables={variables.products}
        />
      </Element>
      <Footer />
    </>
  );
}

export default ShopHome;
