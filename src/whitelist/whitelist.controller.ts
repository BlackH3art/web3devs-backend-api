import { Body, Controller, Get, Inject } from '@nestjs/common';
import { WhitelistService } from './whitelist.service';

import { HashedMessageInterface } from 'src/interfaces/HashedMessageInterface';


@Controller('whitelist')
export class WhitelistController {

  constructor(
    @Inject(WhitelistService) private whitelistService
  ) {}


  @Get('/signature')
  getSignature(
    @Body() hashedMessage: HashedMessageInterface
  ): Promise<any> {
    return this.whitelistService.signMessageForContract(hashedMessage);
  }

  
}
