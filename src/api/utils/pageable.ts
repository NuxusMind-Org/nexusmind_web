import type { Pageable } from '../types';

export interface PageableQueryParams {
  page?: number;
  size?: number;
  sort?: string[];
}

/**
 * Flattens Spring Boot Pageable into top-level query params (`page`, `size`, `sort`)
 * instead of nested `pageable[page]=0` bracket notation.
 */
export function buildPageableParams(
  pageable?: Pageable,
  defaults: { page?: number; size?: number } = { page: 0, size: 10 }
): PageableQueryParams {
  const params: PageableQueryParams = {};
  const page = pageable?.page ?? defaults.page;
  const size = pageable?.size ?? defaults.size;

  if (page !== undefined) params.page = page;
  if (size !== undefined) params.size = size;
  if (pageable?.sort && pageable.sort.length > 0) {
    params.sort = pageable.sort;
  }

  return params;
}

/**
 * Axios v1 paramsSerializer config that serializes array params as repeated keys
 * (`sort=a,desc&sort=b,asc`) instead of `sort[]=a,desc`, matching Spring Boot.
 */
export const SPRING_PARAMS_SERIALIZER = { indexes: null } as const;
