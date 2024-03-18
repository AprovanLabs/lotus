import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `Job`.
 */
export type JobProps = SliceComponentProps<Content.JobSlice>;

/**
 * Component for "Job" Slices.
 */
const Job = ({ slice }: JobProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      Placeholder component for job (variation: {slice.variation}) Slices
    </section>
  );
};

export default Job;
