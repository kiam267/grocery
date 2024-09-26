import PromotionSlider from '@/components/promotions/promotion-slider';
import ErrorMessage from '@/components/ui/error-message';
import { useType } from '@/framework/type';
import { TypeFindAll } from '@/types';

export default function PromotionSliders({
  variables,
  type,
}: {
  variables: string;
  type: TypeFindAll[];
}) {
  // const { type, error } = useType(variables.type);

  // if (error) return <ErrorMessage message={error.message} />;
  if (!type) return null;
  return <PromotionSlider sliders={type} />;
}
