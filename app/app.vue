<template>
  <div class="app">
    <header>
      <a
        href="https://github.com/scope-sh/contract-scan"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconGitHub class="icon" />
      </a>
    </header>
    <!-- eslint-disable-next-line vue/no-undef-components -->
    <NuxtPage />
    <footer />
  </div>
</template>

<script setup lang="ts">
import '@fontsource-variable/inter';
import '@fontsource-variable/inconsolata';

import IconGitHub from '@/components/__common/icon/GitHub.vue';
</script>

<!-- eslint-disable-next-line vue/enforce-style-attribute -->
<style>
:root {
  --color-text-primary: #ededed;
  --color-text-secondary: #a1a1a1;
  --color-text-tertiary: #7b7b7b;
  --color-text-placeholder: #4d4d4d;
  --color-background-primary: #111115;
  --color-background-secondary: #171717;
  --color-background-tertiary: #1b1b1b;
  --color-border-primary: #353535;
  --color-border-secondary: #4d4d4d;
  --color-error: #ff7375;
  --border-radius-tiny: 2px;
  --border-radius-small: 4px;
  --border-radius-medium: 8px;
  --font-size-tiny: 12px;
  --font-size-small: 14px;
  --font-size-medium: 16px;
  --font-size-big: 20px;
  --font-sans:
    'Inter Variable', -apple-system, 'BlinkMacSystemFont', avenir next, avenir,
    segoe ui, helvetica neue, helvetica, 'Ubuntu', roboto, noto, arial,
    sans-serif;
  --font-serif:
    'Iowan Old Style', 'Apple Garamond', 'Baskerville', 'Times New Roman',
    'Droid Serif', 'Times', 'Source Serif Pro', serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  --font-mono:
    'Inconsolata Variable', 'Menlo', 'Consolas', 'Monaco', 'Liberation Mono',
    'Lucida Console', monospace;
}

.app {
  height: 100vh;
}

body {
  height: 100%;
  margin: 0;
  background: var(--color-background-primary);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
}

header {
  display: flex;
  justify-content: end;
  min-height: 32px;
  padding: 8px 24px;

  .icon {
    width: 24px;
    height: 24px;
    color: var(--color-text-primary);
  }
}

footer {
  min-height: 32px;
}

@media (width >= 768px) {
  footer {
    min-height: 64px;
  }
}

/* Reset */

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

#app {
  isolation: isolate;
}
</style>
