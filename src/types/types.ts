export interface IHotel {
  accommodation_type: number;
  accommodation_type_name: string;
  address: string;
  address_trans: string;
  badges: [
    {
      badge_variant: string;
      id: string;
      text: string;
    }
  ];
  block_ids: string[];
  bwallet: {
    hotel_eligibility: string;
  };
  cant_book: number;
  cc1: string;
  cc_required: number;
  checkin: {
    from: string;
    until: string;
  };
  checkout: {
    from: string;
    until: string;
  };
  children_not_allowed: number;
  city: string;
  city_in_trans: string;
  city_name_en: string;
  city_trans: string;
  class: number;
  class_is_estimated: number;
  composite_price_breakdown: {
    all_inclusive_amount: {
      currency: string;
      value: number;
    };
    benefits: [
      {
        badge_variant: string;
        details: string;
        icon: null;
        identifier: string;
        kind: string;
        name: string;
      }
    ];
    discounted_amount: {
      currency: string;
      value: number;
    };
    excluded_amount: {
      currency: string;
      value: number;
    };
    gross_amount: {
      currency: string;
      value: number;
    };
    gross_amount_hotel_currency: {
      currency: string;
      value: number;
    };
    gross_amount_per_night: {
      currency: string;
      value: number;
    };
    included_taxes_and_charges_amount: {
      currency: string;
      value: number;
    };
    items: [
      {
        base: { base_amount: number; kind: string };
        details: string;
        inclusion_type: string;
        item_amount: {
          value: number;
          currency: string;
          kind: string;
          name: string;
        };
      },
      {
        base: { base_amount: number; kind: string };
        details: string;
        inclusion_type: string;
        item_amount: {
          value: number;
          currency: string;
          kind: string;
          name: string;
        };
      },
      {
        base: { base_amount: number; kind: string };
        details: string;
        inclusion_type: string;
        item_amount: {
          value: number;
          currency: string;
          kind: string;
          name: string;
        };
      }
    ];
    net_amount: {
      currency: string;
      value: number;
    };
    product_price_breakdowns: {};
  };
}

export interface ICheck {
  checkinDate: Date | string;
  checkoutDate: Date | string;
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
