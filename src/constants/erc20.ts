// /constants/erc20.ts
export const pzoAddress = "0x8DCdD7AdCa0005E505E0A78E8712fBb4f0AFC370"; // ví dụ là token Pione Zero Token

export const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  "function decimals() view returns (uint8)" // <<< thêm dòng này
];
