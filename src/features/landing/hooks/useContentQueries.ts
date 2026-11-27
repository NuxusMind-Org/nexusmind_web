import { useQuery } from '@tanstack/react-query';
import { newsApi } from '@/api/news.api';
import { blogsApi } from '@/api/blogs.api';
import { articlesApi } from '@/api/articles.api';
import { galleryApi, type GalleryQueryParams } from '@/api/gallery.api';

export const contentQueryKeys = {
  newsList: ['content', 'news', 'list'] as const,
  newsDetail: (id: string | number) => ['content', 'news', 'detail', String(id)] as const,
  blogsList: ['content', 'blogs', 'list'] as const,
  blogDetail: (id: string | number) => ['content', 'blogs', 'detail', String(id)] as const,
  articlesList: ['content', 'articles', 'list'] as const,
  articleDetail: (id: string | number) => ['content', 'articles', 'detail', String(id)] as const,
  gallery: (params?: GalleryQueryParams) => ['content', 'gallery', params ?? {}] as const,
};

export function useNewsList() {
  return useQuery({
    queryKey: contentQueryKeys.newsList,
    queryFn: () => newsApi.getAll(),
  });
}

export function useNewsDetail(id?: string | number) {
  return useQuery({
    queryKey: contentQueryKeys.newsDetail(id ?? ''),
    queryFn: () => newsApi.getById(id!),
    enabled: Boolean(id),
  });
}

export function useBlogsList() {
  return useQuery({
    queryKey: contentQueryKeys.blogsList,
    queryFn: () => blogsApi.getAll(),
  });
}

export function useBlogDetail(id?: string | number) {
  return useQuery({
    queryKey: contentQueryKeys.blogDetail(id ?? ''),
    queryFn: () => blogsApi.getById(id!),
    enabled: Boolean(id),
  });
}

export function useArticlesList() {
  return useQuery({
    queryKey: contentQueryKeys.articlesList,
    queryFn: () => articlesApi.getAll(),
  });
}

export function useArticleDetail(id?: string | number) {
  return useQuery({
    queryKey: contentQueryKeys.articleDetail(id ?? ''),
    queryFn: () => articlesApi.getById(id!),
    enabled: Boolean(id),
  });
}

export function useGalleryItems(params?: GalleryQueryParams) {
  return useQuery({
    queryKey: contentQueryKeys.gallery(params),
    queryFn: () => galleryApi.getItems(params),
  });
}
