import React, { useEffect, useState } from 'react';
import './App.css';

const TWITTER_HANDLE = '419NFT';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TWITTER_LOGO = 'https://pbs.twimg.com/profile_banners/1408984211101523969/1645985683/600x200'

// Main component launched from index.js by ReactDOM.render
const App = () => {
  // State of wallet connection
  const [walletAddress, setWalletAddress] = useState(null);
  
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

  // Function to render UI if wallet not yet connected
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  // main body of page
  return (
    <div className="App" style={{
      backgroundImage: `url("https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/falling-bananas-thru-clouds-mary-ann-leitch.jpg")`,
      backgroundRepeat: `no-repeat`,
      backgroundAttachment: `fixed`,
      backgroundSize: `100% 100%`
    }}>
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">Monke Tree</p>
          <p className="sub-text">
            A web3 app for 419 NFT holders
          </p>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={TWITTER_LOGO} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{TWITTER_HANDLE}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
