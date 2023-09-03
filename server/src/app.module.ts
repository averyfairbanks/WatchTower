import { Module } from '@nestjs/common';
import { MealsModule } from './meals/meals.modules';
import { DbModule } from './db/db.module';

@Module({
  imports: [DbModule, MealsModule],
})
export class AppModule {}
