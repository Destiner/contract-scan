<template>
  <div class="page">
    <div class="content">
      <div class="header">
        <RouterLink to="/">
          <div class="link">← Go Back</div>
        </RouterLink>
        <div class="header-details">
          <div class="subtitle">{{ label }}</div>
          <div class="title">
            <h1>{{ address }}</h1>
            <ButtonCopy :value="address" />
          </div>
        </div>
      </div>
      <div class="details">
        <BlockInfo />
        <div class="verification">
          <ScanButton
            :disabled="checkingVerification"
            @click="checkVerification"
          >
            Check verification status
          </ScanButton>
          <div
            v-if="checkingVerification"
            class="verification-status"
          >
            Checking {{ checkedVerifications }} / {{ CHAINS.length }}
          </div>
        </div>
        <ChainList
          :address
          :chains
          :verifiedChains="verifiedChains"
          @updateVerification="updateVerification"
          @log="addLog"
        />
        <div
          v-if="logs.length"
          class="logs"
        >
          <div
            v-for="(log, i) in logs"
            :key="i"
            class="log"
          >
            {{ log }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { keccak256, type Address, type Hex } from 'viem';
import { computed, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import ScanButton from '@/components/__common/ScanButton.vue';
import BlockInfo from '@/components/contract/BlockInfo.vue';
import type { Status } from '@/components/contract/BlockStatus.vue';
import ButtonCopy from '@/components/contract/ButtonCopy.vue';
import ChainList from '@/components/contract/ChainList.vue';
import addresses from '@/data/addresses.json';
import cache from '@/data/cache.json';
import { type Chain, CHAINS, getCode as getChainCode } from '@/utils/chains';
import type { VerificationStatus } from '@/utils/verification';
import { checkContractVerification } from '@/utils/verification';

const route = useRoute();

const address = computed(
  () => (route.params.address as Address).toLowerCase() as Address,
);
const label = computed(
  () =>
    (addresses as Record<Address, string | undefined>)[address.value] ||
    'Contract',
);

useHead({
  meta: [
    {
      property: 'og:image',
      content: `https://contractscan.xyz/api/og?address=${address.value}`,
    },
    {
      property: 'twitter:image',
      content: `https://contractscan.xyz/api/og?address=${address.value}`,
    },
  ],
});

const checkingVerification = ref(false);
const verificationStatus = ref<Record<number, VerificationStatus | null>>({});
const checkedVerifications = computed(
  () => Object.keys(verificationStatus.value).length,
);
const verifiedChains = computed(() =>
  CHAINS.filter((chain) => verificationStatus.value[chain] === 'verified'),
);
const logs = ref<string[]>([]);
async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function checkVerification(): Promise<void> {
  verificationStatus.value = {};
  checkingVerification.value = true;
  for (const chain of CHAINS) {
    const codeHash = codeHashes.value[chain];
    const status = codeHash
      ? await checkContractVerification(address.value, chain)
      : null;
    if (status !== null) {
      await sleep(500);
    }
    verificationStatus.value[chain] = status;
  }
  checkingVerification.value = false;
}

function updateVerification(chain: Chain, status: VerificationStatus): void {
  verificationStatus.value[chain] = status;
}

function addLog(message: string): void {
  logs.value.push(message);
}

async function getCodeHash(chain: Chain): Promise<Hex | null | undefined> {
  const cachedCodeHash =
    (cache as Record<Address, Partial<Record<Chain, Hex>>>)[address.value]?.[
      chain
    ] || null;
  if (cachedCodeHash) {
    return cachedCodeHash;
  }
  const code = await getChainCode(chain, address.value);
  if (code) {
    return keccak256(code);
  }
  return code;
}

const codeHashes = ref<Partial<Record<Chain, Hex | null | undefined>>>({});
function getCodeStatus(
  referenceCodeHash: Hex | undefined,
  codeHash: Hex | null | undefined,
): Status {
  return codeHash
    ? referenceCodeHash === codeHash
      ? 'success'
      : 'warning'
    : codeHash === null
      ? 'empty'
      : 'error';
}
const chains = computed(() => {
  // Use the first non-null code hash as reference
  const referenceCodeHash = Object.values(codeHashes.value).find(
    (codeHash) => codeHash !== null && codeHash !== undefined,
  );
  return CHAINS.map((chain) => ({
    id: chain,
    status:
      chain in codeHashes.value
        ? getCodeStatus(referenceCodeHash, codeHashes.value[chain])
        : 'progress',
    verification: verificationStatus.value[chain] || null,
  }));
});
watch(
  address,
  () => {
    fetchCode();
  },
  {
    immediate: true,
  },
);
async function fetchCode(): Promise<void> {
  codeHashes.value = {};
  // Get cached code first
  const cachedCodeHashes = (
    cache as Record<Address, Partial<Record<Chain, Hex>>>
  )[address.value];
  for (const chainKey in cachedCodeHashes) {
    const chain = parseInt(chainKey) as Chain;
    const codeHash = cachedCodeHashes[chain];
    codeHashes.value[chain] = codeHash;
  }
  // Split chains into batches to query contract code in parallel
  const batchSize = 10;
  const batchedChains: Chain[][] = [];
  for (let i = 0; i < chains.value.length; i += batchSize) {
    batchedChains.push(
      chains.value.slice(i, i + batchSize).map((chain) => chain.id),
    );
  }
  // Fetch contract code
  for (const batch of batchedChains) {
    await Promise.all(
      batch.map(async (chain) => {
        const codeHash = await getCodeHash(chain);
        codeHashes.value[chain] = codeHash;
      }),
    );
  }
}
</script>

<style scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  margin: 0 16px;
}

.content {
  display: flex;
  gap: 60px;
  flex-direction: column;
  width: 840px;
  max-width: 100%;
  height: 100%;
  padding-top: 24px;
}

@media (width >= 768px) {
  .content {
    gap: 150px;
    padding-top: 96px;
  }
}

.header {
  display: flex;
  gap: 24px;
  flex-direction: column;
}

a {
  text-decoration: none;
}

.link {
  opacity: 0.6;
  color: var(--color-text-secondary);
  font-size: var(--font-size-tiny);
  cursor: pointer;
}

.link:hover {
  opacity: 1;
}

.header-details {
  display: flex;
  gap: 8px;
  flex-direction: column;
}

.subtitle {
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
}

.title {
  display: flex;
  gap: 8px;
  align-items: center;
}

h1 {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--font-size-medium);
  font-weight: normal;
}

@media (width >= 768px) {
  h1 {
    font-size: var(--font-size-big);
  }
}

.details {
  display: flex;
  gap: 30px;
  flex-direction: column;
}

.verification {
  display: flex;
  align-items: center;
  gap: 16px;
}

.verification-status {
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
}

.logs {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: var(--font-size-small);
  margin-top: 16px;
}
</style>
