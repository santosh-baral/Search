import React, { useState, useEffect } from 'react';
import { FaList} from 'react-icons/fa';
const Categories = ({ searchResults, onCategorySelect }) => {
    const [categories, setCategories] = useState([]);
  
    useEffect(() => {
      const uniqueCategories = [...new Set(searchResults.map((result) => result.category))];
      setCategories(uniqueCategories);
    }, [searchResults]);
  
    const handleCategorySelect = (category) => {
      onCategorySelect(category);
      console.log('Selected category:', category);
    };
        const [isListVisible, setListVisible] = useState(false);
      
        const handleToggleList = () => {
          setListVisible(!isListVisible);
        };
      
    
  return (
    <div className="categories">
    <div>
      <FaList onClick={handleToggleList}/>
      {isListVisible && (
        <ul>
          {categories.map((category) => (
            <li key={category} onClick={() => handleCategorySelect(category)}>
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
   
  </div>
  );
};

export default Categories;


