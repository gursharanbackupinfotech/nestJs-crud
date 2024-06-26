import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';
import { JwtAuthGaurd } from 'src/auth/jwt-auth.gaurd';
import { Public } from 'src/public.decorator';

@Controller('articles')
@UseGuards(JwtAuthGaurd)
@ApiBearerAuth()
@ApiTags('Articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({type:ArticleEntity})
  async create(@Body() createArticleDto: CreateArticleDto) {
    return new ArticleEntity(
      await this.articlesService.create(createArticleDto)
    ) 
  }

  @Get()
  @ApiOkResponse({type:ArticleEntity, isArray:true})
  async findAll() {
    return this.articlesService.findAll();
  }

  @Get('drafts')
  @ApiOkResponse({type:ArticleEntity, isArray:true})
  async findDrafts(){
    return this.articlesService.findDrafts();
  }

  @Get(':id')
  @ApiOkResponse({type:ArticleEntity})
  async findOne(@Param('id',ParseIntPipe) id: number) {
    const article = await this.articlesService.findOne(id);

    if(!article){
      throw new NotFoundException(`Article with ${id} does not exists`)
    }

    return new ArticleEntity(
      article
    ) 
  }

  @Get('slug/:slug')
  @Public()
  @ApiOkResponse({type:ArticleEntity})
  async findBySlug(@Param('slug') slug: string) {
    return new ArticleEntity(
      await this.articlesService.findBySlug(slug)
    ) 
  }

  @Patch(':id')
  @ApiOkResponse({type:ArticleEntity})
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateArticleDto: UpdateArticleDto) {
    const article = await this.articlesService.findOne(id);

    if(!article){
      throw new NotFoundException(`Article with ${id} does not exists`)
    }
    
    return new ArticleEntity(
      await this.articlesService.update(id, updateArticleDto)
    ) 
  }

  @Delete(':id')
  @ApiOkResponse({type:ArticleEntity})
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new ArticleEntity(
      await this.articlesService.remove(id)
    ) 
  }
}
