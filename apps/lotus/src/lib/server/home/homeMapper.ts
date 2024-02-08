import { HomeDocumentData } from 'prismicio-types';
import type { HomeModel } from 'src/lib/core/models/home';

export const mapPrismicHome = (data: HomeDocumentData) =>
  ({
    title: data?.title,
    slogan: data?.slogan,
    info: (data?.home_page_information || []).map(info => ({
      title: info?.heading,
      line1: info?.line_1,
      line2: info?.line_2,
      line3: info?.line_3,
    })),
  } as HomeModel);
