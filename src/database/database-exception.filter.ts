import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { DriverError, ErrorResponseBody } from './database.interfaces';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const { status, responseBody } = this.getResponseForException(exception);

    const response = ctx.getResponse<Response>();
    return response.status(status).json(responseBody);
  }

  private getResponseForException(exception: QueryFailedError): {
    status: HttpStatus;
    responseBody: ErrorResponseBody;
  } {
    if (exception.message.match(/duplicate key/)) {
      const { table, detail } = exception.driverError as DriverError;
      const {
        groups: { column, value },
      } = detail.match(/\((?<column>.*)\)=\((?<value>.*)\)/);

      return {
        status: HttpStatus.BAD_REQUEST,
        responseBody: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: this.capitalize(
            `${table} with ${column} equals to ${value} already exists`,
          ),
        },
      };
    }

    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      responseBody: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      },
    };
  }

  private capitalize(word: string) {
    return `${word.at(0).toUpperCase()}${word.slice(1)}`;
  }
}
