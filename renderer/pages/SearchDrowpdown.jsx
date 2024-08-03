// SearchDropdown.jsx
import React, { useState, useEffect, useRef } from 'react';

const SearchDropdown = ({
  searchTerm = '',
  setSearchTerm,
  items = [],
  isParty=false
}) => {
  const [filteredItems, setFilteredItems] = useState(items);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length > 0) {
      const filtered = items.filter(item =>
        item?.toLowerCase()?.includes(term?.toLowerCase())
      );
      setFilteredItems(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
    setHighlightedIndex(-1); // Reset highlighted index when search term changes
  };

  const handleItemClick = (item) => {
    setSearchTerm(item);
    setShowDropdown(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex(prevIndex =>
        Math.min(prevIndex + 1, filteredItems.length - 1)
      );
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex(prevIndex =>
        Math.max(prevIndex - 1, 0)
      );
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      handleItemClick(filteredItems[highlightedIndex]);
      // Move focus to the next div element
      const nextElement = dropdownRef.current.nextElementSibling;
      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  const handleFocus = () => {
    if (searchTerm.length > 0) {
      setShowDropdown(true);
    }
  };

  const handleBlur = () => {
    // Delay the hiding of the dropdown to allow click event to register
    setTimeout(() => setShowDropdown(false), 100);
  };

  useEffect(() => {
    if (highlightedIndex >= 0 && highlightedIndex < filteredItems.length) {
      const highlightedItem = document.getElementById(`dropdown-item-${highlightedIndex}`);
      if (highlightedItem) {
        highlightedItem.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex]);

  return (
    <div className="relative w-64" ref={dropdownRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputRef}
        className="p-2 border border-gray-300 rounded"
        placeholder="Search..."
      />
      {showDropdown && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <li
                key={index}
                id={`dropdown-item-${index}`}
                className={`p-2 hover:bg-gray-200 cursor-pointer ${highlightedIndex === index ? 'bg-gray-200' : ''}`}
                onClick={() => handleItemClick(item)}
              >
                {item}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchDropdown;
