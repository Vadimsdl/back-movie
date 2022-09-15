import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseGuards,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { MovieService } from '../services/movie.service';
import { JwtAuthGuard } from '../guards/auth-jwt.guard';
import { MovieDto, MovieUpdateDto } from '../dto/movie.dto';

@Controller('/movie')
export class MovieController {
  constructor(
    @Inject(MovieService) private readonly movieService: MovieService,
  ) {}

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get()
  private async getAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.movieService.getAll({
      page: Number(page),
      limit: Number(limit),
    });
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  private async getOne(@Param('id') id: string) {
    const movie = await this.movieService.getMovieById(id);
    if (!movie) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }
    return movie;
  }

  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @Post('/add')
  private async create(@Body() data: MovieDto) {
    return await this.movieService.createMovie(data);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  private async updateOne(
    @Param('id') id: string,
    @Body() data: MovieUpdateDto,
  ) {
    return await this.movieService.updateOne(id, data);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  private async deleteOne(@Param('id') id: string) {
    return await this.movieService.removeOne(id);
  }
}
