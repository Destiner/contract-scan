// eslint-disable-next-line import/no-extraneous-dependencies
import { defineEventHandler, getQuery } from 'h3';
import ky from 'ky';
import type { Address } from 'viem';

interface GetSourceCodeResponse {
  status: '0' | '1';
  message: 'OK' | 'NOTOK';
  result: {
    SourceCode: string;
    ABI: string;
    ContractName: string;
    CompilerVersion: string;
    OptimizationUsed: string;
    Runs: string;
    ConstructorArguments: string;
    EVMVersion: string;
    Library: string;
    LicenseType: string;
    Proxy: string;
    Implementation: string;
    SwarmSource: string;
  }[];
}

export default defineEventHandler(async (event) => {
  const workerEnv = event.context._platform?.cloudflare?.env;
  const etherscanApiKey = workerEnv
    ? workerEnv.ETHERSCAN_API_KEY
    : process.env.ETHERSCAN_API_KEY;

  if (!etherscanApiKey) {
    return {
      status: 'error',
    };
  }

  const { chain, address } = getQuery<{
    chain: string;
    address: Address;
  }>(event);

  try {
    const json = await ky
      .get('https://api.etherscan.io/v2/api', {
        searchParams: {
          chainid: chain,
          module: 'contract',
          action: 'getsourcecode',
          address,
          apikey: etherscanApiKey,
        },
        timeout: 5_000,
      })
      .json<GetSourceCodeResponse>();

    if (json.status !== '1') {
      return {
        status: 'error',
      };
    }
    if (json.message !== 'OK') {
      return {
        status: 'error',
      };
    }
    const resultItem = json.result[0];
    if (!resultItem) {
      return {
        status: 'error',
      };
    }
    const status = resultItem.SourceCode ? 'verified' : 'unverified';

    return {
      status,
    };
  } catch {
    return {
      status: 'error',
    };
  }
});
