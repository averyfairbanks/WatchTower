import { Injectable } from '@nestjs/common';
import { PagingDetails } from 'src/models/paging-details.model';
import { DataSource } from 'typeorm';
import { GetPagingDetailsDto } from './dto/get-paging-details.dto';

@Injectable()
export class PaginationService {
  constructor(private readonly dataSource: DataSource) {}

  getPagingDetails(
    getPageDetailsDto: GetPagingDetailsDto,
  ): Promise<PagingDetails> {
    const { type, tableName, wheres } = getPageDetailsDto;

    const qb = this.dataSource
      .createQueryBuilder()
      .select('min(id)', 'min')
      .addSelect('max(id)', 'max')
      .addSelect('count(id)', 'total')
      .from(type, tableName);

    wheres.forEach(({ whereStatement, argument }) => {
      qb.andWhere(whereStatement, argument);
    });

    return qb.getRawOne();
  }
}
