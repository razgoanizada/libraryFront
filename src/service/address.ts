import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const baseUrl = "https://data.gov.il/api/3";

const client = axios.create({ baseURL: baseUrl });

const onFailure = (error: any) => {
  throw error;
};

const onSuccess = (res: AxiosResponse) => {
  return res;
};

export const request = (config: AxiosRequestConfig) => {
  return client(config).catch(onFailure).then(onSuccess);
};

export const City = () =>
  request({
    url: `/action/datastore_search?resource_id=8f714b6f-c35c-4b40-a0e7-547b675eee0e&limit=5000`,
  });
