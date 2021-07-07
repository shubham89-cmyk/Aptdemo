import axios from "axios";

export const Service = axios.create({
  baseURL: "https://api.appetizar.io/api",
  rejectUnauthorized: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNmIwNGZmZWI1MWJhYTkzMDIyMGZiNCIsImVtYWlsIjoiZHVtbXlfZHJpdmVyQHlvcG1haWwuY29tIiwidXNlclR5cGUiOiJkcml2ZXIiLCJpYXQiOjE2MDMxNjUwNDN9.p4R4be2ySxViRBrgZgZOeU3LwT6n_MSeCzAWmqNfnug"
  },
});