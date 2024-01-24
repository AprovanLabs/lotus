import type { FooterModel } from 'src/lib/core/models/footer';
import client from 'src/lib/server/prismic/prismicClient';
import { mapPrismicFooter } from './footerMapper';

class FooterService {
  static async getFooter(): Promise<FooterModel | null> {
    const page = await client.getSingle("footer");

    if (!page) return null;

    return mapPrismicFooter(page.data);
  }
}

export default FooterService;
