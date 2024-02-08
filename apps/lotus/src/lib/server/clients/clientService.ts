import client from 'src/lib/server/prismic/prismicClient';
import type { ClientsModel } from 'src/lib/core/models/clients';
import { mapPrismicClients } from './clientMapper';

class ClientService {
  static async getClients(): Promise<ClientsModel | null> {
    const page = await client.getSingle('client');

    if (!page) return null;

    return mapPrismicClients(page.data);
  }
}

export default ClientService;
