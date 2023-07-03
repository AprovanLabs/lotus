import { createClient } from '@prismicio/client';

const PRISMIC_ACCESS_TOKEN = process.env.PRISMIC_ACCESS_TOKEN!;
const PRISMIC_ENDPOINT = process.env.PRISMIC_ENDPOINT!;

const client = createClient(PRISMIC_ENDPOINT, {
  accessToken: PRISMIC_ACCESS_TOKEN,
});

export default client;
