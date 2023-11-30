import React, { useState, useEffect } from 'react';

const captchaContainerStyle = {
  textAlign: 'center',
  margin: '20px auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  maxWidth: '400px',
  minHeight: '400px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
};

const captchaStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  background: 'url("https://th.bing.com/th/id/OIP.syT7Ar-5DtO3jnTEemQpJwAAAA?pid=ImgDet&rs=1")', // Replace with your background image URL
  color: '#fff',
  padding: '10px',
  borderRadius: '5px',
};

const validStyle = {
  color: 'green',
};

const invalidStyle = {
  color: 'red',
};

const userPicStyle = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  border: '2px solid #000',
};

function Captcha() {
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60); // Set the time limit in seconds

  useEffect(() => {
    generateRandomCaptcha();
  }, []); // Generate the CAPTCHA when the component mounts

  const generateRandomCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      captcha += characters.charAt(randomIndex);
    }
    setGeneratedCaptcha(captcha);
    setIsValid(null); // Reset validation status
    setTimeLeft(60); // Reset the timer
  };

  const handleUserInput = () => {
    if (userInput === generatedCaptcha) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        generateRandomCaptcha(); // Reset the CAPTCHA when the timer expires
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div style={captchaContainerStyle}>
      <h2>CAPTCHA</h2>
      <div>
        <img src="https://p7.hiclipart.com/preview/922/81/315/stock-photography-computer-icons-user-3d-character-icon-vector-material-thumbnail.jpg" alt="User Pic" style={userPicStyle} />
      </div>
      <button onClick={generateRandomCaptcha}>Generate CAPTCHA</button>
      <div className="captcha" style={captchaStyle}>
        <span style={isValid === true ? validStyle : isValid === false ? invalidStyle : {}}>
          {generatedCaptcha}
        </span>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter CAPTCHA"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={handleUserInput}>Validate</button>
      </div>
      <p>{timeLeft} seconds remaining</p>
      {isValid === true && <p style={validStyle}>CAPTCHA is valid!</p>}
      {isValid === false && <p style={invalidStyle}>CAPTCHA is invalid.</p>}
    </div>
  );
}

export default Captcha;
