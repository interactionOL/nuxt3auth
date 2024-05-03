import { defineNuxtPlugin } from '#app';
import axios from 'axios';

export default defineNuxtPlugin(nuxtApp => {
  const api = axios.create({
    baseURL: 'https://localhost:7244/api/' // Replace with your API's base URL
  });

    //const { data } = useAuth();
    
  // Adding an interceptor to attach the token
    api.interceptors.request.use(config => {
      
        
    // Retrieve your token from wherever it's stored
    

        // If token exists, modify the headers to include it
        //console.log("Access Token", data.value?.access_token);
        // if (data.value?.access_token) {
        //     //console.log("Access Exists", data.value?.access_token);
        const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkZBRDQ3M0VERkRDMzQzOTM4MkFEODAxRDBDQjY0OTNFIiwidHlwIjoiYXQrand0In0.eyJpc3MiOiJodHRwczovL2RlbW8uZHVlbmRlc29mdHdhcmUuY29tIiwibmJmIjoxNzEzOTc4NzA4LCJpYXQiOjE3MTM5Nzg3MDgsImV4cCI6MTcxMzk4MjMwOCwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsImVtYWlsIl0sImFtciI6WyJwd2QiXSwiY2xpZW50X2lkIjoiaW50ZXJhY3RpdmUuY29uZmlkZW50aWFsIiwic3ViIjoiMiIsImF1dGhfdGltZSI6MTcxMzk3ODcwNywiaWRwIjoibG9jYWwiLCJzaWQiOiI0RjA3QThEODEyRjI0Q0FGMTAwM0RFODk4OTA0RjEzNyIsImp0aSI6IjEzMTA5Qjc3MjEzNjBDQjdCQzBBNjMwQTkwQ0Y1MDlDIn0.b4KuryqoBdCK3TxUlaw7eud0Vz_oT1BIEGzTQ71hhvdaZ6jvFCQGckmyaHG72-vZNPvxCRXwnE7FTtGoWE7pUFvYHn_vN8ladaTx_snSg9RHn6oqc8Vr-2VGzZq6X1VXnv0LalP9SruB0jdby1tZSinvjuyvExFgxTg6gtTrANI_r5PnTXpsmgIaBfjy7uz-If4-K8gNd4I8U6tsEcdFgyIg2IN-bMzRZM2ADUGeXBHOJrotfqn6uk2NBzJxPOPWgbFYM0pM1LNZA2SrWyWn2eRP9KnOQa2sNAGdHYC3kz7r_lXBNeXnBGUdzmlbnrF9OYfOUKyvcS4Qd98I9rcwZw'; // Implement token retrieval logic
         config.headers.Authorization = `Bearer ${token}`;
    

    return config;
  }, error => {
    return Promise.reject(error);
  });

  // Make the axios instance available in your application
  nuxtApp.provide('axios', api);
});
