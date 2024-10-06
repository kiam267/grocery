import ProductLoader from '@/components/ui/loaders/product-loader';
import NotFound from '@/components/ui/not-found';
import rangeMap from '@/lib/range-map';
import ProductCard from '@/components/products/cards/card';
import ErrorMessage from '@/components/ui/error-message';
import { usePopularProducts } from '@/framework/product';
import SectionBlock from '@/components/ui/section-block';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { cn } from '@/lib/cn';

interface Props {
  className?: string;
  limit?: number;
  variables: any;
  title?: string;
  column?: 'five' | 'six' | 'auto';
}

export default function PopularProductsGrid({
  className,
  limit = 10,
  variables,
  title,
  column,
}: Props) {
  const { t } = useTranslation('common');
  const { products, isLoading, error } = usePopularProducts(variables);

  if (error) return <ErrorMessage message={error.message} />;
  if (!isLoading && !products.length) {
    return (
      <SectionBlock title={title}>
        <NotFound text="text-not-found" className="mx-auto w-7/12" />
      </SectionBlock>
    );
  }

  return (
    <SectionBlock title={title}>
      <div className={classNames(className, 'w-full')}>
        <div
          className={cn({
            'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3':
              column === 'auto',
            'grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6 gap-y-10 lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] xl:gap-8 xl:gap-y-11 2xl:grid-cols-5 3xl:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]':
              column === 'five',
            'grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 md:gap-6 lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] 2xl:grid-cols-5 3xl:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]':
              column === 'six',
          })}
        >
          {isLoading && !products.length
            ? rangeMap(limit, (i) => (
                <ProductLoader key={i} uniqueKey={`product-${i}`} />
              ))
            : products.map((product: any) => (
                <ProductCard product={product} key={product?.id} />
              ))}
        </div>
      </div>
    </SectionBlock>
  );
}
