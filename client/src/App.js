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
  const [account, setAccount] = useState("None")
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x2f706F96369BFb0327adC9C36Af1b1FD5799A360";
      const contractAbi = abi.abi;
      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({ method: "eth_requestAccounts", })

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          })
          window.ethereum.on("accountChanged", () => {
            window.location.reload();
          })

          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractAbi, signer);
          setAccount(account)
          setState({ provider, signer, contract });
        } else {
          alert("Please Install Metamask");
        }
      } catch (error) {
        console.log(error);
      }
    }
    connectWallet();
  }, [])
  return (
    <div >
      <div >
        <img style={{ width: "100%" }} src="/Img.png" alt="" />
        <p
          class="text-muted lead "
          style={{ marginTop: "10px", marginLeft: "5px" }}
        >
          <small>Connected Account - {account}</small>
        </p>

      </div>
      <div className='container'>
        <Buy state={state} />
        <Memos state={state} />
      </div>
    </div>
  );
}

export default App;
