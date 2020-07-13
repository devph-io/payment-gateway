import { HttpException, HttpStatus } from '@nestjs/common';

export const INCORRECT_INPUT_FORMAT_EXCEPTION = 'INCORRECT_INPUT_FORMAT';

export class IncorrectInputFormat extends HttpException {
  constructor(exception: object | string, status: HttpStatus) {
    super(
      { message: exception, alias: INCORRECT_INPUT_FORMAT_EXCEPTION },
      status,
    );
  }
}
