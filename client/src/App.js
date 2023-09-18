import abi from './contract/chiya.json'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import Buy from './components/Buy';
import Memos from './components/Memos';
import './App.css';
function App() {
  //useful template
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x2f706F96369BFb0327adC9C36Af1b1FD5799A360";
      const contractAbi = abi.abi;
      try {
        const { ethereum } = window;
        if (ethereum) {
          // eslint-disable-next-line
          const account = await ethereum.request({ method: "eth_requestAccounts", })
        }
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);
        setState({ provider, signer, contract });
      } catch (error) {
        console.log(error);
      }
    }
    connectWallet();
  }, [])
  return (
    <div >
      <div >
      <img style={{width:"100%"}} src="/Img.png" alt="" />
      </div>
      <div className='container'>
      <Buy state={state} />
      <Memos state={state}/>
      </div>
    </div>
  );
}

export default App;
