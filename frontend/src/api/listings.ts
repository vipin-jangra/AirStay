import API from './client';
import type { Listing } from '../types/listing';

export const fetchListings = async (params: Record<string, any> = {}) => {
  const res = await API.get('/listings', { params });
  return res.data as { data: Listing[]; meta: { total: number; page: number; limit: number } };
};

export const fetchListingById = async (id: string) => {
  const res = await API.get(`/listings/${id}`);
  return res.data;
};
