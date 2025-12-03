// import { useInfiniteQuery } from '@tanstack/react-query';
// import eventService from '@/services/eventService';
// import { Event } from '@/types/events';

// interface EventsResponse {
//   data: Event[];
//   limit: number;
//   total: number;
//   totalPages: number;
// }

// export function useEvents() {
//   return useInfiniteQuery<
//     EventsResponse, // TData
//     Error,          // TError
//     EventsResponse, // TQueryFnData
//     readonly unknown[] // TQueryKey
//   >({
//     queryKey: ['events'],
//     queryFn: ({ pageParam = 1 }) => {
//       const page = typeof pageParam === 'number' ? pageParam : 1; // cast sang number
//       return eventService.getAllEvents(page);
//     },
//     getNextPageParam: (lastPage, allPages) => {
//       return lastPage.totalPages > allPages.length ? allPages.length + 1 : undefined;
//     },
//     initialPageParam: 1,
//   });
// }


import { useInfiniteQuery } from '@tanstack/react-query';
import eventService from '@/services/eventService';
import { Event } from '@/types/events';

export interface EventsResponse {
  data: Event[];
  limit: number;
  total: number;
  totalPages: number;
}

export function useEvents() {
  return useInfiniteQuery({
    queryKey: ['events'],
    queryFn: ({ pageParam = 1 }) =>
      eventService.getAllEvents(pageParam as number),

    getNextPageParam: (lastPage, allPages) =>
      lastPage.totalPages > allPages.length ? allPages.length + 1 : undefined,

    initialPageParam: 1,
  });
}
