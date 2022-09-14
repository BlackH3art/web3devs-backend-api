import { readFile, writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

import { HashedMessageInterface } from 'src/interfaces/HashedMessageInterface';
import { Response } from 'express';

@Injectable()
export class WhitelistService {


  async signMessageForContract(hashedMessage: HashedMessageInterface, address: string, res: Response) {

    const { msg } = hashedMessage;

    try {

      const dataFile = await readFile('./src/data/whitelist.json', 'utf8');
      const data = JSON.parse(dataFile);
      
      
      if(data.whitelist.find(whitelistedAddres => address === whitelistedAddres)) {

        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
        const sig = await wallet.signMessage(ethers.utils.arrayify(msg));
    
        res.status(200).json({ whitelisted: true, sig: sig });
      } else {
        
        res.status(404).json({ whitelisted: false, sig: '' });
      }

    } catch (error) {
      res.status(400).json({ whitelisted: false, error: true, msg: 'Problem with signature' });
    }
  }



  async removeFromWhitelist(address: string, res: Response) {

    try {

      const dataFile = await readFile('./src/data/whitelist.json', 'utf8');
      const data = JSON.parse(dataFile);

      if(!data.whitelist.find(whitelistedAddres => address === whitelistedAddres)) {
        return res.status(404).json({ deleted: false, msg: 'Address not found' });
      }

      const newWhitelist = data.whitelist.filter(whitelistedAddres => whitelistedAddres !== address);
      data.whitelist = newWhitelist;

      await writeFile('./src/data/whitelist.json', JSON.stringify(data));

      res.status(200).json({ deleted: true, msg: 'Successfully removed addresss'});
      
    } catch (error) {
      
      res.status(400).json({ deleted: false, msg: 'Problem with removing address'});
    }
  }

}
