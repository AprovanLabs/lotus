import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `TournamentFaqs`.
 */
export type TournamentFaqsProps = SliceComponentProps<Content.TournamentFaqsSlice>;

/**
 * Component for "TournamentFaqs" Slices.
 */
const TournamentFaqs = ({ slice }: TournamentFaqsProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      Placeholder component for tournament_faqs (variation: {slice.variation}) Slices
    </section>
  );
};

export default TournamentFaqs;
