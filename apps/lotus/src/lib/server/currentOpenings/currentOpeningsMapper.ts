import { CurrentOpeningsDocumentData } from 'prismicio-types';
import type { CurrentOpeningsModel } from 'src/lib/core/models/currentOpenings';

export const mapPrismicCurrentOpenings = (data: CurrentOpeningsDocumentData) =>
  ({
    jobs: (data?.slices || []).map(slice => ({
      title: slice?.primary.job_title,
      pay: slice?.primary.pay,
      location: slice?.primary.location,
      description: slice?.primary.description,
      responsibilities: slice?.primary.responsibilities,
      qualifications: slice?.primary.qualifications,
    })),
  } as CurrentOpeningsModel);
