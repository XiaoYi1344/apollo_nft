export interface NFTItem {
  id: string;
  title: string;
  price: string;
  img: string;
}

export interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  banner: string;
  totalVolume: string;
  nftsSold: number;
  followers: string;
  floorPrice: string;
  works: number;
  bio: string;
  items: NFTItem[];
  timeRange?: '24h' | '7d' | '30d' | 'all'; // 👈 thêm field này
}

const creators: Creator[] = [
  {
    id: '1',
    name: 'Ria Prakasa',
    username: 'ria.prk',
    avatar: '/creator/avatar.png',
    banner: '/creator_detail/banner.jpg',
    totalVolume: '19.2 ETH',
    nftsSold: 152,
    followers: '25.8K',
    floorPrice: '0.85 ETH',
    works: 74,
    bio: '3D artist from Jakarta, exploring the intersection of nature and technology. Each work is a story of a surreal future.',
    items: [
      { id: 'c1', title: 'Cyber Flora #01', price: '1.5 ETH', img: '/items/1.jpg' },
      { id: 'c2', title: 'Mecha Deer #03', price: '2.1 ETH', img: '/items/2.jpg' },
      { id: 'c3', title: 'Datafall #07', price: '1.8 ETH', img: '/items/3.jpg' },
      { id: 'c4', title: 'Crystal Lotus #12', price: '1.95 ETH', img: '/items/4.jpg' },
      { id: 'c5', title: 'Cybernetic Owl #05', price: '2.5 ETH', img: '/items/5.jpg' },
      { id: 'c6', title: 'Soul of the Circuit Tree', price: '3.1 ETH', img: '/items/6.jpg' },
      { id: 'c7', title: 'Cloud Whale #02', price: '2.8 ETH', img: '/items/7.jpg' },
      { id: 'c8', title: 'The Portal #01', price: '4.5 ETH', img: '/items/8.jpg' },
    ],
    timeRange: '7d',
  },
  {
    id: '2',
    name: 'Eril Tetayasa Sikaga',
    username: 'eril',
    avatar: '/creator/eril.jpg',
    banner: '/banners/purple-abstract.jpg',
    totalVolume: '18.5 ETH',
    nftsSold: 131,
    followers: '22.1K',
    floorPrice: '0.45 ETH',
    works: 68,
    bio: 'Generative artist focused on neon & cityscapes.',
    items: [],
    timeRange: '7d',
  },
  {
    id: '3',
    name: 'Gadis Opung Utama',
    username: 'mina',
    avatar: '/creator/avatar.jpg',
    banner: '/banners/futuristic.jpg',
    totalVolume: '22.3 ETH',
    nftsSold: 182,
    followers: '28.9K',
    floorPrice: '1.1 ETH',
    works: 102,
    bio: 'Digital surrealism meets minimalist expression.',
    items: [],
    timeRange: '7d',
  },
  {
    id: '4',
    name: 'Eva Nanggolan',
    username: 'kaito',
    avatar: '/creator/avatar1.jpg',
    banner: '/banners/dark-tech.jpg',
    totalVolume: '12.7 ETH',
    nftsSold: 92,
    followers: '10.4K',
    floorPrice: '0.35 ETH',
    works: 40,
    bio: 'Cyberpunk style NFT artist.',
    items: [],
    timeRange: 'all',
  },
  {
    id: '5',
    name: 'Annang Suryono',
    username: 'linavo',
    avatar: '/creator/avatar2.jpg',
    banner: '/banners/abstract-bg.jpg',
    totalVolume: '14.9 ETH',
    nftsSold: 110,
    followers: '12.7K',
    floorPrice: '0.5 ETH',
    works: 56,
    bio: 'Vietnamese digital painter inspired by dreams and folklore.',
    items: [],
    timeRange: '7d',
  },
  {
    id: '6',
    name: 'DigitalDreamer',
    username: 'kenjim',
    avatar: '/creator/avatar3.jpg',
    banner: '/banners/blue-abstract.jpg',
    totalVolume: '16.3 ETH',
    nftsSold: 120,
    followers: '18.3K',
    floorPrice: '0.6 ETH',
    works: 63,
    bio: 'Generative motion artist using p5.js and Blender.',
    items: [],
    timeRange: '24h',
  },
  {
    id: '7',
    name: 'CryptoPunk',
    username: 'sarart',
    avatar: '/creator/avatar4.jpg',
    banner: '/banners/orange-art.jpg',
    totalVolume: '20.2 ETH',
    nftsSold: 142,
    followers: '20.5K',
    floorPrice: '0.8 ETH',
    works: 81,
    bio: 'Nature-inspired AI-generated art.',
    items: [],
    timeRange: '30d',
  },
  {
    id: '8',
    name: 'ArtCollector',
    username: 'leotan',
    avatar: '/creator/avatar5.jpg',
    banner: '/banners/techno.jpg',
    totalVolume: '10.1 ETH',
    nftsSold: 72,
    followers: '8.2K',
    floorPrice: '0.3 ETH',
    works: 32,
    bio: 'Exploring the boundary of glitch and data.',
    items: [],
    timeRange: '24h',
  },
  {
    id: '9',
    name: 'Maya Irawan',
    username: 'maya',
    avatar: '/creator/avatar4.jpg',
    banner: '/banners/pastel.jpg',
    totalVolume: '25.0 ETH',
    nftsSold: 201,
    followers: '31.7K',
    floorPrice: '1.2 ETH',
    works: 115,
    bio: 'Dreamlike pastel NFTs capturing emotional stories.',
    items: [],
    timeRange: '7d',
  },
  {
    id: '10',
    name: 'Daisuke Hino',
    username: 'daisuke',
    avatar: '/creator/avatar5.jpg',
    banner: '/banners/dark-bg.jpg',
    totalVolume: '8.9 ETH',
    nftsSold: 65,
    followers: '5.4K',
    floorPrice: '0.25 ETH',
    works: 27,
    bio: 'Retro pixel artist from Tokyo.',
    items: [],
    timeRange: '30d',
  },
];

export default creators;
