import React, {useState,useEffect} from 'react' ;
import Search from './search.js'
import Categories from './catagories.js';
import './App.css'

function App() {
  
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
const style={
  height:"50px",
  width:'50px',

};

const updateKeyword = (keyword) => {
  const filtered = searchResults.filter((result) => {
    //const resultId = String(result.price);
   return `${result.title.toLowerCase()} ${result.price} ${result.category.toLowerCase()}`.includes(keyword.toLowerCase());
  })
  setKeyword(keyword);
  setSearchResults(filtered);
};

const updateCategory = (category) => {
  setSelectedCategory(category);
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const jsonData = await response.json();
        setSearchResults(jsonData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="App">
    <Search keyword={keyword} onChange={updateKeyword}/>
    {searchResults.length === 0 ? (
        <div>No results found.</div>
      ) : (
        <ul>
          {searchResults.map((result) => (
            <li key={result.id} className='item'>
              <h3>{result.title}</h3>
              <p>Category: {result.category}</p>
              <p>Price: ${result.price}</p>
              <img src={result.image} alt={result.title} style={ style} />
              
            </li>
          ))}
        </ul>
      )}
      <Categories searchResults={searchResults} onCategorySelect={updateCategory}/>
     
    </div>
  );
}

export default App;
