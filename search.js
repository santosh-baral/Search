import React, { useState, useEffect, useRef } from "react";
import { FaList, FaSearch,FaArrowUp,FaArrowDown,FaArrowLeft} from 'react-icons/fa';
const Search = ({ keyword, onChange }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupOpen(false);
      }
    };

    const handleEscKey = (event) => {
      if (event.keyCode === 27) {
        setPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  const handleInputClick = () => {
    setPopupOpen(true);
  };

  const handleShortcutKeyPress = (event) => {
    if (event.ctrlKey && event.key === "k") {
      setPopupOpen(true);
    }
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div>
      <div>
      <input
        className="search"
        id="search"
        type="text"
        value={keyword}
        placeholder='Search....'
        onChange={(e) => onChange(e.target.value)}
        onClick={handleInputClick}
        onKeyPress={handleShortcutKeyPress}
      />

        <FaSearch className="searchs" />

  </div>
      {isPopupOpen && (
        <div className="popup" ref={popupRef}>
       
        <input
        id="search"
        className="pop"
        type="text"
        value={keyword}
        placeholder={'Search....'}
        onChange={(e) => onChange(e.target.value)}
        onClick={handleInputClick}
        onKeyPress={handleShortcutKeyPress}
        />
        <FaSearch className="searchss"/>

        <FaList  className="list"/>
        
        
      <br/>
      <div className="info">
        <FaArrowUp/>
        <FaArrowDown/>
        <span> &nbsp; &nbsp;  to navigate</span> 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <FaArrowLeft/>  
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;esc&nbsp;&nbsp;&nbsp;&nbsp; to close</span>
        </div>
    
          </div>
      )}
      
    </div>
  );
};

export default Search;
