export const QUERY_KEYS = {
  auth: {
    base: ['auth'] as const,
    me: () => [...QUERY_KEYS.auth.base, 'me'] as const,
  },

  post: {
    base: ['post'] as const,
    all: () => [...QUERY_KEYS.post.base, 'all'] as const,
    detail: (postId: number) => [...QUERY_KEYS.post.base, 'detail', postId] as const,
  },

  community: {
    base: ['community'] as const,
    posts: () => [...QUERY_KEYS.community.base, 'posts'] as const,
    post: (postId: number) => [...QUERY_KEYS.community.base, 'post', postId] as const,
  },

  pay: {
    base: ['pay'] as const,
    overview: (year: number) => [...QUERY_KEYS.pay.base, 'overview', year] as const,
    detail: (payId: number) => [...QUERY_KEYS.pay.base, 'detail', payId] as const,
  },
} as const;
