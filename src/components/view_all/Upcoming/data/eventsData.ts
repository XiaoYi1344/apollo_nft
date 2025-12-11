// // ✅ Define types
// export interface EventType {
//   id: string;
//   name: string;
//   img: string;
//   viewer: string;
//   time: string;
//   link: string;
//   type: string; // e.g. AMA, DROP, AUCTION, etc.
//   timeline: 'LIVE' | 'UPCOMING' | 'ENDED';
// }

// export interface FilterOption {
//   id: number;
//   name: string;
// }

// // ✅ Events data
// export const events: EventType[] = [
//   {
//     id: '1',
//     name: 'Live AMA with Artist Ria Prakasa',
//     img: '/event/event.png',
//     viewer: '142',
//     time: 'FRIDAY, OCT 17, 2025 - 8:00 PM (GMT+7)',
//     link: '/',
//     type: 'AMA',
//     timeline: 'LIVE',
//   },
//   {
//     id: '2',
//     name: 'Exclusive NFT Drop: Digital Dreams',
//     img: '/event/event1.png',
//     viewer: '2',
//     time: 'SATURDAY, OCT 18, 2025 - 3:00 PM (GMT+7)',
//     link: '/',
//     type: 'DROP',
//     timeline: 'UPCOMING',
//   },
//   {
//     id: '3',
//     name: 'Premium Art Auction Event',
//     img: '/event/event2.png',
//     viewer: '25',
//     time: 'SUNDAY, OCT 19, 2025 - 7:00 PM (GMT+7)',
//     link: '/',
//     type: 'AUCTION',
//     timeline: 'UPCOMING',
//   },
//    {
//     id: '4',
//     name: 'Creative Design Contest Finals',
//     img: '/event/event5.png',
//     viewer: '',
//     time: 'MONDAY, OCT 14, 2025 - 6:00 PM (GMT+7)',
//     link: '/',
//     type: 'CONTEST',
//     timeline: 'ENDED',
//   },
//    {
//     id: '5',
//     name: 'Digital Art Workshop: Basics to Pro',
//     img: '/event/event3.png',
//     viewer: '45',
//     time: 'TUESDAY, OCT 21, 2025 - 2:00 PM (GMT+7)',
//     link: '/',
//     type: 'WORKSHOP',
//     timeline: 'UPCOMING',
//   },
//    {
//     id: '6',
//     name: 'Community Networking Meetup',
//     img: '/event/event4.png',
//     viewer: '89',
//     time: 'WEDNESDAY, OCT 15, 2025 - 5:00 PM (GMT+7)',
//     link: '/',
//     type: 'MEETUP',
//     timeline: 'ENDED',
//   },
// ];

// // ✅ Filter categories
// export const timeline: FilterOption[] = [
//   { id: 1, name: 'Upcoming Events' },
//   { id: 2, name: 'Live Now' },
//   { id: 3, name: 'Past Events' },
// ];

// export const type: FilterOption[] = [
//   { id: 1, name: 'All Types' },
//   { id: 2, name: 'AMA' },
//   { id: 3, name: 'Drop' },
//   { id: 4, name: 'Auction' },
//   { id: 5, name: 'Contest' },
//   { id: 6, name: 'Workshop' },
// ];

// // ✅ Button text logic
// export const getButtonLabel = (timeline: EventType['timeline']): string => {
//   switch (timeline) {
//     case 'LIVE':
//       return 'Join Now';
//     case 'UPCOMING':
//       return 'Set Reminder';
//     case 'ENDED':
//       return 'View Recap';
//     default:
//       return 'View';
//   }
// };

// export const getTimelineColor = (timeline: string) => {
//   switch (timeline.toUpperCase()) {
//     case 'LIVE':
//       return '#9333EA';
//     case 'ENDED':
//       return '#374151';
//     case 'UPCOMING':
//     default:
//       return '#1f2937';
//   }
// };


// // timeline là LIVE thì tên nút là Join Now
// // timeline là UPCOMING thì tên nút là Set Reminder
// // timeline là ENDED thì tên nút là View Recap

// // LIVE = Live Now
// // UPCOMING = Upcoming Events
// // ENDED = Past Events

// // AMA và MEETUP thì icon là import GroupsIcon from '@mui/icons-material/Groups';
// // DROP thì icon là import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
// // AUCTION thì icon là import GavelIcon from '@mui/icons-material/Gavel';
// // CONTEST thì icon là import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// // WORKSHOP thì icon là import SchoolIcon from '@mui/icons-material/School';
