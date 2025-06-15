import { defineEventHandler, readBody } from 'h3';
import ky from 'ky';
import type { Address } from 'viem';

interface VerifyRequestBody {
  chain: string;
  address: Address;
  sourceChain: string;
}

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

interface VerifySourceCodeResponse {
  status: '0' | '1';
  message: string;
  result: string;
}

export default defineEventHandler(async (event) => {
  const etherscanApiKey = process.env.ETHERSCAN_API_KEY;
  if (!etherscanApiKey) {
    return { status: 'error' };
  }

  const { chain, address, sourceChain } =
    (await readBody<VerifyRequestBody>(event)) || {};

  if (!chain || !address || !sourceChain) {
    return { status: 'error' };
  }

  try {
    const source = await ky
      .get('https://api.etherscan.io/v2/api', {
        searchParams: {
          chainid: sourceChain,
          module: 'contract',
          action: 'getsourcecode',
          address,
          apikey: etherscanApiKey,
        },
        timeout: 5_000,
      })
      .json<GetSourceCodeResponse>();

    if (source.status !== '1' || source.message !== 'OK') {
      return { status: 'error' };
    }

    const data = source.result[0];
    if (!data || !data.SourceCode) {
      return { status: 'error' };
    }

    const verify = await ky
      .post('https://api.etherscan.io/v2/api', {
        searchParams: {
          chainid: chain,
          module: 'contract',
          action: 'verifysourcecode',
          apikey: etherscanApiKey,
          contractaddress: address,
          sourceCode: data.SourceCode,
          contractname: data.ContractName,
          compilerversion: data.CompilerVersion,
          optimizationUsed: data.OptimizationUsed,
          runs: data.Runs,
          constructorArguements: data.ConstructorArguments,
          evmVersion: data.EVMVersion,
          licenseType: data.LicenseType,
        },
        timeout: 5_000,
      })
      .json<VerifySourceCodeResponse>();

    if (verify.status === '1') {
      return { status: 'ok' };
    }
    return { status: 'error' };
  } catch {
    return { status: 'error' };
  }
});
