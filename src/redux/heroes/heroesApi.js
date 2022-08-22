import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const heroesApi = createApi({
  reducerPath: 'heroesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://super-heroes-api-ua.herokuapp.com',
  }),
  tagTypes: ['Hero'],
  endpoints: builder => ({
    getHeroes: builder.query({
      query: () => `/api/heroes`,
      keepUnusedDataFor: 1,
      providesTags: ['Hero'],
    }),
    getHeroById: builder.query({
      query: heroId => ({
        url: `/api/heroes/${heroId}`,
        method: 'GET',
      }),
      // keepUnusedDataFor: 1,
      providesTags: ['Hero'],
    }),
    deleteHero: builder.mutation({
      query: heroId => ({
        url: `/api/heroes/${heroId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Hero'],
    }),
    createHero: builder.mutation({
      query: newHero => ({
        url: '/api/heroes',
        method: 'POST',
        body: newHero,
      }),
      invalidatesTags: ['Hero'],
    }),
    updateHero: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/heroes/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Heroes'],
    }),
  }),
});

export const {
  useGetHeroesQuery,
  useGetHeroByIdQuery,
  useDeleteHeroMutation,
  useCreateHeroMutation,
  useUpdateHeroMutation,
} = heroesApi;
