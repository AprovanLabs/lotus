import client from 'src/lib/server/prismic/prismicClient';
import type { HomeModel } from 'src/lib/core/models/home';
import { mapPrismicHome } from './homeMapper';

class HomeService {
  static async getHome(): Promise<HomeModel | null> {
    const home = await client.getSingle("home");

    if(!home) return null;

    return mapPrismicHome(home.data);
  }
}

export default HomeService;
