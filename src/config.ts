let baseUrl = "";
if (process.env.NODE_ENV === "production") {
  baseUrl = process.env.VUE_APP_API_URL;
} else {
  baseUrl = process.env.VUE_APP_API_URL;
}

export const apiHost = baseUrl;
