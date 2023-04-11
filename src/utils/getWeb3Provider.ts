import { ethers } from "ethers";
import { Provider } from "@ethersproject/abstract-provider";

const providers = new Map();

export const getWeb3Provider = (chainId: number): Provider => {
  if (providers.has(chainId)) {
    return providers.get(chainId);
  } else {
    let _provider = null;
    if (chainId === 100) {
      _provider = new ethers.providers.JsonRpcProvider(
        "https://rpc.gnosis.gateway.fm",
        100
      );
      providers.set(chainId, _provider);
      return _provider;
    }

    if (chainId === 137) {
      _provider = new ethers.providers.JsonRpcProvider(
        "https://polygon-rpc.com",
        chainId
      );
      providers.set(chainId, _provider);
      return _provider;
    }

    if (chainId === 80001) {
      _provider = new ethers.providers.JsonRpcProvider(
        "https://matic-mumbai.chainstacklabs.com",
        chainId
      );
      providers.set(chainId, _provider);
      return _provider;
    }
  }
};
