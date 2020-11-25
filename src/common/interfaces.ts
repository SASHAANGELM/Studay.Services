import { ResponseStatus } from './enums';

export interface CommonResponse {
  status: ResponseStatus;
  error?: any
}