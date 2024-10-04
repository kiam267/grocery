import React from 'react';
import StickySidebarListCategories from '../categories/sticky-sidebar-list-categories';
import { useTranslation } from 'react-i18next';
import { Category } from '@/types';
interface StickySidebarListCategoriesProps {
  notFound: boolean;
  loading: boolean;
  categories: Category[];
  className?: string;
}
function CatagoryLayer({
  notFound,
  categories,
  loading,
  className,
}: StickySidebarListCategoriesProps) {
  const { t } = useTranslation('common');
  return (
    <div className="hidden md:block">
      <div className="border bg-gray-100 m-3 rounded-lg">
        <h2 className="text-center  text-black text-2xl font-bold pt-3 pb-2">
          {t('text-category')}
        </h2>
        <div className="w-32 h-1 bg-accent mx-auto  rounded-2xl"></div>

        <StickySidebarListCategories
          notFound={!Boolean(categories.length)}
          categories={categories}
          loading={loading}
          className={'bg-gray-100'}
          // variables={variables}
          // title={title}
        />
      </div>

      
    </div>
  );
}

export default CatagoryLayer;
