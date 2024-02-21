import React, { useEffect, useRef, useState } from 'react';
import './multi-styles.scss';
import useClickOutside from '../../hooks/useClickOutside';
import { FaCheck, FaChevronDown, FaChevronUp } from "react-icons/fa";


const data = [
    'Richa',
    'Science',
    'Computer',
    'Social',
    'Earth',
    'Elections',
    'Ozone',
    'Lobox',
    'Frontend',
]

function MultiDropDown() {

  const [selectedData, setSelectedData] = useState<string>('');
  const [recievedData, updateRecievedData] = useState<string[]>(data);
  const [inputText, setInputText] = useState<string>('');
  const [expand, toggleExpand] = useState<boolean>(false);

  const onInputChange = (e : any) => {
      setInputText(e.target.value);
      console.log("e.key", e);
      setSelectedData(e.target.value);
  };

  const keyHandler = (e : any) => {
    if (e.key === 'Enter') {
      if(!recievedData.find(item => inputText === item)){
        updateRecievedData([...recievedData, inputText]);
      } 
    }
  };


  const selectItem = (item : string) => {
    setSelectedData(item);
    setInputText(item);
  };

  const ref = useRef(null);
  useClickOutside(ref, () => toggleExpand(false));

  return (
    <div className="multiDropDown" ref={ref}>
        <div className="inputBox">
          <input type="text" className='input' onChange={onInputChange} onKeyDown={keyHandler} value={inputText}/>
          <div className='expandCloseIcon' onClick={() => toggleExpand(!expand)}> 
            {!expand && <FaChevronDown /> }
            {expand && <FaChevronUp /> }
          </div>
        </div>
        <div className={`${expand ? 'dropdown' : 'hideDropDown'}`}>
          <div className='dropDownBox'>
            {
            recievedData.map((item, i) => {
              return (
                <div className={  `dropDownOption ${selectedData.length > 0 && selectedData === item  ? "dropDownOptionSelected" : ""}` } key={i} onClick={() => selectItem(item)}>{item}
                   {selectedData === item && <div className='checkIcon'>
                      <FaCheck />
                    </div>}
                </div>
              );
            })
          }
          </div>
        </div>


    </div>
  );
}

export default MultiDropDown;
