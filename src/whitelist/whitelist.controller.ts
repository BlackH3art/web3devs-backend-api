import { Body, Controller, Post, Inject } from '@nestjs/common';
import { WhitelistService } from './whitelist.service';

import { HashedMessageInterface } from 'src/interfaces/HashedMessageInterface';


@Controller('whitelist')
export class WhitelistController {

  constructor(
    @Inject(WhitelistService) private whitelistService
  ) {}


  @Post('/signature')
  getSignature(
    @Body() hashedMessage: HashedMessageInterface
  ): Promise<any> {
    return this.whitelistService.signMessageForContract(hashedMessage);
  }

  
}
