<template>
  <div class="list">
    <ChainItem
      v-for="chain in sortedChains"
      :key="chain.id"
      :chain="chain.id"
      :status="chain.status"
      :address="address"
      :verification="chain.verification"
      :verifiedChains="verifiedChains"
      @verificationUpdate="update(chain.id, $event)"
      @log="log"
    />
  </div>
</template>

<script setup lang="ts">
import type { Address } from 'viem';
import { computed } from 'vue';

import type { Status } from './BlockStatus.vue';
import ChainItem from './ChainItem.vue';

import type { Chain } from '@/utils/chains';
import type { VerificationStatus } from '@/utils/verification';

const emit = defineEmits<{
  (e: 'updateVerification', chain: Chain, status: VerificationStatus): void;
  (e: 'log', message: string): void;
}>();

const { chains, verifiedChains } = defineProps<{
  address: Address;
  chains: {
    id: Chain;
    status: Status;
    verification: VerificationStatus | null;
  }[];
  verifiedChains: Chain[];
}>();

const sortedChains = computed(() => {
  function statusToPriority(status: Status): number {
    switch (status) {
      case 'success':
        return 0;
      case 'warning':
        return 1;
      case 'error':
        return 2;
      case 'progress':
        return 3;
      case 'empty':
        return 4;
    }
  }

  const sortedChains = [...chains];
  return sortedChains.sort((a, b) => {
    return statusToPriority(a.status) - statusToPriority(b.status);
  });
});

function update(chain: Chain, status: VerificationStatus): void {
  emit('updateVerification', chain, status);
}

function log(message: string): void {
  emit('log', message);
}
</script>

<style scoped>
.list {
  display: flex;
  gap: 8px;
  flex-direction: column;
}
</style>
