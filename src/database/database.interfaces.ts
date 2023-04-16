export interface DriverError {
  length: number;
  severity: string;
  code: string;
  detail: string;
  schema: string;
  table: string;
  constraint: string;
}

export interface ErrorResponseBody {
  statusCode: number;
  message: string;
  [key: string]: any;
}
