import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from './dtos/pagination-query.dto';
import {
  FindManyOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { PaginationInterface } from './pagination.interface';

@Injectable()
export class PaginationService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  async paginatedQuery<T extends ObjectLiteral>(
    paginationQueryDto: PaginationQueryDto,
    repository: Repository<T>,
    where?: FindOptionsWhere<T>,
    relations?: string[],
  ): Promise<PaginationInterface<T>> {
    const findOptions: FindManyOptions<T> = {
      where,

      // If the page=1 and limit=10, then skip=0 and take=10, and if page=2 and limit=10, then skip=10 and take=10, and if page=3 and limit=10, then skip=20 and take=10

      // Formulas for page
      // Page 1: (1 - 1) * (10) = 0
      // Page 2: (2 - 1) * (10) = 10
      // Page 3: (3 - 1) * (10) = 20
      // Page 4: (4 - 1) * (10) = 30

      // Formulas for skip
      // Page 1: (page - 1) * limit
      skip:
        ((paginationQueryDto.page ?? 1) - 1) * (paginationQueryDto.limit ?? 10), // skip first 10 resources
      take: paginationQueryDto.limit ?? 10, // take next 10 resources
    };

    if (where) {
      findOptions.where = where;
    }

    if (relations) {
      findOptions.relations = relations;
    }

    const result = await repository.find(findOptions);

    // For meta
    const totalItems = await repository.count(findOptions);
    const totalPages = Math.ceil(totalItems / (paginationQueryDto.limit ?? 10));

    // For links
    const currentPage = paginationQueryDto.page;
    const nextPage =
      currentPage === totalPages
        ? currentPage
        : (paginationQueryDto.page ?? 1) + 1;
    const previousPage =
      currentPage === 1 ? currentPage : (paginationQueryDto.page ?? 1) - 1;
    //const baseUrl = this.request.protocol + '://' + this.request.get('host');
    const baseUrl1 =
      this.request.protocol + '://' + this.request.headers.host + '/';
    //console.log(baseUrl);
    console.log(baseUrl1);
    const newUrl = new URL(this.request.url, baseUrl1);
    console.log(this.request.url);
    console.log(newUrl);

    const response: PaginationInterface<T> = {
      data: result,
      meta: {
        itemsPerPage: paginationQueryDto.limit ?? 10,
        totalItems,
        currentPage: paginationQueryDto.page ?? 1,
        totalPages,
        itemCount: result.length,
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?page=1&limit=${paginationQueryDto.limit}`,
        last: `${newUrl.origin}${newUrl.pathname}?page=${totalPages}&limit=${paginationQueryDto.limit}`,
        current: `${newUrl.origin}${newUrl.pathname}?page=${currentPage}&limit=${paginationQueryDto.limit}`,
        next: `${newUrl.origin}${newUrl.pathname}?page=${nextPage}&limit=${paginationQueryDto.limit}`,
        previous: `${newUrl.origin}${newUrl.pathname}?page=${previousPage}&limit=${paginationQueryDto.limit}`,
      },
    };

    return response;
  }
}
