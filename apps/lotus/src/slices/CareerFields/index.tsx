import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `CareerFields`.
 */
export type CareerFieldsProps = SliceComponentProps<Content.CareerFieldsSlice>;

/**
 * Component for "CareerFields" Slices.
 */
const CareerFields = ({ slice }: CareerFieldsProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      Placeholder component for career_fields (variation: {slice.variation}) Slices
    </section>
  );
};

export default CareerFields;
