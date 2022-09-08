import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WhitelistController } from './whitelist/whitelist.controller';
import { WhitelistService } from './whitelist/whitelist.service';
import { WhitelistModule } from './whitelist/whitelist.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    WhitelistModule,
  ],
  controllers: [AppController, WhitelistController],
  providers: [AppService, WhitelistService],
})
export class AppModule {}
