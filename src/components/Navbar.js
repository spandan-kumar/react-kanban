import React, { useState, useEffect, useRef, useMemo } from 'react';
import './Navbar.css';

const Navbar = ({ grouping, sorting, onGroupingChange, onSortingChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const groupingOptions = useMemo(() => [
    { value: 'status', label: 'Status' },
    { value: 'user', label: 'User' },
    { value: 'priority', label: 'Priority' }
  ], []);

  const sortingOptions = useMemo(() => [
    { value: 'priority', label: 'Priority' },
    { value: 'title', label: 'Title' }
  ], []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div ref={dropdownRef}>
        <div className="display-button" onClick={() => setIsOpen(!isOpen)}>
          <img src="/assets/Display.svg" alt="Display" />
          <span>Display</span>
          <img src="/assets/down.svg" alt="Down" className={isOpen ? 'rotated' : ''} />
        </div>

        {isOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item">
              <span>Grouping</span>
              <select 
                value={grouping} 
                onChange={(e) => onGroupingChange(e.target.value)}
              >
                {groupingOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div className="dropdown-item">
              <span>Ordering</span>
              <select 
                value={sorting} 
                onChange={(e) => onSortingChange(e.target.value)}
              >
                {sortingOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
