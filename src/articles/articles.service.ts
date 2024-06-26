import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  
  constructor(private prisma: PrismaService){}

  async create(article: CreateArticleDto) {
    const slug = this.prisma.generateSlug(article.title);
    return await this.prisma.article.create({data :{...article,slug}});
  }

  async findAll() {
    return await this.prisma.article.findMany({where:{published:true}});
  }

  async findDrafts(){
    return await this.prisma.article.findMany({where:{published:false}})
  }

  async findOne(id: number) {
    return await this.prisma.article.findUnique(
      {
        where:{id},
        include:{
          author:true
        }
      }
      );
  }

  async findBySlug(slug: string){
    return await this.prisma.article.findUnique(
      {
        where:{slug},
        include:{
          author:true
        }
      }
    )
  }

  async update(id: number, updateArticle: UpdateArticleDto) {
    
    const article = await this.prisma.article.findUnique({where:{id}});
    
    let slug = article.slug;

    if(updateArticle.title){
      slug = this.prisma.generateSlug(updateArticle.title);
      updateArticle['slug'] = slug;
    }
    
    return await this.prisma.article.update({where:{id},data:{...updateArticle,slug}});
  }

  async remove(id: number) {
    return await this.prisma.article.delete({where:{id}});
  }
}
