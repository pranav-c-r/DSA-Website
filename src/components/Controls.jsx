import React, { useState } from 'react';

const Controls = ({ onInsert, onDelete, onClear, onRandom }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === '') return;
    onInsert(value);
    setValue('');
  };

  return (
    <div className="controls-container">
      <form onSubmit={handleSubmit} className="control-form">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a number"
          className="control-input"
        />
        <div className="button-group">
          <button type="submit" className="control-button insert">
            Insert
          </button>
          <button 
            type="button" 
            className="control-button delete"
            onClick={() => {
              if (value.trim() !== '') {
                onDelete(value);
                setValue('');
              }
            }}
          >
            Delete
          </button>
          <button 
            type="button" 
            className="control-button random"
            onClick={onRandom}
          >
            Random Tree
          </button>
          <button 
            type="button" 
            className="control-button clear"
            onClick={onClear}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Controls;