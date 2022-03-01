import React, { useEffect, useState } from 'react';
import './App.css';

const TWITTER_HANDLE = '419NFT';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TWITTER_LOGO = 'https://pbs.twimg.com/profile_banners/1408984211101523969/1645985683/600x200'

const TEST_GIFS = [
	'https://media4.giphy.com/media/9wLKh6ms5t9qE/giphy.gif?cid=ecf05e47owqs3n5p9df53ty9cw94tpkpweue6539xujokev7&rid=giphy.gif&ct=g',
	'https://media3.giphy.com/media/RZRG7eWed3Hws/giphy.gif?cid=ecf05e47ek9id4fltr7s04h7b9gk2mclsdc23e6lppnju2yc&rid=giphy.gif&ct=g',
	'https://media2.giphy.com/media/3o6EhQuCjYJj4t1fWM/giphy.gif?cid=ecf05e478fithmfhit0cjk755cspka4busf6fdw07ao4lxr5&rid=giphy.gif&ct=g',
	'https://media3.giphy.com/media/l1BgQUnWm4BHhCjAY/giphy.gif?cid=ecf05e47xlinxlqducr1dzdk0i3bf5qwosqd1axxte5chfts&rid=giphy.gif&ct=g'
]

// Main component launched from index.js by ReactDOM.render
const App = () => {
  // State of wallet connection
  const [walletAddress, setWalletAddress] = useState(null);
  const [gifInput, setGifInput] = useState('');
  
  // Function that checks if solana wallet is connected
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      
      if (solana) {
        console.log('Solana wallet found');
        if (solana.isPhantom) {
          console.log('Phantom')
        }
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log('Connected with Public Key:', response.publicKey.toString());
        setWalletAddress(response.publicKey.toString());
      } else {
        console.log('Solana wallet not found')
        alert('Solana wallet not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  // Hook to call the check wallet connected function once on component mount
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);
  
  // Function to connect wallet
  const connectWallet = async () => {
    try {
      const { solana } = window;
      
      if (solana) {
        const response = await solana.connect();
        console.log('Connected with Public Key:', response.publicKey.toString());
        setWalletAddress(response.publicKey.toString());
      } else {
        console.log('No solana wallet to connect')
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  // Function to render connect wallet container
  const renderConnectContainer = () => (
    <button
      className='cta-button connect-wallet-button'
      onClick={connectWallet}
    >
      {walletAddress ? 'Connected!' : 'Connect to wallet'}
    </button>
  );
  
  // Function to render gif container
  const renderGifContainer = () => (
    <div className="gif-container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendGif();
        }}
      >
        <input
          type="text"
          placeholder="Enter gif link!"
          value={gifInput}
          onChange={onInputChange}
        />
        <button type="submit" className="cta-button submit-gif-button">Submit</button>
      </form>
      <div className="gif-grid">
        {TEST_GIFS.map(gif => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );
  
  // Function for gif button
  const onInputChange = (event) => {
    const { value } = event.target;
    setGifInput(value);
  };
  
  // Function for gif submit to solana
  const sendGif = async () => {
    if (gifInput.length > 0) {
      console.log('Gif link: ', gifInput);
    } else {
      console.log('Empty input.');
    }
  };
  
  // main body of page
  return (
    <div className='App' style={{
      backgroundImage: !walletAddress ? 'url("/sky_banana.jpg")' : 'url("/space_banana.jpg")',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundSize: '100% 100%'
    }}>
      <div className='container'>
        <div className='header-container'>
          <p className='header'>419 Treehouse</p>
          <p className='sub-text'>
            A web3 app for 419 NFT holders
          </p>
          {!walletAddress && renderConnectContainer()}
          {walletAddress && renderGifContainer()}
        </div>
        <div className='footer'>
          <img alt='Twitter Logo' className='twitter-logo' src={TWITTER_LOGO} />
          <a
            className='footer-text'
            href={TWITTER_LINK}
            target='_blank'
            rel='noreferrer'
          >{TWITTER_HANDLE}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
