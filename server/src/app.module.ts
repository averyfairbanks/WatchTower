import { Module } from '@nestjs/common';
import { MealsModule } from './meals/meals.modules';

@Module({
  imports: [MealsModule],
})
export class AppModule {}
