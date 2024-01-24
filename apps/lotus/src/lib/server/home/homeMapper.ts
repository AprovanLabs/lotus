import { HomeDocumentData } from "prismicio-types";
import type { HomeModel } from "src/lib/core/models/home";

export const mapPrismicHome = (data: HomeDocumentData) => ({
  title: data?.title,
  slogan: data?.slogan,
  info: (data?.slices || []).map((info) => ({
    title: info?.primary?.title,
    body: (info?.items || []).map((item) =>
      item?.body
    ),
  }))
 }) as HomeModel;
