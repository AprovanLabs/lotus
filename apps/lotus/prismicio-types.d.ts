// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from '@prismicio/client';

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

/**
 * Item in *Client → Stats*
 */
export interface ClientDocumentDataStatsItem {
  /**
   * Value field in *Client → Stats*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: client.stats[].value
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  value: prismic.KeyTextField;

  /**
   * Label field in *Client → Stats*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: client.stats[].label
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  label: prismic.KeyTextField;
}

type ClientDocumentDataSlicesSlice = ProcessStepsSlice | CareerFieldsSlice;

/**
 * Content for Client documents
 */
interface ClientDocumentData {
  /**
   * Heading field in *Client*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: client.heading
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  heading: prismic.KeyTextField;

  /**
   * Line 1 field in *Client*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: client.line_1
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  line_1: prismic.KeyTextField;

  /**
   * Line 2 field in *Client*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: client.line_2
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  line_2: prismic.KeyTextField;

  /**
   * Stats field in *Client*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: client.stats[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  stats: prismic.GroupField<Simplify<ClientDocumentDataStatsItem>>;

  /**
   * Slice Zone field in *Client*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: client.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<ClientDocumentDataSlicesSlice> /**
   * Meta Description field in *Client*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: client.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Client*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: client.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;

  /**
   * Meta Title field in *Client*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: client.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;
}

/**
 * Client document from Prismic
 *
 * - **API ID**: `client`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ClientDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
  Simplify<ClientDocumentData>,
  'client',
  Lang
>;

type CurrentOpeningsDocumentDataSlicesSlice = JobSlice;

/**
 * Content for Current Openings documents
 */
interface CurrentOpeningsDocumentData {
  /**
   * Page Title field in *Current Openings*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: current_openings.page_title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  page_title: prismic.KeyTextField;

  /**
   * Slice Zone field in *Current Openings*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: current_openings.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<CurrentOpeningsDocumentDataSlicesSlice> /**
   * Meta Description field in *Current Openings*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: current_openings.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Current Openings*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: current_openings.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;

  /**
   * Meta Title field in *Current Openings*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: current_openings.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;
}

/**
 * Current Openings document from Prismic
 *
 * - **API ID**: `current_openings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type CurrentOpeningsDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<CurrentOpeningsDocumentData>,
    'current_openings',
    Lang
  >;

/**
 * Item in *Employees → Employees*
 */
export interface EmployeesDocumentDataEmployeesItem {
  /**
   * Name field in *Employees → Employees*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: employees.employees[].name
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  name: prismic.KeyTextField;

  /**
   * Job Title field in *Employees → Employees*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: employees.employees[].job_title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  job_title: prismic.KeyTextField;

  /**
   * Email field in *Employees → Employees*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: employees.employees[].email
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  email: prismic.KeyTextField;

  /**
   * LinkedIn Link field in *Employees → Employees*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: employees.employees[].linkedin_link
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  linkedin_link: prismic.KeyTextField;

  /**
   * Cell Number field in *Employees → Employees*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: employees.employees[].cell_number
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  cell_number: prismic.KeyTextField;

  /**
   * Office Phone Number field in *Employees → Employees*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: employees.employees[].office_phone_number
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  office_phone_number: prismic.KeyTextField;

  /**
   * Image field in *Employees → Employees*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: employees.employees[].image
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  image: prismic.ImageField<never>;
}

type EmployeesDocumentDataSlicesSlice = never;

/**
 * Content for Employees documents
 */
interface EmployeesDocumentData {
  /**
   * Title field in *Employees*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: employees.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Employees field in *Employees*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: employees.employees[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  employees: prismic.GroupField<Simplify<EmployeesDocumentDataEmployeesItem>>;

  /**
   * Slice Zone field in *Employees*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: employees.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<EmployeesDocumentDataSlicesSlice> /**
   * Meta Description field in *Employees*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: employees.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Employees*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: employees.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;

  /**
   * Meta Title field in *Employees*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: employees.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;
}

/**
 * Employees document from Prismic
 *
 * - **API ID**: `employees`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type EmployeesDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
  Simplify<EmployeesDocumentData>,
  'employees',
  Lang
>;

/**
 * Item in *Employment Forms → Forms*
 */
export interface EmploymentFormsDocumentDataFormsItem {
  /**
   * Form Name field in *Employment Forms → Forms*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: employment_forms.forms[].form_name
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  form_name: prismic.KeyTextField;

  /**
   * Form Link field in *Employment Forms → Forms*
   *
   * - **Field Type**: Link to Media
   * - **Placeholder**: *None*
   * - **API ID Path**: employment_forms.forms[].form_link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  form_link: prismic.LinkToMediaField;
}

type EmploymentFormsDocumentDataSlicesSlice = never;

/**
 * Content for Employment Forms documents
 */
interface EmploymentFormsDocumentData {
  /**
   * Title field in *Employment Forms*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: employment_forms.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Forms field in *Employment Forms*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: employment_forms.forms[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  forms: prismic.GroupField<Simplify<EmploymentFormsDocumentDataFormsItem>>;

  /**
   * Slice Zone field in *Employment Forms*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: employment_forms.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<EmploymentFormsDocumentDataSlicesSlice> /**
   * Meta Description field in *Employment Forms*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: employment_forms.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Employment Forms*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: employment_forms.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;

  /**
   * Meta Title field in *Employment Forms*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: employment_forms.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;
}

/**
 * Employment Forms document from Prismic
 *
 * - **API ID**: `employment_forms`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type EmploymentFormsDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<
  Simplify<EmploymentFormsDocumentData>,
  'employment_forms',
  Lang
>;

type FooterDocumentDataSlicesSlice = never;

/**
 * Content for Footer documents
 */
interface FooterDocumentData {
  /**
   * Phone Number field in *Footer*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.phone_number
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  phone_number: prismic.KeyTextField;

  /**
   * Email field in *Footer*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.email
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  email: prismic.KeyTextField;

  /**
   * Address Line 1 field in *Footer*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.address_line_1
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  address_line_1: prismic.KeyTextField;

  /**
   * Suite Number field in *Footer*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.suite_number
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  suite_number: prismic.KeyTextField;

  /**
   * Address Line 2 field in *Footer*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.address_line_2
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  address_line_2: prismic.KeyTextField;

  /**
   * Google Maps Link field in *Footer*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.google_maps_link
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  google_maps_link: prismic.KeyTextField;

  /**
   * LinkedIn Link field in *Footer*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.linkedin_link
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  linkedin_link: prismic.KeyTextField;

  /**
   * Facebook Link field in *Footer*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.facebook_link
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  facebook_link: prismic.KeyTextField;

  /**
   * Twitter Link field in *Footer*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.twitter_link
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  twitter_link: prismic.KeyTextField;

  /**
   * Slice Zone field in *Footer*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<FooterDocumentDataSlicesSlice> /**
   * Meta Description field in *Footer*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: footer.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Footer*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: footer.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;

  /**
   * Meta Title field in *Footer*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: footer.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;
}

/**
 * Footer document from Prismic
 *
 * - **API ID**: `footer`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type FooterDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
  Simplify<FooterDocumentData>,
  'footer',
  Lang
>;

/**
 * Item in *Home → Home Page Information*
 */
export interface HomeDocumentDataHomePageInformationItem {
  /**
   * Heading field in *Home → Home Page Information*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: home.home_page_information[].heading
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  heading: prismic.KeyTextField;

  /**
   * Line 1 field in *Home → Home Page Information*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: home.home_page_information[].line_1
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  line_1: prismic.KeyTextField;

  /**
   * Line 2 field in *Home → Home Page Information*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: home.home_page_information[].line_2
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  line_2: prismic.KeyTextField;

  /**
   * Line 3 field in *Home → Home Page Information*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: home.home_page_information[].line_3
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  line_3: prismic.KeyTextField;
}

type HomeDocumentDataSlicesSlice = never;

/**
 * Content for Home documents
 */
interface HomeDocumentData {
  /**
   * Title field in *Home*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: home.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Slogan field in *Home*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: home.slogan
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  slogan: prismic.KeyTextField;

  /**
   * Home Page Information field in *Home*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: home.home_page_information[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  home_page_information: prismic.GroupField<Simplify<HomeDocumentDataHomePageInformationItem>>;

  /**
   * Slice Zone field in *Home*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: home.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<HomeDocumentDataSlicesSlice> /**
   * Meta Description field in *Home*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: home.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Home*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: home.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;

  /**
   * Meta Title field in *Home*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: home.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;
}

/**
 * Home document from Prismic
 *
 * - **API ID**: `home`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomeDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
  Simplify<HomeDocumentData>,
  'home',
  Lang
>;

/**
 * Item in *Job Seekers → What To Expect Steps*
 */
export interface JobSeekersDocumentDataWhatToExpectStepsItem {
  /**
   * Step field in *Job Seekers → What To Expect Steps*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: job_seekers.what_to_expect_steps[].step
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  step: prismic.KeyTextField;
}

type JobSeekersDocumentDataSlicesSlice = ProcessStepsSlice | CareerFieldsSlice;

/**
 * Content for Job Seekers documents
 */
interface JobSeekersDocumentData {
  /**
   * What To Expect Steps field in *Job Seekers*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: job_seekers.what_to_expect_steps[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  what_to_expect_steps: prismic.GroupField<Simplify<JobSeekersDocumentDataWhatToExpectStepsItem>>;

  /**
   * Slice Zone field in *Job Seekers*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: job_seekers.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<JobSeekersDocumentDataSlicesSlice> /**
   * Meta Description field in *Job Seekers*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: job_seekers.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Job Seekers*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: job_seekers.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;

  /**
   * Meta Title field in *Job Seekers*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: job_seekers.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;
}

/**
 * Job Seekers document from Prismic
 *
 * - **API ID**: `job_seekers`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type JobSeekersDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
  Simplify<JobSeekersDocumentData>,
  'job_seekers',
  Lang
>;

export type AllDocumentTypes =
  | ClientDocument
  | CurrentOpeningsDocument
  | EmployeesDocument
  | EmploymentFormsDocument
  | FooterDocument
  | HomeDocument
  | JobSeekersDocument;

/**
 * Primary content in *CareerFields → Primary*
 */
export interface CareerFieldsSliceDefaultPrimary {
  /**
   * Title field in *CareerFields → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: career_fields.primary.title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;
}

/**
 * Primary content in *CareerFields → Items*
 */
export interface CareerFieldsSliceDefaultItem {
  /**
   * Job field in *CareerFields → Items*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: career_fields.items[].job
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  job: prismic.KeyTextField;
}

/**
 * Default variation for CareerFields Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type CareerFieldsSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<CareerFieldsSliceDefaultPrimary>,
  Simplify<CareerFieldsSliceDefaultItem>
>;

/**
 * Slice variation for *CareerFields*
 */
type CareerFieldsSliceVariation = CareerFieldsSliceDefault;

/**
 * CareerFields Shared Slice
 *
 * - **API ID**: `career_fields`
 * - **Description**: CareerFields
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type CareerFieldsSlice = prismic.SharedSlice<'career_fields', CareerFieldsSliceVariation>;

/**
 * Primary content in *InfoBox → Primary*
 */
export interface InfoBoxSliceDefaultPrimary {
  /**
   * Title field in *InfoBox → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: info_box.primary.title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;
}

/**
 * Primary content in *InfoBox → Items*
 */
export interface InfoBoxSliceDefaultItem {
  /**
   * Body field in *InfoBox → Items*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: info_box.items[].body
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  body: prismic.KeyTextField;
}

/**
 * Default variation for InfoBox Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type InfoBoxSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<InfoBoxSliceDefaultPrimary>,
  Simplify<InfoBoxSliceDefaultItem>
>;

/**
 * Slice variation for *InfoBox*
 */
type InfoBoxSliceVariation = InfoBoxSliceDefault;

/**
 * InfoBox Shared Slice
 *
 * - **API ID**: `info_box`
 * - **Description**: InfoBox
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type InfoBoxSlice = prismic.SharedSlice<'info_box', InfoBoxSliceVariation>;

/**
 * Primary content in *Job → Primary*
 */
export interface JobSliceDefaultPrimary {
  /**
   * Job Title field in *Job → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: job.primary.job_title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  job_title: prismic.KeyTextField;

  /**
   * Pay field in *Job → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: job.primary.pay
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  pay: prismic.KeyTextField;

  /**
   * Location field in *Job → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: job.primary.location
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  location: prismic.KeyTextField;

  /**
   * Description field in *Job → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: job.primary.description
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  description: prismic.RichTextField;

  /**
   * Responsibilities field in *Job → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: job.primary.responsibilities
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  responsibilities: prismic.RichTextField;

  /**
   * Qualifications field in *Job → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: job.primary.qualifications
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  qualifications: prismic.RichTextField;
}

/**
 * Default variation for Job Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type JobSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<JobSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Job*
 */
type JobSliceVariation = JobSliceDefault;

/**
 * Job Shared Slice
 *
 * - **API ID**: `job`
 * - **Description**: Job
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type JobSlice = prismic.SharedSlice<'job', JobSliceVariation>;

/**
 * Primary content in *ProcessSteps → Primary*
 */
export interface ProcessStepsSliceDefaultPrimary {
  /**
   * Title field in *ProcessSteps → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: process_steps.primary.title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;
}

/**
 * Primary content in *ProcessSteps → Items*
 */
export interface ProcessStepsSliceDefaultItem {
  /**
   * Step Number field in *ProcessSteps → Items*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: process_steps.items[].step_number
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  step_number: prismic.KeyTextField;

  /**
   * Step Description field in *ProcessSteps → Items*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: process_steps.items[].step_description
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  step_description: prismic.KeyTextField;
}

/**
 * Default variation for ProcessSteps Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ProcessStepsSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<ProcessStepsSliceDefaultPrimary>,
  Simplify<ProcessStepsSliceDefaultItem>
>;

/**
 * Slice variation for *ProcessSteps*
 */
type ProcessStepsSliceVariation = ProcessStepsSliceDefault;

/**
 * ProcessSteps Shared Slice
 *
 * - **API ID**: `process_steps`
 * - **Description**: ProcessSteps
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ProcessStepsSlice = prismic.SharedSlice<'process_steps', ProcessStepsSliceVariation>;

declare module '@prismicio/client' {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig
    ): prismic.Client<AllDocumentTypes>;
  }

  namespace Content {
    export type {
      ClientDocument,
      ClientDocumentData,
      ClientDocumentDataStatsItem,
      ClientDocumentDataSlicesSlice,
      CurrentOpeningsDocument,
      CurrentOpeningsDocumentData,
      CurrentOpeningsDocumentDataSlicesSlice,
      EmployeesDocument,
      EmployeesDocumentData,
      EmployeesDocumentDataEmployeesItem,
      EmployeesDocumentDataSlicesSlice,
      EmploymentFormsDocument,
      EmploymentFormsDocumentData,
      EmploymentFormsDocumentDataFormsItem,
      EmploymentFormsDocumentDataSlicesSlice,
      FooterDocument,
      FooterDocumentData,
      FooterDocumentDataSlicesSlice,
      HomeDocument,
      HomeDocumentData,
      HomeDocumentDataHomePageInformationItem,
      HomeDocumentDataSlicesSlice,
      JobSeekersDocument,
      JobSeekersDocumentData,
      JobSeekersDocumentDataWhatToExpectStepsItem,
      JobSeekersDocumentDataSlicesSlice,
      AllDocumentTypes,
      CareerFieldsSlice,
      CareerFieldsSliceDefaultPrimary,
      CareerFieldsSliceDefaultItem,
      CareerFieldsSliceVariation,
      CareerFieldsSliceDefault,
      InfoBoxSlice,
      InfoBoxSliceDefaultPrimary,
      InfoBoxSliceDefaultItem,
      InfoBoxSliceVariation,
      InfoBoxSliceDefault,
      JobSlice,
      JobSliceDefaultPrimary,
      JobSliceVariation,
      JobSliceDefault,
      ProcessStepsSlice,
      ProcessStepsSliceDefaultPrimary,
      ProcessStepsSliceDefaultItem,
      ProcessStepsSliceVariation,
      ProcessStepsSliceDefault,
    };
  }
}
