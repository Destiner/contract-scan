# ContractScan

Cross-chain smart contract search

## How it works

For a given address, ContractScan pulls the bytecode on each supported chain. If there is bytecode, it will mark the contract as deployed on that chain. It will also compare the bytecode from all chains to see if they are the same.

For tokenized stocks, [Tokenform's Apple records](https://tokenform.sh/stocks/apple) distinguish issuer-specific instruments and their chain-specific addresses. Choose an instrument and a deployment on an EVM chain supported here, then inspect its address with ContractScan. Bytecode presence or equality does not establish issuer identity, backing or current support.

Supports 100+ EVM chains.

Uses `viem` as a source of public RPCs and block explorer links.

List of currently supported chains: [`chains.ts`](utils/chains.ts).

## Caching

ContractScan caches the bytecode hash for deployed contracts. For cached and deployed contracts, the response is effectively instant.

List of currently cached contracts: [`addresses.json`](data/addresses.json).

## Bundles

> Note: this feature is experimental

ContractScan supports showing multiple contracts at once.

Example: [Safe 1.4.1 deployment](https://contractscan.xyz/bundle?name=Safe+1.4.1&addresses=0xfd0732dc9e303f09fcef3a7388ad10a83459ec99,0x9b35af71d77eaf8d7e40252370304687390a1a52,0x38869bf66a61cf6bdb996a6ae40d5853fd43b526,0x9641d764fc13c8b624c04430c7356c1c7c8102e2,0x41675c099f32341bf84bfc5382af534df5c7461a,0x29fcb43b46531bca003ddc8fcb67ffe91900c762,0x4e1dcf7ad4e460cfd30791ccc4f9c8a4f820ec67,0xd53cd0ab83d845ac265be939c57f53ad838012c9,0x3d4ba2e0884aa488718476ca2fb8efc291a46199,0x526643F69b81B008F46d95CD5ced5eC0edFFDaC6,0xfF83F6335d8930cBad1c0D439A841f01888D9f69,0xBD89A1CE4DDe368FFAB0eC35506eEcE0b1fFdc54).

## Contributing

Feel free to extend the list of supported chains or cached contracts.

---

Made by [Destiner](https://destiner.io).
