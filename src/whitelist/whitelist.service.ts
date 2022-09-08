import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

import { HashedMessageInterface } from 'src/interfaces/HashedMessageInterface';

@Injectable()
export class WhitelistService {


  async signMessageForContract(hashedMessage: HashedMessageInterface) {

    const { msg } = hashedMessage;

    try {
      
      const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
      const sig = await wallet.signMessage(ethers.utils.arrayify(msg));
  
      return {
        sig,
      };

    } catch (error) {
      console.error(error);
      return { error };
    }
  }
}
