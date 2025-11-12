export type NFT = {
  id: number;
  name: string;
  description?: string; // <-- add this
  price: string;
  price_sold?: string;
  img: File[] | string;
  likes?: string;
  collection: string;
  creator?: string;
  owner?: string;
  contract?: string;
  tokenId?: string | number;
  blockchain?: string;
  properties?: {
    trait_type: string;
    value: string;
    rarity: string;
  }[];
  activity?: {
    type: 'listed' | 'sold' | 'minted';
    actor?: string;
    target?: string;
    price?: string;
    time: string;
  }[];
};

export const nftData: NFT[] = [
  {
    id: 1,
    name: 'CosmoCat #123',
    price: '0.75 ETH',
    img: '/marketplace/img.jpg',
    likes: '1.2k',
    collection: 'Space Kitties',
  },
  {
    id: 2,
    name: 'TinBot #789',
    price: '1.20 ETH',
    img: '/marketplace/img1.jpg',
    likes: '3.4k',
    collection: 'Retro Bots',
  },
  {
    id: 3,
    name: 'ApeCrypto #8821',
    price: '0.95 ETH',
    img: '/marketplace/img2.jpg',
    likes: '5.6k',
    collection: 'ApeCrypto',
  },
  {
    id: 4,
    name: 'Sunset Hill #45',
    price: '0.45 ETH',
    img: '/marketplace/img3.jpg',
    likes: '980',
    collection: 'Pixel Worlds',
  },
  {
    id: 5,
    name: 'StarGazer #456',
    price: '0.82 ETH',
    img: '/marketplace/img4.jpg',
    likes: '2.1k',
    collection: 'Space Kitties',
  },
  {
    id: 6,
    name: 'ApeCrypto #7234',
    price: '1.50 ETH',
    img: '/marketplace/img5.jpg',
    likes: '8.1k',
    collection: 'ApeCrypto',
  },
  {
    id: 7,
    name: 'RustyBot #101',
    price: '0.99 ETH',
    img: '/marketplace/img6.jpg',
    likes: '1.8k',
    collection: 'Retro Bots',
  },
  {
    id: 8,
    name: 'OracleCat #777',
    price: '2.50 ETH',
    img: '/marketplace/img7.jpg',
    likes: '11.2k',
    collection: 'Space Kitties',
  },
  {
    id: 9,
    name: 'Neon Guardian #2847',
    price: '1.50 ETH',
    img: '/marketplace/nft_test.png',
    likes: '8.1k',
    collection: 'Cyber Punks',
    creator: '@CyberArtist',
    owner: '@NFTCollector',
    contract: '0x495f...7b5e',
    tokenId: 2847,
    blockchain: 'Ethereum',
    properties: [
      {
        trait_type: 'Background',
        value: 'Neon City',
        rarity: '12% have this trait',
      },
      { trait_type: 'Eyes', value: 'Cyber Glow', rarity: '8% have this trait' },
      {
        trait_type: 'Headgear',
        value: 'Neural Crown',
        rarity: '5% have this trait',
      },
      {
        trait_type: 'Rarity',
        value: 'Legendary',
        rarity: '2% have this trait',
      },
    ],
    activity: [
      {
        type: 'listed',
        actor: '@NFTCollector',
        price: '1.5 ETH',
        time: '2 hours ago',
      },
      {
        type: 'sold',
        actor: '@CyberArtist',
        target: '@NFTCollector',
        price: '1.2 ETH',
        time: '1 day ago',
      },
      { type: 'minted', actor: '@CyberArtist', time: '3 days ago' },
    ],
  },
  {
    id: 10,
    name: 'Cyber Warior #1234',
    price: '0.8 ETH',
    img: '/marketplace/warior.png',
    collection: 'Cyber Punks',
  },
  {
    id: 11,
    name: 'Neon Android #5678',
    price: '1.2 ETH',
    img: '/marketplace/android.png',
    collection: 'Cyber Punks',
  },
  {
    id: 12,
    name: 'Data Hacker #9012',
    price: '0.9 ETH',
    img: '/marketplace/hacker.png',
    collection: 'Cyber Punks',
  },
  {
    id: 13,
    name: 'Cyber Samurai #3456',
    price: '2.1 ETH',
    img: '/marketplace/samurai.png',
    collection: 'Cyber Punks',
  },
];
