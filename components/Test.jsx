import { useState } from "react";


const submitStyle = {
  margin: '5px auto',
  padding: '7px 10px',
  border: '1px solid rgb(239, 255, 255)',
  borderRadius: 3,
  background: 'rgb(48, 133, 214)',
  fontSize: 15,
  color: 'white',
  display: 'flex',
  cursor: 'pointer'
};

const textStyle = {
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontSize: '15px'
}

const Test = () => {
  const [displayed, setDisplayed] = useState(false);
  return (
    <div className="App">
      <button
        style={submitStyle}
        onMouseEnter={() => setDisplayed(true)}
        onMouseLeave={() => setDisplayed(false)}
      >
        Hover over me!
      </button>
      {displayed && (
        <div style={textStyle}>
          Text that will appear when you hover over the button.
        </div>
      )}
    </div>
  );
}
export default Test;