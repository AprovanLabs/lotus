// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from '@prismicio/client';

type Simplify<T> = {
  [KeyType in keyof T]: T[KeyType];
};
/** Content for Contact Info documents */
interface ContactDocumentData {
  /**
   * Name field in *Contact Info*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: contact.name
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  name: prismic.KeyTextField;
  /**
   * Email Address field in *Contact Info*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: contact.email
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  email: prismic.KeyTextField;
  /**
   * Phone Number field in *Contact Info*
   *
   * - **Field Type**: Number
   * - **Placeholder**: *None*
   * - **API ID Path**: contact.phoneNumber
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/number
   *
   */
  phoneNumber: prismic.NumberField;
}
/**
 * Contact Info document from Prismic
 *
 * - **API ID**: `contact`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ContactDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
  Simplify<ContactDocumentData>,
  'contact',
  Lang
>;
/** Content for Equipment documents */
interface EquipmentDocumentData {
  /**
   * title field in *Equipment*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: equipment.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  title: prismic.RichTextField;
  /**
   * description field in *Equipment*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: equipment.description
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  description: prismic.RichTextField;
  /**
   * price field in *Equipment*
   *
   * - **Field Type**: Number
   * - **Placeholder**: *None*
   * - **API ID Path**: equipment.price
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/number
   *
   */
  price: prismic.NumberField;
  /**
   * image field in *Equipment*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: equipment.image
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  image: prismic.ImageField<never>;
  /**
   * in stock field in *Equipment*
   *
   * - **Field Type**: Boolean
   * - **Placeholder**: *None*
   * - **Default Value**: false
   * - **API ID Path**: equipment.inStock
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/boolean
   *
   */
  inStock: prismic.BooleanField;
}
/**
 * Equipment document from Prismic
 *
 * - **API ID**: `equipment`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type EquipmentDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<
  Simplify<EquipmentDocumentData>,
  'equipment',
  Lang
>;
/** Content for Other documents */
interface OtherDocumentData {
  /**
   * title field in *Other*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: other.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  title: prismic.RichTextField;
  /**
   * description field in *Other*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: other.description
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  description: prismic.RichTextField;
}
/**
 * Other document from Prismic
 *
 * - **API ID**: `other`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type OtherDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<
  Simplify<OtherDocumentData>,
  'other',
  Lang
>;
/** Content for Sponsors documents */
interface SponsorsDocumentData {
  /**
   * Slice Zone field in *Sponsors*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: sponsors.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/slices
   *
   */
  slices: prismic.SliceZone<SponsorsDocumentDataSlicesSlice>;
}
/**
 * Slice for *Sponsors → Slice Zone*
 *
 */
type SponsorsDocumentDataSlicesSlice = SponsorSlice;
/**
 * Sponsors document from Prismic
 *
 * - **API ID**: `sponsors`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SponsorsDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
  Simplify<SponsorsDocumentData>,
  'sponsors',
  Lang
>;
/** Content for Tournament documents */
interface TournamentDocumentData {
  /**
   * Title field in *Tournament*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: tournament.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  title: prismic.KeyTextField;
  /**
   * tagline field in *Tournament*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: tournament.tagline
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  tagline: prismic.KeyTextField;
  /**
   * T-shirt Image field in *Tournament*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: tournament.tShirtImage
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  tShirtImage: prismic.ImageField<never>;
  /**
   * Registration Deadline Date field in *Tournament*
   *
   * - **Field Type**: Date
   * - **Placeholder**: *None*
   * - **API ID Path**: tournament.registrationDeadlineDate
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/date
   *
   */
  registrationDeadlineDate: prismic.DateField;
  /**
   * Start Date field in *Tournament*
   *
   * - **Field Type**: Date
   * - **Placeholder**: *None*
   * - **API ID Path**: tournament.fromDate
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/date
   *
   */
  fromDate: prismic.DateField;
  /**
   * End Date field in *Tournament*
   *
   * - **Field Type**: Date
   * - **Placeholder**: *None*
   * - **API ID Path**: tournament.toDate
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/date
   *
   */
  toDate: prismic.DateField;
  /**
   * Sign Up Form field in *Tournament*
   *
   * - **Field Type**: Link to Media
   * - **Placeholder**: *None*
   * - **API ID Path**: tournament.signUpForm
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
   *
   */
  signUpForm: prismic.LinkToMediaField;
  /**
   * FAQs field in *Tournament*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: tournament.faqs[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/group
   *
   */
  faqs: prismic.GroupField<Simplify<TournamentDocumentDataFaqsItem>>;
  /**
   * Draws field in *Tournament*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: tournament.draws[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/group
   *
   */
  draws: prismic.GroupField<Simplify<TournamentDocumentDataDrawsItem>>;
}
/**
 * Item in Tournament → FAQs
 *
 */
export interface TournamentDocumentDataFaqsItem {
  /**
   * Title field in *Tournament → FAQs*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: tournament.faqs[].title
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  title: prismic.KeyTextField;
  /**
   * Text field in *Tournament → FAQs*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: tournament.faqs[].text
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  text: prismic.RichTextField;
  /**
   * Warning field in *Tournament → FAQs*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: tournament.faqs[].warning
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  warning: prismic.KeyTextField;
  /**
   * Link Label field in *Tournament → FAQs*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: tournament.faqs[].linkLabel
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  linkLabel: prismic.KeyTextField;
  /**
   * Link field in *Tournament → FAQs*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: tournament.faqs[].link
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  link: prismic.RichTextField;
}
/**
 * Item in Tournament → Draws
 *
 */
export interface TournamentDocumentDataDrawsItem {
  /**
   * title field in *Tournament → Draws*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: tournament.draws[].title
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  title: prismic.KeyTextField;
  /**
   * image field in *Tournament → Draws*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: tournament.draws[].image
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  image: prismic.ImageField<never>;
  /**
   * description field in *Tournament → Draws*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: tournament.draws[].description
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  description: prismic.RichTextField;
  /**
   * link field in *Tournament → Draws*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: tournament.draws[].link
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  link: prismic.RichTextField;
  /**
   * linkLabel field in *Tournament → Draws*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: tournament.draws[].linkLabel
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  linkLabel: prismic.RichTextField;
  /**
   * iframe field in *Tournament → Draws*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: tournament.draws[].iframe
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  iframe: prismic.RichTextField;
}
/**
 * Tournament document from Prismic
 *
 * - **API ID**: `tournament`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type TournamentDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<
  Simplify<TournamentDocumentData>,
  'tournament',
  Lang
>;
export type AllDocumentTypes =
  | ContactDocument
  | EquipmentDocument
  | OtherDocument
  | SponsorsDocument
  | TournamentDocument;
/**
 * Item in Sponsor → Items
 *
 */
export interface SponsorSliceDefaultItem {
  /**
   * name field in *Sponsor → Items*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: sponsor.items[].name
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  name: prismic.KeyTextField;
  /**
   * logo field in *Sponsor → Items*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: sponsor.items[].logo
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  logo: prismic.ImageField<never>;
}
/**
 * Default variation for Sponsor Slice
 *
 * - **API ID**: `default`
 * - **Description**: `Default`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type SponsorSliceDefault = prismic.SharedSliceVariation<
  'default',
  Record<string, never>,
  Simplify<SponsorSliceDefaultItem>
>;
/**
 * Slice variation for *Sponsor*
 *
 */
type SponsorSliceVariation = SponsorSliceDefault;
/**
 * Sponsor Shared Slice
 *
 * - **API ID**: `sponsor`
 * - **Description**: `Sponsor`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type SponsorSlice = prismic.SharedSlice<'sponsor', SponsorSliceVariation>;
/**
 * Default variation for TournamentFaqs Slice
 *
 * - **API ID**: `default`
 * - **Description**: `Default`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type TournamentFaqsSliceDefault = prismic.SharedSliceVariation<
  'default',
  Record<string, never>,
  never
>;
/**
 * Slice variation for *TournamentFaqs*
 *
 */
type TournamentFaqsSliceVariation = TournamentFaqsSliceDefault;
/**
 * TournamentFaqs Shared Slice
 *
 * - **API ID**: `tournament_faqs`
 * - **Description**: `TournamentFaqs`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type TournamentFaqsSlice = prismic.SharedSlice<
  'tournament_faqs',
  TournamentFaqsSliceVariation
>;
declare module '@prismicio/client' {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig
    ): prismic.Client<AllDocumentTypes>;
  }
  namespace Content {
    export type {
      ContactDocumentData,
      ContactDocument,
      EquipmentDocumentData,
      EquipmentDocument,
      OtherDocumentData,
      OtherDocument,
      SponsorsDocumentData,
      SponsorsDocumentDataSlicesSlice,
      SponsorsDocument,
      TournamentDocumentData,
      TournamentDocumentDataFaqsItem,
      TournamentDocumentDataDrawsItem,
      TournamentDocument,
      AllDocumentTypes,
      SponsorSliceDefaultItem,
      SponsorSliceDefault,
      SponsorSliceVariation,
      SponsorSlice,
      TournamentFaqsSliceDefault,
      TournamentFaqsSliceVariation,
      TournamentFaqsSlice,
    };
  }
}
