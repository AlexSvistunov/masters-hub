import  { useState } from 'react';  
import './CustomSelect.css'; // Импортируем стили  

const options = [  
  { value: 'apple', label: 'Apple' },  
  { value: 'banana', label: 'Banana' },  
  { value: 'cherry', label: 'Cherry' },  
  { value: 'date', label: 'Date' }  
];  

const CustomSelect = () => {  
  const [selectedOptions, setSelectedOptions] = useState([]);  

  const toggleOption = (value) => {  
    setSelectedOptions(prev =>  
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]  
    );  
  };  

  return (  
    <div className="custom-select">  
      <div className="select-box">  
        {selectedOptions.length === 0 ? (  
          <span>Select options...</span>  
        ) : (  
          selectedOptions.map(value => (  
            <div key={value} className="selected-option">  
              {options.find(option => option.value === value).label}  
              <span className="remove-option" onClick={() => toggleOption(value)}>✖</span>  
            </div>  
          ))  
        )}  
      </div>  
      <div className="options">  
        {options.map(option => (  
          <div  
            key={option.value}  
            className={`option ${selectedOptions.includes(option.value) ? 'selected' : ''}`}  
            onClick={() => toggleOption(option.value)}  
          >  
            {option.label}  
          </div>  
        ))}  
      </div>  
    </div>  
  );  
};  

export default CustomSelect;