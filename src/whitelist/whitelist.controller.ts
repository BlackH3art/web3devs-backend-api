import { Body, Controller, Post, Inject, Param, Res, Delete } from '@nestjs/common';
import { WhitelistService } from './whitelist.service';

import { HashedMessageInterface } from 'src/interfaces/HashedMessageInterface';
import { Response } from 'express';


@Controller('whitelist')
export class WhitelistController {

  constructor(
    @Inject(WhitelistService) private whitelistService
  ) {}


  @Post('/:address')
  getSignature(
    @Param('address') address: string,
    @Body() hashedMessage: HashedMessageInterface,
    @Res() res: Response,
  ): Promise<any> {
    return this.whitelistService.signMessageForContract(hashedMessage, address, res);
  }


  @Delete(':address')
  removeFromWhitelist(
    @Param('address') address: string,
    @Res() res: Response
  ): Promise<any> {
    return this.whitelistService.removeFromWhitelist(address, res);
  }

  
}
