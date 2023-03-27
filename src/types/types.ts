export interface ICheck {
  checkinDate: Date | string;
  checkoutDate: Date | string;
}

export interface IPosition {
  lat: number | undefined;
  lon: number | undefined;
}

export interface IRequestHotel {
  city: string;
  destId: string;
  checkinDate: Date | string;
  checkoutDate: Date | string;
  room: string;
  guests: string;
}

export interface IRoomInput {
  setRequestHotel: any;
  requestHotel: IRequestHotel;
}

/* Types fetch hotels */

export interface IHotelData {
  count: number;
  extended_count: number;
  map_bounding_box: MapBoundingBox;
  primary_count: number;
  result: IHotel[];
  room_distibution: RoomDistribution;
  search_radius: number;
  sort: Sort[];
  total_count_with_filters: number;
  unfiltered_count: number;
  unfiltered_primary_count: number;
}

export interface IHotel {
  preferred_plus: number;
  is_mobile_deal: number;
  accommodation_type: number;
  address: string;
  native_ad_id: string;
  districts: string;
  badges: any[];
  is_geo_rate: string;
  is_genius_deal: number;
  review_score: number;
  price_breakdown: Pricebreakdown;
  hotel_facilities: string;
  city_trans: string;
  city_name_en: string;
  currencycode: string;
  native_ads_cpc: number;
  composite_price_breakdown: Compositepricebreakdown;
  selected_review_topic?: any;
  soldout: number;
  checkout: Checkout;
  urgency_message: string;
  type: string;
  class: number;
  preferred: number;
  extended: number;
  distance_to_cc: string;
  district_id: number;
  distance_to_cc_formatted: string;
  updated_checkout?: any;
  is_wholesaler_candidate: number;
  is_smart_deal: number;
  countrycode: string;
  genius_discount_percentage: number;
  hotel_id: number;
  review_nr: number;
  address_trans: string;
  district: string;
  city_in_trans: string;
  zip: string;
  hotel_has_vb_boost: number;
  ufi: number;
  wishlist_count: number;
  updated_checkin?: any;
  price_is_final: number;
  matching_units_configuration: Matchingunitsconfiguration;
  checkin: Checkout;
  main_photo_id: number;
  is_no_prepayment_block: number;
  id: string;
  main_photo_url: string;
  in_best_district: number;
  country_trans: string;
  is_city_center: number;
  review_recommendation: string;
  is_beach_front: number;
  distance: string;
  latitude: number;
  is_free_cancellable: number;
  class_is_estimated: number;
  review_score_word: string;
  bwallet: Bwallet;
  min_total_price: number;
  has_swimming_pool: number;
  hotel_include_breakfast: number;
  hotel_name_trans: string;
  distances: Distance[];
  mobile_discount_percentage: number;
  timezone: string;
  cc_required: number;
  default_language: string;
  currency_code: string;
  block_ids: string[];
  city: string;
  cc1: string;
  cant_book?: any;
  native_ads_tracking: string;
  hotel_name: string;
  unit_configuration_label: string;
  children_not_allowed?: any;
  accommodation_type_name: string;
  url: string;
  default_wishlist_name: string;
  longitude: number;
  max_photo_url: string;
  max_1440_photo_url: string;
}

interface MapBoundingBox {
  ne_lat: number;
  ne_long: number;
  sw_lat: number;
  sw_long: number;
}
interface RoomDistribution {
  children: any[];
  adults: string;
}
interface Sort {
  id: string;
  name: string;
}

interface Distance {
  text: string;
  icon_name: string;
  icon_set?: any;
}
interface Bwallet {
  hotel_eligibility: number;
}
interface Matchingunitsconfiguration {
  matching_units_common_config: Matchingunitscommonconfig;
}
interface Matchingunitscommonconfig {
  localized_area?: any;
  unit_type_id: number;
}
interface Checkout {
  from: string;
  until: string;
}
interface Compositepricebreakdown {
  strikethrough_amount: Strikethroughamount;
  gross_amount: Strikethroughamount;
  all_inclusive_amount: Strikethroughamount;
  excluded_amount: Strikethroughamount;
  items: Item[];
  product_price_breakdowns: Productpricebreakdown[];
  gross_amount_per_night: Strikethroughamount;
  strikethrough_amount_per_night: Strikethroughamount;
  gross_amount_hotel_currency: Strikethroughamount;
  discounted_amount: Strikethroughamount;
  included_taxes_and_charges_amount: Strikethroughamount;
  net_amount: Strikethroughamount;
  benefits: any[];
}
interface Productpricebreakdown {
  strikethrough_amount: Strikethroughamount;
  all_inclusive_amount: Strikethroughamount;
  gross_amount: Strikethroughamount;
  excluded_amount: Strikethroughamount;
  items: Item[];
  net_amount: Strikethroughamount;
  included_taxes_and_charges_amount: Strikethroughamount;
  benefits: any[];
  gross_amount_per_night: Strikethroughamount;
  strikethrough_amount_per_night: Strikethroughamount;
  gross_amount_hotel_currency: Strikethroughamount;
  discounted_amount: Strikethroughamount;
}
interface Item {
  item_amount: Strikethroughamount;
  details: string;
  inclusion_type?: string;
  base: Base;
  name: string;
  kind: string;
  identifier?: string;
}
interface Base {
  kind: string;
  base_amount?: number;
  percentage?: number;
}
interface Strikethroughamount {
  value: number;
  currency: string;
}
interface Pricebreakdown {
  has_incalculable_charges: number;
  sum_excluded_raw: string;
  has_fine_print_charges: number;
  currency: string;
  gross_price: number;
  all_inclusive_price: number;
  has_tax_exceptions: number;
}
