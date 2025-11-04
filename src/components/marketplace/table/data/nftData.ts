export type NFT = {
  id: number;
  name: string;
  price: string;
  img: File[] | string;
  likes: string;
  collection: string;
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
    collection: 'ApeCrypto',
  },
];
