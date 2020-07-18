import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class API {
  protected client: AxiosInstance;
  protected path = "/";

  constructor() {
    this.client = axios.create({
      baseURL: process.env.DATA_SERVER_URL || "http://192.168.8.140:8000",
    });
  }

  get(path: string, config?: AxiosRequestConfig) {
    return this.client
      .get(`${this.path}${path}`, config)
      .then(({ data }) => data)
      .catch(this.handleError);
  }

  post(path: string, data?: any, config?: AxiosRequestConfig) {
    return this.client
      .post(`${this.path}${path}`, data, config)
      .then(({ data }) => data)
      .catch(this.handleError);
  }

  delete(path: string, config?: AxiosRequestConfig) {
    return this.client
      .delete(`${this.path}${path}`, config)
      .then(({ data }) => data)
      .catch(this.handleError);
  }

  protected handleError(err) {
    console.log(err);
    throw err;
  }
}
