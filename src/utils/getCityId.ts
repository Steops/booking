export const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "6e210490a6msh80863832c6a73d5p180784jsnbfc04599e2f8",
    "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
  },
};

export const getCityId = async (city: string) => {
  let dataURL = `https://booking-com.p.rapidapi.com/v1/hotels/locations?name=${city}&locale=en-gb`;
  const data = await fetch(dataURL, options);
  const response = await data.json();
  return response;
};
