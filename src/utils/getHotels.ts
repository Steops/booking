export const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "6e210490a6msh80863832c6a73d5p180784jsnbfc04599e2f8",
    "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
  },
};

interface IRequestHotel {
  destId: string;
  checkinDate: Date | string;
  checkoutDate: Date | string;
  room: number;
  guests: number;
}

export const getHotels = async (requestHotel: IRequestHotel) => {
  let dataURL = `https://booking-com.p.rapidapi.com/v1/hotels/search?adults_number=${requestHotel.guests}&locale=en-gb&checkin_date=${requestHotel.checkinDate}&filter_by_currency=AED&dest_type=city&order_by=popularity&room_number=${requestHotel.room}&checkout_date=${requestHotel.checkoutDate}&dest_id=${requestHotel.destId}&units=metric&include_adjacency=true&children_ages=5%2C0&page_number=0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&children_number=1`;
  const data = await fetch(dataURL, options);
  const response = await data.json();
  return response;
};
