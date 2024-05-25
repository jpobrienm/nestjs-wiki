import { Module } from '@nestjs/common';
import { Reference } from './entities/reference.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Reference])],
})
export class ReferenceModule {}
