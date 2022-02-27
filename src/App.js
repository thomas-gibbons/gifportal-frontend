import React, { useEffect, useState } from 'react';
import './App.css';

const TWITTER_HANDLE = '419NFT';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TWITTER_LOGO = 'https://pbs.twimg.com/profile_banners/1408984211101523969/1643282611/600x200'

// Main component launched from index.js by ReactDOM.render
const App = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);
  
  // Function that checks if solana wallet is connected
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        console.log('Solana wallet found');
        if (solana.isPhantom) {
          console.log('(Phantom wallet)')
        }
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log(
          'Connected with Public Key:',
          response.publicKey.toString()
        );
        setWalletAddress(response.publicKey.toString());
      } else {
        console.log('Solana wallet not found')
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Call the check wallet connected function once on component mount
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  // Function to connect wallet
  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    } else {
      console.log('No solana wallet')
    }
  };

  // redner UI if wallet not yet connected
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
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">Monke Words of Wisdom</p>
          <p className="sub-text">
            Hear the words of the wise monkes of 419NFT
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
