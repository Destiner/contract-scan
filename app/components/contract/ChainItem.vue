<template>
  <div class="item">
    <IconCheck
      v-if="verification === 'verified'"
      class="verification icon"
    />
    <IconCross
      v-else-if="verification === 'unverified'"
      class="verification icon"
    />
    <IconQuestionMark
      v-else-if="verification === 'unknown'"
      class="verification icon icon-toned-down"
    />
    <BlockStatus
      :status="status"
      class="block"
    >
      <div class="item-details">
        {{ getChainName(chain) }}
        <a
          v-if="explorerUrl"
          :href="explorerUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconExternalLink class="icon" />
        </a>
      </div>
    </BlockStatus>
    <ScanButton
      v-if="verification !== null && verification === 'unverified'"
      :disabled="verifying"
      class="verify-button"
      @click="verify"
    >
      {{ verifying ? 'Verifying...' : 'Verify' }}
    </ScanButton>
  </div>
</template>

<script setup lang="ts">
import type { Address } from 'viem';
import { computed, ref } from 'vue';

import BlockStatus, { type Status } from './BlockStatus.vue';

import ScanButton from '@/components/__common/ScanButton.vue';
import IconCheck from '@/components/__common/icon/Check.vue';
import IconCross from '@/components/__common/icon/Cross.vue';
import IconExternalLink from '@/components/__common/icon/ExternalLink.vue';
import IconQuestionMark from '@/components/__common/icon/QuestionMark.vue';
import {
  type Chain,
  getChainName,
  getAddressExplorerUrl,
} from '@/utils/chains';
import { verifyContract, type VerificationStatus } from '@/utils/verification';

const props = defineProps<{
  address: Address;
  chain: Chain;
  status: Status;
  verification: VerificationStatus | null;
  verifiedChains: Chain[];
}>();

const emit = defineEmits<{
  'verification-update': [status: VerificationStatus];
  log: [message: string];
}>();

const { address, chain, verification, verifiedChains } = props;

const explorerUrl = computed(() => getAddressExplorerUrl(chain, address));
const verifying = ref(false);

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function verify(): Promise<void> {
  verifying.value = true;
  let attempts = 0;
  for (const source of verifiedChains) {
    emit('log', `Trying ${getChainName(source)} -> ${getChainName(chain)}`);
    const { success, error } = await verifyContract(address, chain, source);
    if (success) {
      emit('verification-update', 'verified');
      emit(
        'log',
        `Verified on ${getChainName(chain)} using ${getChainName(source)}`,
      );
      verifying.value = false;
      return;
    }
    if (attempts < 3 && error) {
      emit('log', `Error: ${error}`);
    }
    attempts += 1;
    await sleep(300);
  }
  emit('verification-update', 'unverified');
  emit('log', `Failed to verify on ${getChainName(chain)}`);
  verifying.value = false;
}
</script>

<style scoped>
.item {
  display: flex;
  position: relative;
  align-items: center;
}

.item-details {
  display: flex;
  gap: 8px;
  align-items: center;
}

a {
  color: inherit;
  text-decoration: none;
}

.icon {
  width: 15px;
  height: 15px;
}

.icon-toned-down {
  opacity: 0.4;
}

.verification {
  position: absolute;
  left: -20px;
}

.verify-button {
  margin-left: 8px;
}
</style>
