import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';


@Injectable()
export class PrismaService extends PrismaClient {

    public generateSlug(title:string) : string{
        return slugify(title,{lower:true,strict:true})
    }

}
