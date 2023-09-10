import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `Sponsor`.
 */
export type SponsorProps = SliceComponentProps<Content.SponsorSlice>;

/**
 * Component for "Sponsor" Slices.
 */
const Sponsor = ({ slice }: SponsorProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      Placeholder component for sponsor (variation: {slice.variation}) Slices
    </section>
  );
};

export default Sponsor;
