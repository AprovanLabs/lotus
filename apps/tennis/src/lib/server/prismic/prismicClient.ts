import * as prismic from '@prismicio/client';

const PRISMIC_ACCESS_TOKEN = process.env.PRISMIC_ACCESS_TOKEN!;
const PRISMIC_ENDPOINT = process.env.PRISMIC_ENDPOINT!;

const client = prismic.createClient(PRISMIC_ENDPOINT, {
  accessToken: PRISMIC_ACCESS_TOKEN,
});

export default client;
