import React, { useEffect, useState } from 'react';
import './App.css';
import Switch from './components/switch';

const TWITTER_HANDLE = '419NFT';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TWITTER_LOGO = 'https://pbs.twimg.com/profile_banners/1408984211101523969/1645985683/600x200'

// Main component launched from index.js by ReactDOM.render
const App = () => {
  // State of wallet connection
  const [walletAddress, setWalletAddress] = useState(null);
  const [bgToggle, bgToggleSet] = useState(1);
  
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

  // Function to render UI differently if wallet is already connected
  const renderConnectContainer = () => (
    <button
      className='cta-button connect-wallet-button'
      onClick={connectWallet}
    >
      {walletAddress ? 'Connected!' : 'Connect to wallet'}
    </button>
  );

  // main body of page
  return (
    <div className='App' style={{
      backgroundImage: bgToggle ? 'url("/sky_banana.jpg")' : 'url("/space_banana.jpg")',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundSize: '100% 100%'
    }}>
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className='header-container'>
          <p className='header'>419 Treehouse</p>
          <p className='sub-text'>
            A web3 app for 419 NFT holders
          </p>
          {renderConnectContainer()}
          <Switch
            isOn={bgToggle}
            onColor='#EF476F'
            handleToggle={() => bgToggleSet(!bgToggle)}
          />
        </div>
        <div className='footer-container'>
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
