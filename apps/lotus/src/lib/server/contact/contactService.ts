import type { ContactModel } from 'src/lib/core/models/contact';
import client from 'src/lib/server/prismic/prismicClient';

class ContactService {
  static async getContact(): Promise<ContactModel | null> {
    const data = await client.getAllByType('contact');

    if (!data?.length) return null;

    return data[0]?.data as ContactModel;
  }
}

export default ContactService;
