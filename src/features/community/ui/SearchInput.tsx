import { useState, useEffect } from 'react';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  delay?: number;
}

export default function SearchInput({ placeholder, onSearch, delay = 500 }: SearchInputProps) {
  const [value, setValue] = useState('');

  // 검색 딜레이 주기
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, onSearch, delay]);

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder || '검색어를 입력하세요'}
      className="border px-3 py-1 rounded-2xl text-sm"
    />
  );
}
