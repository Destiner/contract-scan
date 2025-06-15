import ky from 'ky';
import type { Address } from 'viem';

import type { Chain } from '@/utils/chains';

interface CheckVerificationResponse {
  status: 'verified' | 'unverified' | 'error';
}

type VerificationStatus = 'verified' | 'unverified' | 'unknown';

interface VerifyContractResponse {
  status: 'ok' | 'error';
}

async function checkContractVerification(
  address: Address,
  chain: Chain,
): Promise<VerificationStatus> {
  const checkResponse = await ky
    .get('/api/check-verification', {
      searchParams: {
        chain: chain.toString(),
        address,
      },
    })
    .json<CheckVerificationResponse>();

  if (checkResponse.status === 'error') {
    return 'unknown';
  }
  return checkResponse.status;
}

async function verifyContract(
  address: Address,
  chain: Chain,
  sourceChain: Chain,
): Promise<boolean> {
  const verifyResponse = await ky
    .post('/api/verify', {
      json: {
        chain: chain.toString(),
        address,
        sourceChain: sourceChain.toString(),
      },
    })
    .json<VerifyContractResponse>();

  return verifyResponse.status === 'ok';
}

export { checkContractVerification, verifyContract };
export type { VerificationStatus };
