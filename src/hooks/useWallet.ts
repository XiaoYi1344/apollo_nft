// import { useEffect, useState } from "react";
// import { ethers } from "ethers";

// export const useWallet = () => {
//   const [address, setAddress] = useState<string | null>(null);
//   const [signer, setSigner] = useState<ethers.Signer | null>(null);

//   const connectWallet = async () => {
//     if (!window.ethereum) {
//       alert("MetaMask not installed");
//       return;
//     }

//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);

//       // Gọi request đúng chuẩn
//       const accounts = await window.ethereum.request!({
//         method: "eth_requestAccounts",
//       });

//       setAddress(accounts[0]);

//       const signer = await provider.getSigner();
//       setSigner(signer);

//       console.log("Connected:", accounts[0]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Auto-detect account change
//   useEffect(() => {
//     if (!window.ethereum?.on) return;

//     window.ethereum.on("accountsChanged", async (accounts: string[]) => {
//       if (accounts.length === 0) {
//         setAddress(null);
//         setSigner(null);
//       } else {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const signer = await provider.getSigner();
//         setAddress(accounts[0]);
//         setSigner(signer);
//       }
//     });
//   }, []);

//   return { address, signer, connectWallet };
// };
