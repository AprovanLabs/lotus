import client from 'src/lib/server/prismic/prismicClient';
import type { CurrentOpeningsModel } from 'src/lib/core/models/currentOpenings';
import { mapPrismicCurrentOpenings } from './currentOpeningsMapper';

class CurrentOpeningsService {
  static async getCurrentOpenings(): Promise<CurrentOpeningsModel | null> {
    const page = await client.getSingle('current_openings');

    if (!page) return null;

    return mapPrismicCurrentOpenings(page.data);
  }
}

export default CurrentOpeningsService;
