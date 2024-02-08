import client from 'src/lib/server/prismic/prismicClient';
import type { JobSeekersModel } from 'src/lib/core/models/jobSeekers';
import { mapPrismicJobSeekers } from './jobSeekersMapper';

class JobSeekersService {
  static async getJobSeekers(): Promise<JobSeekersModel | null> {
    const page = await client.getSingle('job_seekers');

    if (!page) return null;

    return mapPrismicJobSeekers(page.data);
  }
}

export default JobSeekersService;
