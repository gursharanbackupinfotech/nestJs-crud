import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);

    // console.log(host.switchToHttp())

    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace('/\n/g', '')

    if (exception.code == "P2002"){
      const status = HttpStatus.CONFLICT;

      response.status(status).json({
        statusCode: status,
        message: message,
      })
    }
    else{
      super.catch(exception,host);
    }

  }
}

