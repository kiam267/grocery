import ErrorMessage from '@/components/ui/error-message';
import dynamic from 'next/dynamic';
import { useCategories } from '@/framework/category';
import { useTranslation } from 'react-i18next';
import CatagoryLayer from '../common/categories-layer';
import { TypeFindAll } from '@/types';

const StickySidebarListCategories = dynamic(
  () => import('@/components/categories/sticky-sidebar-list-categories'),
);
const StaticSidebarVerticalRectangleCategories = dynamic(
  () => import('@/components/categories/sliding-vertical-rectangle-categories'),
);
const StickySidebarBoxedCategories = dynamic(
  () => import('@/components/categories/sticky-sidebar-boxed-categories'),
);
const FilterCategoryGrid = dynamic(
  () => import('@/components/categories/filter-category-grid'),
);
const SlidingCardCategories = dynamic(
  () => import('@/components/categories/sliding-card-category'),
);
const MAP_CATEGORY_TO_GROUP: Record<string, any> = {
  classic: StickySidebarListCategories,
  modern: StickySidebarBoxedCategories,
  standard: StaticSidebarVerticalRectangleCategories,
  minimal: FilterCategoryGrid,
  compact: SlidingCardCategories,
  default: StickySidebarListCategories,
};
interface CategoriesProps {
  layout: string;
  variables: any;
  className?: string;
  title?: string;
  isHomeCatagories?: boolean;
  variablesTypes: string;
  type: TypeFindAll['discountB'];
}
export default function Categories({
  layout,
  className = '',
  variables,
  title,
  isHomeCatagories,
  type,
  variablesTypes,
}: CategoriesProps) {



  const { categories, isLoading, error } = useCategories(variables);
  const { t } = useTranslation('common');
  if (error) return <ErrorMessage message={error.message} />;
  const Component = MAP_CATEGORY_TO_GROUP[layout];

  return (
    <>
      {isHomeCatagories ? (
        <CatagoryLayer
          notFound={!Boolean(categories.length)}
          categories={categories}
          loading={isLoading}
          className={className}
          type={type}
          variables={variablesTypes}
        />
      ) : (
        <StickySidebarListCategories
          notFound={!Boolean(categories.length)}
          categories={categories}
          loading={isLoading}
          className={className}
          // variables={variables}
          // title={title}
        />
      )}
    </>
  );
}
