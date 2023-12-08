import * as prismic from '@prismicio/client';
import * as prismicNext from '@prismicio/next';
import config from './slicemachine.config.json';

export const repositoryName = config.repositoryName;
const routes: prismic.ClientConfig['routes'] = [
  {
    type: 'homepage',
    path: '/',
  },
  {
    type: 'tournaments',
    path: '/tournaments/:uid',
  },
];

export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    ...config,
  });

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};
