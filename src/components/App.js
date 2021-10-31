import React, { Component } from 'react';
//import Web3 from 'web3';
import { ethers } from "ethers";
//import Contract  from 'web3-eth-contract';
import '../font.ttf';






import styles from './Variables.module.css';
import ContractBurger from '../abis/ContractBurger.json'
//import Siteo from '../site.png';
import Order from '../site.png';


/**
 * adds or changes network

 * if chainid sent exists just switches, otherwise it asks to add

 * @param {int} id is the chainid of the blockchain

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
    case 43113:
      networkData = [
        {
          chainId: "0xA869",
          chainName: "Avalanche - Fuji Testnet",
          rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
          nativeCurrency: {
            name: "AVAX",
            symbol: "AVAX",
            decimals: 18,
          },
          blockExplorerUrls: ["https://cchain.explorer.avax-test.network/"],
        },
      ];
      break;
      case 43114:
      networkData = [
        {
          chainId: "0xA86A",
          chainName: "Avalanche - Fuji Testnet",
          rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
          nativeCurrency: {
            name: "AVAX",
            symbol: "AVAX",
            decimals: 18,
          },
          blockExplorerUrls: ["https://cchain.explorer.avax.network/"],
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
    //await this.loadWeb3()
    await this.loadBlockchainData()

  }

  /*
async LoadEthers(){
  if (window.ethereum) {

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    // Prompt user for account connections
    
  }    
    else {
      window.alert('Please install a wallet on your browser to get burgers. You should consider trying MetaMask!')
    }
}
 
async loadWeb3() {
    if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    
    }    
    else {
      window.alert('Please install a wallet on your browser to get burgers. You should consider trying MetaMask!')
    }
  }
  
*/



  async loadBlockchainData() {  
 
    try {
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: '0xA869' }],
  });
} catch (switchError) {
  // This error code indicates that the chain has not been added to MetaMask.
  if (switchError.code === 4902) {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{ chainId: "0xA869",
          chainName: "Avalanche - FUJI Testnet",
          rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
          nativeCurrency: {
            name: "AVAX",
            symbol: "AVAX",
            decimals: 18,
          },
          blockExplorerUrls: ["https://cchain.explorer.avax-test.network/"],
        }],
      });
    } catch (addError) {
      // handle "add" error
    }
  }
  // handle other "switch" errors
}
    


/*
   //Keeping web3 until Ethers is usable
    //const web3 = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const accountsWeb3 = await window.ethereum.request({ method: 'eth_requestAccounts' })
    console.log("Account web3", accountsWeb3[0])
    //this.setState({ accweb3: accountsWeb3[0]})

*/

    // Load account
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    
    //Retrieving Accounts
    await provider.send("eth_requestAccounts");
    const signer =  provider.getSigner();
    const accountEthers = await signer.getAddress();
    console.log("Account Ethers:", accountEthers);
    this.setState({ account: accountEthers})


//Retrieving NetworkId
await provider.send("net_version", []);
const networkId = await provider.getNetwork();
console.log("Network: ", (networkId.chainId));
//this.setState({ account: accounts[0] })


   const networkData = ContractBurger.networks[networkId.chainId]
    /*
   const abiT = ContractNFT.abi
   const addressBeforeCheckSum= networkData.address

   console.log("Contract Address: ",addressBeforeCheckSum, ethers.utils.getAddress(addressBeforeCheckSum))
   console.log("Wallet web3: ",accountsWeb3[0], ethers.utils.getAddress(accountsWeb3[0]))
   console.log("Wallet Ethers: ",accountEthers, ethers.utils.getAddress(accountEthers))



   const nftContract = new ethers.Contract(addressBeforeCheckSum, abiT, provider);

   const balanceWeb3   = await nftContract.balanceOf(accountsWeb3[0]);
   const balanceEthers = await nftContract.balanceOf(accountEthers);


   console.log("balanceWeb3",balanceWeb3 )

   console.log("balanceEthers" , balanceEthers)

*/
    

    
    //const networkId = await window.ethereum.request({ method: 'net_version' })
   
    console.log("networkData: ",networkData);

    //const network = provider.getNetwork();


    

    if(networkData) {
      try{
      const abi = ContractBurger.abi
      const contractAddress = networkData.address
      const contract = new  ethers.Contract(contractAddress, abi, signer)
      //Contract.setProvider(this.provider);
      //const contract = new this.web3.eth.Contract(abi, address)
      //const contract = new ethers.Contract(address, abi, this.provider);
      this.setState({contractAddress})
      //const contract = await  window.ethereum.request({method:'eth_getCode', params: [{address:'0xf6781DcA86041cE7236341Dea1149D656A60BC2C'}]})
      //console.log(contract.toString())
      this.setState({ contract })
      const totalSupply = await contract.totalSupply()
      const intTotalSupply = parseInt(totalSupply, 10); // AVALANCHE RETURNS DECIMAL, WHILE MATIC RETURNS HEXA
      this.setState({ intTotalSupply });

      console.log(this.state.intTotalSupply);

      //ethers.utils.
      //console.log("ethers utils", ethers.utils.(this.state.account))
      // const myTokensCount = await this.state.contract.balanceOf(this.state.account)
      
     //const nftContract = await ethers.getContractAt(abi, address);
     
      await this.retrieveMyTokens();

      }catch (Exception){
        console.log(Exception)
      }


    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }
  
  async retrieveMyTokens(){

    const myTokensCount = await this.state.contract.balanceOf(this.state.account)
    //console.log("mytokenscount",myTokensCount)
    //const myTokensCount = await this.state.contract.balanceOf(this.state.account)
    for (var i=0; i < myTokensCount; i++){
          const burger = await this.state.contract.tokenOfOwnerByIndex(this.state.account, i)
          //const burger = await this.state.contract.tokenOfOwnerByIndex(this.state.account, i)
          this.setState({
             myBurgers: [...this.state.myBurgers, burger]
          })
          
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
    const amount = await this.state.contract.getNFTPrice(quant)
  return amount
  }

  
  
/*
filterMyNewBurgers = {
    address: this.state.contractAddress,
    topics: [
        id("mintNFT([myaddress,address,uint256)"),
        null,
        hexZeroPad(this.state.account, 32)
    ]
};*/

async  mint  (quanto)  { 
    const totalPrice = await this.getTotalAmount(quanto)
    console.log(quanto, totalPrice)
    this.state.contract.mintBurger(quanto ,{ value: totalPrice })  
    
    this.state.contract.on("Transfer", (to, amount, from) => {
      //console.log(to, amount, from);
      window.location.reload();

  });

    
  }
  

  /*
  const lala = this.state.contract.once('logs', (receipt) => {
      console.log(receipt)
      this.setState({
        myBurgers: [...this.state.myBurgers, receipt]
      })
      window.location.reload();
    })  */

/*
  const dataMap = dataSource.reduce((acc, curr) => {
    const prodArr = acc[curr.product.name];
    return { ...acc, [curr.product.name]: prodArr ? [...prodArr, curr] : [curr] };
  }, {});
*/

  constructor(props) {
    super(props)
    this.state = {
      gateway: 'https://ipfs.io/ipfs/QmQNLs4TUN3xfRM5LDPuhP9KeEkX9cK3XTQ9CFU8NGxEPS/',
      account: '',
      accweb3: '',
      contract: null,
      totalSupply: 0,
      tokenPrice: 0,
      allBurgers: [],
      myBurgers:[],
      intTotalSupply: 1,
      contractAddress:'',
    }
  }
  


  render() {
 
    return (
      

      
      
      <div id={styles.CryptoBurger}>
          <div id={styles.MintingPage}>
          <div id={styles.MenuBg}>

            <div id={styles.Menu}>
                <div id={styles.ContainsLinks}>
                  <div id={styles.LinkoTw}> <a href="https://twitter.com/crptburger" target="_blank" rel="noopener noreferrer">TWITTER </a> </div>
                  <div id={styles.LinkoTe}> <a href="https://t.me/cryptoburger_official" target="_blank" rel="noopener noreferrer">TELEGRAM </a></div>
                  <div id={styles.LinkoDi}> <a href="https://cryptoburger.art" target="_blank" rel="noopener noreferrer">MARKETPLACE </a></div>
                </div>

                <div id={styles.ContainsInfo}>
                  <div id={styles.InfoTotalSupply}><div id={styles.TSL}> Total Supply </div><div id={styles.TSR} >20,020</div></div>
                  <div id={styles.InfoCurrentSupply}><div id={styles.TSL}> Current Supply </div><div id={styles.TSR} > { this.state.intTotalSupply  } </div></div>
                  <div id={styles.InfoUnitPrice}><div id={styles.TSL}> Burger Price</div><div id={styles.TSR} >AVAX 0.69</div></div>
                </div>

                <div id={styles.ContainsBuy}>
                        <form onSubmit={(event) => {
                                    event.preventDefault();
                                    const quant = this.burger.value;
                                    this.mint(quant);
                                } }>
                                <span>
                                    <input
                                      className={styles.Button}
                                      type='submit'
                                      value='ORDER NOW'
                                      img={Order} />
                                </span>
                                <span>

                                    <input
                                      className={styles.Qtt}
                                      type="number"
                                      maxlenght="2"
                                      min="1"
                                      max="20"
                                      size="2"
                                      defaultValue="1"
                                      ref={(input) => { this.burger = input; } } />
                                  </span>
                          </form>
                  </div >
            </div> 
          
        </div>
        </div>

              
        <div id={styles.MyBurgersPage}>
        <div id={styles.MyBurgersBg}>
        
            <div id= {styles.MyBurguerHeader}>
               <h1>My Burger Collection</h1></div>
            <p></p>
            <div id={styles.BurgerContent}>
            <div className="row text-center">
            { this.state.myBurgers.map((burger, key) => {
              return(
                <div key={key} className="col-md-2 mb-1">
		<div> <img     
		         style={{ width: "100%", margin: "5px 0" }}     
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

        </div>

    </div>


       
    
    );
  }
}

export default App;
