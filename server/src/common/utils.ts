import { HttpException, HttpStatus } from '@nestjs/common';

export const decode = (encodedId: string) => {
  try {
    return parseInt(atob(encodedId));
  } catch (err) {
    if (err instanceof DOMException) {
      throw new HttpException(
        "ID couldn't be decoded.",
        HttpStatus.BAD_REQUEST,
      );
    }
    throw new HttpException(
      'UNKNOWN exception in decode method.',
      HttpStatus.AMBIGUOUS,
    );
  }
};
