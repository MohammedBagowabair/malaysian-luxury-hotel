export const WA_NUMBER = "601151198497";
export const WA_DISPLAY = "+60 11-5119 8497";
export const WA_DEFAULT_MSG = "Hello Serai Tanjung, I'd like to ask about a stay.";
export const waUrl = (text: string = WA_DEFAULT_MSG) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
export const WA_URL = waUrl();
