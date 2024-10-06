import { useProducts } from '@/framework/product';
import { PRODUCTS_PER_PAGE } from '@/framework/client/variables';
import { Grid, GridHome } from '@/components/products/grid';
import { useRouter } from 'next/router';
import { useLocationBaseSearch } from '@/lib/use-location';
import BestSellingProductsGrid from '../best-selling-products';
interface Props {
  className?: string;
  variables: any;
  column?: any;
  gridClassName?: string;
}
export default function ProductGridHome({
  className,
  variables,
  column,
  gridClassName,
}: Props) {
  const { query } = useRouter();
  const { location } = useLocationBaseSearch();
  const { products, loadMore, isLoadingMore, isLoading, hasMore, error } =
    useProducts({
      ...variables,
      ...(query.category && { categories: query.category }),
      ...(query.text && { name: query.text }),
      location,
    });
  const productsItem: any = products;
  return (
    <>

      <GridHome
        products={productsItem}
        loadMore={loadMore}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        hasMore={hasMore}
        error={error}
        limit={PRODUCTS_PER_PAGE}
        gridClassName={gridClassName}
        column={column}
      />
    </>
  );
}
