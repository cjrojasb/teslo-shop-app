import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  // imports: [ConfigModule], TODO: this is for get access to environment variables in controller
  imports: [ConfigModule],
})
export class FilesModule {}
