import { FooterModel } from "../../core/models/footer";
import { FooterDocumentData } from "prismicio-types";

export const
  mapPrismicFooter = (data: FooterDocumentData) => ({
    ...data,
    phoneNumber: data?.phone_number || null,
    emailAddress: data?.email || null,
    addressLine1: data?.address_line_1 || null,
    suiteNumber: data?.suite_number || null,
    addressLine2: data?.address_line_2 || null,
    googleMapsLink: data?.google_maps_link || null,
    linkedInLink: data?.linkedin_link || null,
    facebookLink: data?.facebook_link || null,
    twitterLink: data?.twitter_link || null
  }) as FooterModel;
