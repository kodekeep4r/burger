import React, { Component } from 'react';
import Web3 from 'web3';
import { ethers } from "ethers";
import Contract  from 'web3-eth-contract';





import './App.css';
import ContractNFT from '../abis/ContractNFT.json'

/**

 * agrega o cambia la red con el chainid que le mandes

 * si se le manda el chainid de la red que tiene el usario seleccionada no hace nada

 * @param {int} id es el chainid de la blockchain

 */
class App extends Component {

async addNetwork(id) {

  let networkData;
  switch (id) {
    //polygonmainnet
    case 137:
      networkData = [
        {
          chainId: "0x89",
          chainName: "Polygon (Matic) Mainnet",
          rpcUrls: ["https://polygon-rpc.com/"],
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
          },
          blockExplorerUrls: ["https://polygonscan.com/"],
        },
      ];
      break;
    //polygontestnet
      case 80001:
      networkData = [
        { chainId: "0x13881",
          chainName: "Mumbai Polygon (Matic) Testnet",
          rpcUrls: ["https://rpc.maticvigil.com/"],
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
          },
          blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com/"],
        },
      ];
      break;
    case 56:
      networkData = [
        {
          chainId: "0x38",
          chainName: "BSCMAINET",
          rpcUrls: ["https://bsc-dataseed1.binance.org"],
          nativeCurrency: {
            name: "BINANCE COIN",
            symbol: "BNB",
            decimals: 18,
          },
          blockExplorerUrls: ["https://testnet.bscscan.com/"],
        },
      ];
      break;
    default:
      break;
  }

  // agregar red o cambiar red

  return window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: networkData,
  });

}



  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()

  }

 
 
async loadWeb3() {
    if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
      //const provider = new ethers.providers.Web3Provider(window.ethereum)
      //const signer = provider.getSigner()



    }    
    else {
      window.alert('Please install a wallet on your browser to get burgers. You should consider trying MetaMask!')
    }
  }
  




  async loadBlockchainData() {
  
 
    try {
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: '0x13881' }],
  });
} catch (switchError) {
  // This error code indicates that the chain has not been added to MetaMask.
  if (switchError.code === 4902) {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{ chainId: "0x13881",
          chainName: "Mumbai Polygon (Matic) Testnet",
          rpcUrls: ["https://matic-mumbai.chainstacklabs.com/"],
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
          },
          blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com/"],
        }],
      });
    } catch (addError) {
      // handle "add" error
    }
  }
  // handle other "switch" errors
}
    
    const etaeta = window.ethereum
    //const web3 = await window.ethereum.request({ method: 'eth_requestAccounts' })
    // Load account
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    this.setState({ account: accounts[0] })

    const networkId = await window.ethereum.request({ method: 'net_version' })
    const networkData = ContractNFT.networks[networkId]
    if(networkData) {
      const abi = ContractNFT.abi
      const address = networkData.address
      const contract = new window.web3.eth.Contract(abi, address)
      //Contract.setProvider(this.provider);
      //const contract = new this.web3.eth.Contract(abi, address)
      //const contract = new ethers.Contract(address, abi, this.provider);

      //const contract = await  window.ethereum.request({method:'eth_getCode', params: [{address:'0xf6781DcA86041cE7236341Dea1149D656A60BC2C'}]})
      //console.log(contract.toString())
      this.setState({ contract })
      const totalSupply = await contract.methods.totalSupply().call()

      this.setState({ totalSupply })
      await this.retrieveMyTokens();



    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }
  
async retrieveAllTokens (){
     const totalSupply = this.state.totalSupply;
      for (var i = 1; i <= totalSupply; i++) {
        const burger = await this.state.contract.tokenByIndex(i - 1)
        this.setState({
          allBurgers: [...this.state.allBurgers, burger]
        })
      }
}
  
async getTotalAmount(quant){
  //const amount = await this.state.contract.getNFTPrice(quant)
    const amount = await this.state.contract.methods.getNFTPrice(quant).call()
  return amount
  }
  
async retrieveMyTokens(){

  const myTokensCount = await this.state.contract.methods.balanceOf(this.state.account).call()
  //const myTokensCount = await this.state.contract.balanceOf(this.state.account)
  for (var i=0; i < myTokensCount; i++){
        const burger = await this.state.contract.methods.tokenOfOwnerByIndex(this.state.account, i).call()
        //const burger = await this.state.contract.tokenOfOwnerByIndex(this.state.account, i)
        this.setState({
           myBurgers: [...this.state.myBurgers, burger]
        })
        
  }

}

async  mint  (quant)  { 
    const totalPrice = await this.getTotalAmount(quant)
    this.state.contract.methods.mintNFT(quant).send({ from: this.state.account,value: totalPrice })
    //this.state.contract.mintNFT(quant).send({ from: this.state.account,value: totalPrice })
    .once('receipt', (receipt) => {
      this.setState({
        burgers: [...this.state.burgers, quant]
      })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      gateway: 'https://ipfs.io/ipfs/QmVcpqQ7xsp29HF8UNenCQ7GxrdhUQaqa3rZzMq7yAFiN9/',
      account: '',
      contract: null,
      totalSupply: 0,
      web3: null,
      tokenPrice: 0,
      allBurgers: [],
      myBurgers:[]
    }
  }
  


  render() {
 
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.cryptoburger.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            CryptoBurgers
          </a>
          <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{this.state.account.substring(0,6)+'...'+this.state.account.substring(this.state.account.length -4)}</span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>Issue Token</h1>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const quant = this.color.value
                  this.mint(quant)
                }}>
                  <input
                    type='text'
                    className='form-control mb-1'
                    placeholder='Mint how many Burgers?'
                    ref={(input) => { this.color = input }}
                  />
                  <input
                    type='submit'
                    className='btn btn-block btn-primary'
                    value='MINT'
                  />
                </form>
              </div>
            </main>
          </div>
          <hr/>
                    <div className="row text-center">
            { this.state.myBurgers.map((burger, key) => {
              return(
                <div key={key} className="col-md-3 mb-3">
		<div> <img     
		         style={{ width: "100%", margin: "10px 0" }}     
		         alt={burger.toString()}    
		         src={this.state.gateway + burger.toString() +'.png'}      
		       />
		</div>
                  <div>{burger.toString()}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
