import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { MovieDto, MovieUpdateDto } from '../dto/movie.dto';
import { MovieDocument } from '../schemas/movie.schema';
import { paginateResponse } from '../utils/paginate.utils';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel('Movie') private readonly movie: Model<MovieDocument>,
  ) {}

  async getAll(query): Promise<object | MovieDto[] | number> {
    try {
      const { offset, limit } = paginateResponse(query.page, query.limit);

      const movies = await this.movie.find().skip(offset).limit(limit).exec();
      const count = await this.movie.countDocuments();
      return { movies, offset, limit, count };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getMovieById(id: string): Promise<MovieDto> {
    try {
      const foundMovie = await this.movie.findById(id);
      return foundMovie;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async createMovie(createMovieDto: MovieDto): Promise<MovieDto> {
    try {
      const createdMovie = await this.movie.create(createMovieDto);
      return createdMovie;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async updateOne(id: string, movie: MovieUpdateDto): Promise<object> {
    try {
      console.log(movie)
      const updateMovie = await this.movie.updateOne({ _id: id }, movie);
      return updateMovie;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async removeOne(id: string): Promise<object> {
    try {
      const removeMovie = await this.movie.deleteOne({ _id: id });
      return removeMovie;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
