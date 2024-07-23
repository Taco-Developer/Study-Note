import { useRef, useState } from 'react';

function SearchableList({ items, itemKeyFn, children }) {
  const lastChange = useRef();
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 디바운싱 => 모든 입력에 항상 검색하는 것이 아닌 일정 기간 입력이 중지되면 검색
  const handleChange = (event) => {
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }

    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      setSearchTerm(event.target.value);
    }, 500);
  };

  return (
    <div className="searchable-list">
      <input type="search" placeholder="Search" onChange={handleChange} />
      <ul>
        {searchResults.map((item) => (
          <li key={itemKeyFn(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchableList;
