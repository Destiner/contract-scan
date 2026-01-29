import { writeFileSync } from 'fs';
import { join } from 'path';

import { keccak256, type Address, type Hex } from 'viem';

import addresses from '@/data/addresses.json';
import cache from '@/data/cache.json';
import { type Chain, CHAINS, getCode as getChainCode } from '@/utils/chains';

async function run(): Promise<void> {
  const newCache: Record<Address, Partial<Record<Chain, string>>> = {};
  for (const addressString in addresses) {
    const index = Object.keys(addresses).indexOf(addressString);
    if (index % 10 === 0) {
      console.log(`${index}/${Object.keys(addresses).length}`);
    }
    const address = addressString as Address;
    newCache[address] = {};
    for (const chain of CHAINS) {
      const addressCache = (
        cache as Record<Address, Partial<Record<Chain, Hex>>>
      )[address];
      if (addressCache && addressCache[chain]) {
        const newChainCache = newCache[address as Address];
        if (newChainCache) {
          newChainCache[chain] = addressCache[chain];
        }
        continue;
      }
      const code = await getChainCode(chain, address);
      if (!code) {
        continue;
      }
      const newChainCache = newCache[address as Address];
      if (newChainCache) {
        newChainCache[chain] = keccak256(code);
      }
    }
  }
  const cacheFilePath = join(__dirname, '../app/data/cache.json');
  writeFileSync(cacheFilePath, JSON.stringify(newCache, null, 2) + '\n');
  console.log(`Cache updated at ${cacheFilePath}`);
}

run();
