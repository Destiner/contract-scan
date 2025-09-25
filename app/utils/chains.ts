import {
  createPublicClient,
  http,
  type Address,
  type Chain as ChainData,
  type Hex,
} from 'viem';
import {
  mainnet,
  sepolia,
  holesky,
  arbitrum,
  arbitrumNova,
  arbitrumSepolia,
  optimism,
  optimismSepolia,
  base,
  baseSepolia,
  zora,
  zoraSepolia,
  polygon,
  polygonAmoy,
  polygonZkEvm,
  polygonZkEvmCardona,
  avalanche,
  avalancheFuji,
  gnosis,
  gnosisChiado,
  scroll,
  scrollSepolia,
  zksync,
  zksyncSepoliaTestnet,
  celo,
  celoAlfajores,
  linea,
  lineaSepolia,
  blast,
  blastSepolia,
  mantle,
  mantleSepoliaTestnet,
  mode,
  modeTestnet,
  bsc,
  bscTestnet,
  fantom,
  fantomTestnet,
  moonbaseAlpha,
  moonbeam,
  flare,
  flareTestnet,
  immutableZkEvm,
  immutableZkEvmTestnet,
  aurora,
  auroraTestnet,
  degen,
  opBNB,
  opBNBTestnet,
  manta,
  mantaSepoliaTestnet,
  kava,
  kavaTestnet,
  taikoHekla,
  taiko,
  palm,
  palmTestnet,
  boba,
  harmonyOne,
  cronos,
  lukso,
  luksoTestnet,
  dfk,
  fraxtal,
  fraxtalTestnet,
  fuse,
  fuseSparknet,
  zetachain,
  zetachainAthensTestnet,
  beam,
  beamTestnet,
  hedera,
  hederaTestnet,
  iotex,
  iotexTestnet,
  meter,
  meterTestnet,
  neonMainnet,
  neonDevnet,
  cyber,
  cyberTestnet,
  redstone,
  lycan,
  sei,
  seiDevnet,
  xai,
  xaiTestnet,
  rollux,
  sapphire,
  sapphireTestnet,
  syscoin,
  taraxa,
  taraxaTestnet,
  wanchain,
  wanchainTestnet,
  zilliqa,
  morphHolesky,
  lyra,
  seiTestnet,
  zkLinkNova,
  bobaSepolia,
  forma,
  shapeSepolia,
  shape,
  abstractTestnet,
  worldchain,
  worldchainSepolia,
  unichainSepolia,
  unichain,
  inkSepolia,
  ink,
  abstract,
  apeChain,
  dymension,
} from 'viem/chains';

const ETHEREUM = mainnet.id;
const SEPOLIA = sepolia.id;
const HOLESKY = holesky.id;
const ARBITRUM = arbitrum.id;
const ARBITRUM_NOVA = arbitrumNova.id;
const ARBITRUM_SEPOLIA = arbitrumSepolia.id;
const OPTIMISM = optimism.id;
const OPTIMISM_SEPOLIA = optimismSepolia.id;
const BASE = base.id;
const BASE_SEPOLIA = baseSepolia.id;
const ZORA = zora.id;
const ZORA_SEPOLIA = zoraSepolia.id;
const POLYGON = polygon.id;
const POLYGON_AMOY = polygonAmoy.id;
const POLYGON_ZKEVM = polygonZkEvm.id;
const POLYGON_ZKEVM_CARDONA = polygonZkEvmCardona.id;
const AVALANCHE = avalanche.id;
const AVALANCHE_FUJI = avalancheFuji.id;
const GNOSIS = gnosis.id;
const GNOSIS_CHIADO = gnosisChiado.id;
const SCROLL = scroll.id;
const SCROLL_SEPOLIA = scrollSepolia.id;
const ZKSYNC_ERA = zksync.id;
const ZKSYNC_ERA_SEPOLIA = zksyncSepoliaTestnet.id;
const CELO = celo.id;
const CELO_ALFAJORES = celoAlfajores.id;
const LINEA = linea.id;
const LINEA_SEPOLIA = lineaSepolia.id;
const BLAST = blast.id;
const BLAST_SEPOLIA = blastSepolia.id;
const MANTLE = mantle.id;
const MANTLE_SEPOLIA = mantleSepoliaTestnet.id;
const MODE = mode.id;
const MODE_SEPOLIA = modeTestnet.id;
const BSC = bsc.id;
const BSC_TESTNET = bscTestnet.id;
const FANTOM = fantom.id;
const FANTOM_TESTNET = fantomTestnet.id;
const MOONBASE_ALPHA = moonbaseAlpha.id;
const MOONBEAM = moonbeam.id;
const FLARE = flare.id;
const FLARE_TESTNET = flareTestnet.id;
const MANTA_PACIFIC = manta.id;
const MANTA_PACIFIC_SEPOLIA = mantaSepoliaTestnet.id;
const KAVA = kava.id;
const KAVA_TESTNET = kavaTestnet.id;
const TAIKO_HEKLA = taikoHekla.id;
const TAIKO = taiko.id;
const PALM = palm.id;
const PALM_TESTNET = palmTestnet.id;
const IMMUTABLE_ZKEVM = immutableZkEvm.id;
const IMMUTABLE_ZKEVM_TESTNET = immutableZkEvmTestnet.id;
const BOBA_ETHEREUM = boba.id;
const AURORA = aurora.id;
const AURORA_TESTNET = auroraTestnet.id;
const DEGEN = degen.id;
const HARMONY = harmonyOne.id;
const CRONOS = cronos.id;
const OP_BNB = opBNB.id;
const OP_BNB_TESTNET = opBNBTestnet.id;
const LUKSO = lukso.id;
const LUKSO_TESTNET = luksoTestnet.id;
const DFK_CHAIN = dfk.id;
const FRAXTAL = fraxtal.id;
const FRAXTAL_TESTNET = fraxtalTestnet.id;
const FUSE = fuse.id;
const FUSE_SPARKNET = fuseSparknet.id;
const ZETACHAIN = zetachain.id;
const ZETACHAIN_ATHENS = zetachainAthensTestnet.id;
const BEAM = beam.id;
const BEAM_TESTNET = beamTestnet.id;
const HEDERA = hedera.id;
const HEDERA_TESTNET = hederaTestnet.id;
const IOTEX = iotex.id;
const IOTEX_TESTNET = iotexTestnet.id;
const METER = meter.id;
const METER_TESTNET = meterTestnet.id;
const NEON = neonMainnet.id;
const NEON_DEVNET = neonDevnet.id;
const CYBER = cyber.id;
const CYBER_TESTNET = cyberTestnet.id;
const REDSTONE = redstone.id;
const LYCAN = lycan.id;
const SEI = sei.id;
const SEI_DEVNET = seiDevnet.id;
const XAI = xai.id;
const XAI_TESTNET = xaiTestnet.id;
const ROLLUX = rollux.id;
const SAPPHIRE = sapphire.id;
const SAPPHIRE_TESTNET = sapphireTestnet.id;
const SYSCOIN = syscoin.id;
const TARAXA = taraxa.id;
const TARAXA_TESTNET = taraxaTestnet.id;
const WANCHAIN = wanchain.id;
const WANCHAIN_TESTNET = wanchainTestnet.id;
const ZILLIQA = zilliqa.id;
const MORPH_HOLESKY = morphHolesky.id;
const LYRA = lyra.id;
const SEI_TESTNET = seiTestnet.id;
const ZK_LINK_NOVA = zkLinkNova.id;
const BOBA_SEPOLIA = bobaSepolia.id;
const FORMA = forma.id;
const SHAPE_SEPOLIA = shapeSepolia.id;
const SHAPE = shape.id;
const ABSTRACT_TESTNET = abstractTestnet.id;
const WORLDCHAIN = worldchain.id;
const WORLDCHAIN_SEPOLIA = worldchainSepolia.id;
const UNICHAIN_SEPOLIA = unichainSepolia.id;
const UNICHAIN = unichain.id;
const INK_SEPOLIA = inkSepolia.id;
const INK = ink.id;
const ABSTRACT = abstract.id;
const APE_CHAIN = apeChain.id;
const DYMENSION = dymension.id;

type Chain =
  | typeof ETHEREUM
  | typeof SEPOLIA
  | typeof HOLESKY
  | typeof ARBITRUM
  | typeof ARBITRUM_NOVA
  | typeof ARBITRUM_SEPOLIA
  | typeof OPTIMISM
  | typeof OPTIMISM_SEPOLIA
  | typeof BASE
  | typeof BASE_SEPOLIA
  | typeof ZORA
  | typeof ZORA_SEPOLIA
  | typeof POLYGON
  | typeof POLYGON_AMOY
  | typeof POLYGON_ZKEVM
  | typeof POLYGON_ZKEVM_CARDONA
  | typeof AVALANCHE
  | typeof AVALANCHE_FUJI
  | typeof GNOSIS
  | typeof GNOSIS_CHIADO
  | typeof SCROLL
  | typeof SCROLL_SEPOLIA
  | typeof ZKSYNC_ERA
  | typeof ZKSYNC_ERA_SEPOLIA
  | typeof CELO
  | typeof CELO_ALFAJORES
  | typeof LINEA
  | typeof LINEA_SEPOLIA
  | typeof BLAST
  | typeof BLAST_SEPOLIA
  | typeof MANTLE
  | typeof MANTLE_SEPOLIA
  | typeof MODE
  | typeof MODE_SEPOLIA
  | typeof BSC
  | typeof BSC_TESTNET
  | typeof FANTOM
  | typeof FANTOM_TESTNET
  | typeof MOONBASE_ALPHA
  | typeof MOONBEAM
  | typeof FLARE
  | typeof FLARE_TESTNET
  | typeof MANTA_PACIFIC
  | typeof MANTA_PACIFIC_SEPOLIA
  | typeof KAVA
  | typeof KAVA_TESTNET
  | typeof TAIKO_HEKLA
  | typeof TAIKO
  | typeof PALM
  | typeof PALM_TESTNET
  | typeof IMMUTABLE_ZKEVM
  | typeof IMMUTABLE_ZKEVM_TESTNET
  | typeof BOBA_ETHEREUM
  | typeof AURORA
  | typeof AURORA_TESTNET
  | typeof DEGEN
  | typeof HARMONY
  | typeof CRONOS
  | typeof OP_BNB
  | typeof OP_BNB_TESTNET
  | typeof LUKSO
  | typeof LUKSO_TESTNET
  | typeof DFK_CHAIN
  | typeof FRAXTAL
  | typeof FRAXTAL_TESTNET
  | typeof FUSE
  | typeof FUSE_SPARKNET
  | typeof ZETACHAIN
  | typeof ZETACHAIN_ATHENS
  | typeof BEAM
  | typeof BEAM_TESTNET
  | typeof HEDERA
  | typeof HEDERA_TESTNET
  | typeof IOTEX
  | typeof IOTEX_TESTNET
  | typeof METER
  | typeof METER_TESTNET
  | typeof NEON
  | typeof NEON_DEVNET
  | typeof CYBER
  | typeof CYBER_TESTNET
  | typeof REDSTONE
  | typeof LYCAN
  | typeof SEI
  | typeof SEI_DEVNET
  | typeof XAI
  | typeof XAI_TESTNET
  | typeof ROLLUX
  | typeof SAPPHIRE
  | typeof SAPPHIRE_TESTNET
  | typeof SYSCOIN
  | typeof TARAXA
  | typeof TARAXA_TESTNET
  | typeof WANCHAIN
  | typeof WANCHAIN_TESTNET
  | typeof ZILLIQA
  | typeof MORPH_HOLESKY
  | typeof LYRA
  | typeof SEI_TESTNET
  | typeof ZK_LINK_NOVA
  | typeof BOBA_SEPOLIA
  | typeof FORMA
  | typeof SHAPE_SEPOLIA
  | typeof SHAPE
  | typeof ABSTRACT_TESTNET
  | typeof WORLDCHAIN
  | typeof WORLDCHAIN_SEPOLIA
  | typeof UNICHAIN_SEPOLIA
  | typeof UNICHAIN
  | typeof INK_SEPOLIA
  | typeof INK
  | typeof ABSTRACT
  | typeof APE_CHAIN
  | typeof DYMENSION;

const CHAINS: Chain[] = [
  ETHEREUM,
  SEPOLIA,
  HOLESKY,
  ARBITRUM,
  ARBITRUM_NOVA,
  ARBITRUM_SEPOLIA,
  OPTIMISM,
  OPTIMISM_SEPOLIA,
  BASE,
  BASE_SEPOLIA,
  ZORA,
  ZORA_SEPOLIA,
  POLYGON,
  POLYGON_AMOY,
  POLYGON_ZKEVM,
  POLYGON_ZKEVM_CARDONA,
  AVALANCHE,
  AVALANCHE_FUJI,
  GNOSIS,
  GNOSIS_CHIADO,
  SCROLL,
  SCROLL_SEPOLIA,
  ZKSYNC_ERA,
  ZKSYNC_ERA_SEPOLIA,
  CELO,
  CELO_ALFAJORES,
  LINEA,
  LINEA_SEPOLIA,
  BLAST,
  BLAST_SEPOLIA,
  MANTLE,
  MANTLE_SEPOLIA,
  MODE,
  MODE_SEPOLIA,
  BSC,
  BSC_TESTNET,
  FANTOM,
  FANTOM_TESTNET,
  MOONBASE_ALPHA,
  MOONBEAM,
  FLARE,
  FLARE_TESTNET,
  MANTA_PACIFIC,
  MANTA_PACIFIC_SEPOLIA,
  KAVA,
  KAVA_TESTNET,
  TAIKO_HEKLA,
  TAIKO,
  PALM,
  PALM_TESTNET,
  IMMUTABLE_ZKEVM,
  IMMUTABLE_ZKEVM_TESTNET,
  BOBA_ETHEREUM,
  AURORA,
  AURORA_TESTNET,
  DEGEN,
  HARMONY,
  CRONOS,
  OP_BNB,
  OP_BNB_TESTNET,
  LUKSO,
  LUKSO_TESTNET,
  DFK_CHAIN,
  FRAXTAL,
  FRAXTAL_TESTNET,
  FUSE,
  FUSE_SPARKNET,
  ZETACHAIN,
  ZETACHAIN_ATHENS,
  BEAM,
  BEAM_TESTNET,
  HEDERA,
  HEDERA_TESTNET,
  IOTEX,
  IOTEX_TESTNET,
  METER,
  METER_TESTNET,
  NEON,
  NEON_DEVNET,
  CYBER,
  CYBER_TESTNET,
  REDSTONE,
  LYCAN,
  SEI,
  SEI_DEVNET,
  XAI,
  XAI_TESTNET,
  ROLLUX,
  SAPPHIRE,
  SAPPHIRE_TESTNET,
  SYSCOIN,
  TARAXA,
  TARAXA_TESTNET,
  WANCHAIN,
  WANCHAIN_TESTNET,
  ZILLIQA,
  MORPH_HOLESKY,
  LYRA,
  SEI_TESTNET,
  ZK_LINK_NOVA,
  BOBA_SEPOLIA,
  FORMA,
  SHAPE_SEPOLIA,
  SHAPE,
  ABSTRACT_TESTNET,
  WORLDCHAIN,
  WORLDCHAIN_SEPOLIA,
  UNICHAIN_SEPOLIA,
  UNICHAIN,
  INK_SEPOLIA,
  INK,
  ABSTRACT,
  APE_CHAIN,
  DYMENSION,
];

function getChainEndpointUrl(chain: Chain): string | null {
  const chainData = getChainData(chain);
  return chainData.rpcUrls.default.http[0] || null;
}

function getChainName(chain: Chain): string {
  const chainData = getChainData(chain);
  return chainData.name;
}

function getChainData(chain: Chain): ChainData {
  switch (chain) {
    case ETHEREUM:
      return mainnet;
    case SEPOLIA:
      return sepolia;
    case HOLESKY:
      return holesky;
    case ARBITRUM:
      return arbitrum;
    case ARBITRUM_NOVA:
      return arbitrumNova;
    case ARBITRUM_SEPOLIA:
      return arbitrumSepolia;
    case OPTIMISM:
      return optimism;
    case OPTIMISM_SEPOLIA:
      return optimismSepolia;
    case BASE:
      return base;
    case BASE_SEPOLIA:
      return baseSepolia;
    case ZORA:
      return zora;
    case ZORA_SEPOLIA:
      return zoraSepolia;
    case POLYGON:
      return polygon;
    case POLYGON_AMOY:
      return polygonAmoy;
    case POLYGON_ZKEVM:
      return polygonZkEvm;
    case POLYGON_ZKEVM_CARDONA:
      return polygonZkEvmCardona;
    case AVALANCHE:
      return avalanche;
    case AVALANCHE_FUJI:
      return avalancheFuji;
    case GNOSIS:
      return gnosis;
    case GNOSIS_CHIADO:
      return gnosisChiado;
    case SCROLL:
      return scroll;
    case SCROLL_SEPOLIA:
      return scrollSepolia;
    case ZKSYNC_ERA:
      return zksync;
    case ZKSYNC_ERA_SEPOLIA:
      return zksyncSepoliaTestnet;
    case CELO:
      return celo;
    case CELO_ALFAJORES:
      return celoAlfajores;
    case LINEA:
      return linea;
    case LINEA_SEPOLIA:
      return lineaSepolia;
    case BLAST:
      return blast;
    case BLAST_SEPOLIA:
      return blastSepolia;
    case MANTLE:
      return mantle;
    case MANTLE_SEPOLIA:
      return mantleSepoliaTestnet;
    case MODE:
      return mode;
    case MODE_SEPOLIA:
      return modeTestnet;
    case BSC:
      return bsc;
    case BSC_TESTNET:
      return bscTestnet;
    case FANTOM:
      return fantom;
    case FANTOM_TESTNET:
      return fantomTestnet;
    case MOONBASE_ALPHA:
      return moonbaseAlpha;
    case MOONBEAM:
      return moonbeam;
    case FLARE:
      return flare;
    case FLARE_TESTNET:
      return flareTestnet;
    case MANTA_PACIFIC:
      return manta;
    case MANTA_PACIFIC_SEPOLIA:
      return mantaSepoliaTestnet;
    case KAVA:
      return kava;
    case KAVA_TESTNET:
      return kavaTestnet;
    case TAIKO_HEKLA:
      return taikoHekla;
    case TAIKO:
      return taiko;
    case PALM:
      return palm;
    case PALM_TESTNET:
      return palmTestnet;
    case IMMUTABLE_ZKEVM:
      return immutableZkEvm;
    case IMMUTABLE_ZKEVM_TESTNET:
      return immutableZkEvmTestnet;
    case BOBA_ETHEREUM:
      return boba;
    case AURORA:
      return aurora;
    case AURORA_TESTNET:
      return auroraTestnet;
    case DEGEN:
      return degen;
    case HARMONY:
      return harmonyOne;
    case CRONOS:
      return cronos;
    case OP_BNB:
      return opBNB;
    case OP_BNB_TESTNET:
      return opBNBTestnet;
    case LUKSO:
      return lukso;
    case LUKSO_TESTNET:
      return luksoTestnet;
    case DFK_CHAIN:
      return dfk;
    case FRAXTAL:
      return fraxtal;
    case FRAXTAL_TESTNET:
      return fraxtalTestnet;
    case FUSE:
      return fuse;
    case FUSE_SPARKNET:
      return fuseSparknet;
    case ZETACHAIN:
      return zetachain;
    case ZETACHAIN_ATHENS:
      return zetachainAthensTestnet;
    case BEAM:
      return beam;
    case BEAM_TESTNET:
      return beamTestnet;
    case HEDERA:
      return hedera;
    case HEDERA_TESTNET:
      return hederaTestnet;
    case IOTEX:
      return iotex;
    case IOTEX_TESTNET:
      return iotexTestnet;
    case METER:
      return meter;
    case METER_TESTNET:
      return meterTestnet;
    case NEON:
      return neonMainnet;
    case NEON_DEVNET:
      return neonDevnet;
    case CYBER:
      return cyber;
    case CYBER_TESTNET:
      return cyberTestnet;
    case REDSTONE:
      return redstone;
    case LYCAN:
      return lycan;
    case SEI:
      return sei;
    case SEI_DEVNET:
      return seiDevnet;
    case XAI:
      return xai;
    case XAI_TESTNET:
      return xaiTestnet;
    case ROLLUX:
      return rollux;
    case SAPPHIRE:
      return sapphire;
    case SAPPHIRE_TESTNET:
      return sapphireTestnet;
    case SYSCOIN:
      return syscoin;
    case TARAXA:
      return taraxa;
    case TARAXA_TESTNET:
      return taraxaTestnet;
    case WANCHAIN:
      return wanchain;
    case WANCHAIN_TESTNET:
      return wanchainTestnet;
    case ZILLIQA:
      return zilliqa;
    case MORPH_HOLESKY:
      return morphHolesky;
    case LYRA:
      return lyra;
    case SEI_TESTNET:
      return seiTestnet;
    case ZK_LINK_NOVA:
      return zkLinkNova;
    case BOBA_SEPOLIA:
      return bobaSepolia;
    case FORMA:
      return forma;
    case SHAPE_SEPOLIA:
      return shapeSepolia;
    case SHAPE:
      return shape;
    case ABSTRACT_TESTNET:
      return abstractTestnet;
    case WORLDCHAIN:
      return worldchain;
    case WORLDCHAIN_SEPOLIA:
      return worldchainSepolia;
    case UNICHAIN_SEPOLIA:
      return unichainSepolia;
    case UNICHAIN:
      return unichain;
    case INK_SEPOLIA:
      return inkSepolia;
    case INK:
      return ink;
    case ABSTRACT:
      return abstract;
    case APE_CHAIN:
      return apeChain;
    case DYMENSION:
      return dymension;
  }
}

function getAddressExplorerUrl(chain: Chain, address: Address): string | null {
  const chainData = getChainData(chain);
  const blockExplorers = chainData.blockExplorers;
  if (!blockExplorers) {
    return null;
  }
  const defaultBlockExplorer = blockExplorers.default;
  if (!defaultBlockExplorer) {
    return null;
  }
  return `${defaultBlockExplorer.url}/address/${address}`;
}

async function getCode(
  chain: Chain,
  address: Address,
): Promise<Hex | null | undefined> {
  const endpointUrl = getChainEndpointUrl(chain);
  if (!endpointUrl) {
    return undefined;
  }
  const chainClient = createPublicClient({
    chain: getChainData(chain),
    transport: http(endpointUrl),
  });
  try {
    const code = await chainClient.getCode({
      address,
    });
    return code || null;
  } catch {
    return undefined;
  }
}

export {
  CHAINS,
  getChainEndpointUrl,
  getChainName,
  getChainData,
  getAddressExplorerUrl,
  getCode,
};
export type { Chain };
