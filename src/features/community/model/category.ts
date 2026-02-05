export type CommunityCategory = '공지' | '자유게시판' | '근무교대' | '휴무';

export function mapCategoryToVariant(category: CommunityCategory) {
  switch (category) {
    case '공지':
      return 'notice';
    case '자유게시판':
      return 'free';
    case '근무교대':
      return 'shift';
    case '휴무':
      return 'dayoff';
    default:
      return 'free';
  }
}
