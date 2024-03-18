import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `InfoBox`.
 */
export type InfoBoxProps = SliceComponentProps<Content.InfoBoxSlice>;

/**
 * Component for "InfoBox" Slices.
 */
const InfoBox = ({ slice }: InfoBoxProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      Placeholder component for info_box (variation: {slice.variation}) Slices
    </section>
  );
};

export default InfoBox;
