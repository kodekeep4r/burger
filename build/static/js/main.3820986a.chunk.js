(this["webpackJsonpcrpt-burger-mkt"]=this["webpackJsonpcrpt-burger-mkt"]||[]).push([[0],{10:function(t,e,n){t.exports={CryptoBurger:"Variables_CryptoBurger__3BCkC",MintingPage:"Variables_MintingPage__1MNx4",MenuBg:"Variables_MenuBg__1Kftx",Menu:"Variables_Menu__2X-cS",MenuContent:"Variables_MenuContent__fX84i",ContainsLinks:"Variables_ContainsLinks__3JYQ4",LinkoTw:"Variables_LinkoTw__2pt6f",LinkoTe:"Variables_LinkoTe__2PUcF",LinkoDi:"Variables_LinkoDi__2B0JC",ContainsInfo:"Variables_ContainsInfo__1stI1",InfoTotalSupply:"Variables_InfoTotalSupply__2z2rN",InfoCurrentSupply:"Variables_InfoCurrentSupply__2C7q1",InfoUnitPrice:"Variables_InfoUnitPrice__3gh7j",Pinpin:"Variables_Pinpin__24PtR",TSL:"Variables_TSL__6iN-h",TSR:"Variables_TSR__3ZIYJ",ContainsBuy:"Variables_ContainsBuy__3a2vY",ContainsBuy_old:"Variables_ContainsBuy_old__2j-JD",Button:"Variables_Button__12YkT",Qtt:"Variables_Qtt__3K0Ct","tnp-subscription":"Variables_tnp-subscription__1f-Yq","tnp-submit":"Variables_tnp-submit__2KF2u",bg:"Variables_bg__25kCg",MyBurgersPage:"Variables_MyBurgersPage__xW13W",MyBurgersBg:"Variables_MyBurgersBg__1pLYH",MyBurgerHeader:"Variables_MyBurgerHeader__2l7RP",BurgerContent:"Variables_BurgerContent__r2W7u"}},27:function(t){t.exports=JSON.parse('{"contractName":"ContractBurger","networks":{"43114":{"events":{},"links":{},"address":"0x532d4aBB6c9Bb6514BecBA8b672FBc46077cA1e3","transactionHash":"0xc315eec146829de958926c03eb579021492d4874ca0fe91022f998b0a3425f1f"}},"abi":[{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"string","name":"baseURI","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_RESERVE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SALE_START_TIMESTAMP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_dataVault","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"minPrice","type":"uint256"}],"name":"acceptBidForTexugo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"buyTexugo","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"name":"changeBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"donationRecipient","type":"address"}],"name":"changeDonationRecipient","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"royalRecipient","type":"address"}],"name":"changeRoyalRecipient","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"currentDraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"dataVault","type":"string"}],"name":"dataVaultOnChain","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dateDraw1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"drawAfterTotalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"drawAmounts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"enterBidForTexugo","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"fundsDon","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fundsDraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fundsRoyal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDonationRecipient","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDraw1Recipient","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getNFTPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRoyalRecipient","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"imageHash","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mintBurger","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"minSalePriceInWei","type":"uint256"}],"name":"offerTexugoForSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"pendingWithdrawals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"randIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reserved","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"new_SALE_START_TIMESTAMP","type":"uint256"}],"name":"setSaleTimestamp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"texugoBids","outputs":[{"internalType":"bool","name":"hasBid","type":"bool"},{"internalType":"uint256","name":"texugoIndex","type":"uint256"},{"internalType":"address","name":"bidder","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"texugoIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"texugoNoLongerForSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"texugosOfferedForSale","outputs":[{"internalType":"bool","name":"isForSale","type":"bool"},{"internalType":"uint256","name":"texugoIndex","type":"uint256"},{"internalType":"address","name":"seller","type":"address"},{"internalType":"uint256","name":"minValue","type":"uint256"},{"internalType":"address","name":"onlySellTo","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"texugosRemainingToAssign","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferEther","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unitprice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"withdrawBidForTexugo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawDonation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawFundsDraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawRoyal","outputs":[],"stateMutability":"nonpayable","type":"function"}]}')},53:function(t,e){},64:function(t,e,n){"use strict";n.r(e);var a=n(24),i=n(37),r=n.n(i),s=(n(47),n(19)),u=n(2),p=n.n(u),o=n(17),l=n(3),y=n(4),c=n(6),d=n(5),m=n(29),b=(n.p,n(10)),f=n.n(b),T=n(27),h=n.p+"static/media/site.9d517bf6.png",v=n(9),x=function(t){Object(c.a)(n,t);var e=Object(d.a)(n);function n(t){var a;return Object(l.a)(this,n),(a=e.call(this,t)).state={gateway:"https://ipfs.io/ipfs/QmQNLs4TUN3xfRM5LDPuhP9KeEkX9cK3XTQ9CFU8NGxEPS/",account:"",accweb3:"",contract:null,totalSupply:0,tokenPrice:0,allBurgers:[],myBurgers:[],intTotalSupply:1,contractAddress:""},a}return Object(y.a)(n,[{key:"addNetwork",value:function(){var t=Object(o.a)(p.a.mark((function t(e){var n;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:t.t0=e,t.next=137===t.t0?3:80001===t.t0?5:43113===t.t0?7:43114===t.t0?9:11;break;case 3:return n=[{chainId:"0x89",chainName:"Polygon (Matic) Mainnet",rpcUrls:["https://polygon-rpc.com/"],nativeCurrency:{name:"MATIC",symbol:"MATIC",decimals:18},blockExplorerUrls:["https://polygonscan.com/"]}],t.abrupt("break",12);case 5:return n=[{chainId:"0x13881",chainName:"Mumbai Polygon (Matic) Testnet",rpcUrls:["https://rpc.maticvigil.com/"],nativeCurrency:{name:"MATIC",symbol:"MATIC",decimals:18},blockExplorerUrls:["https://explorer-mumbai.maticvigil.com/"]}],t.abrupt("break",12);case 7:return n=[{chainId:"0xA869",chainName:"Avalanche - Fuji Testnet",rpcUrls:["https://api.avax-test.network/ext/bc/C/rpc"],nativeCurrency:{name:"AVAX",symbol:"AVAX",decimals:18},blockExplorerUrls:["https://cchain.explorer.avax-test.network/"]}],t.abrupt("break",12);case 9:return n=[{chainId:"0xA86A",chainName:"Avalanche - Fuji Testnet",rpcUrls:["https://api.avax.network/ext/bc/C/rpc"],nativeCurrency:{name:"AVAX",symbol:"AVAX",decimals:18},blockExplorerUrls:["https://cchain.explorer.avax.network/"]}],t.abrupt("break",12);case 11:return t.abrupt("break",12);case 12:return t.abrupt("return",window.ethereum.request({method:"wallet_addEthereumChain",params:n}));case 13:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},{key:"componentWillMount",value:function(){var t=Object(o.a)(p.a.mark((function t(){return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.loadBlockchainData();case 2:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"loadBlockchainData",value:function(){var t=Object(o.a)(p.a.mark((function t(){var e,n,a,i,r,s,u,o,l,y;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,window.ethereum.request({method:"wallet_switchEthereumChain",params:[{chainId:"0xA86A"}]});case 3:t.next=15;break;case 5:if(t.prev=5,t.t0=t.catch(0),4902!==t.t0.code){t.next=15;break}return t.prev=8,t.next=11,window.ethereum.request({method:"wallet_addEthereumChain",params:[{chainId:"0xA86A",chainName:"Avalanche Mainnet",rpcUrls:["https://api.avax.network/ext/bc/C/rpc"],nativeCurrency:{symbol:"AVAX",decimals:18},blockExplorerUrls:["https://cchain.explorer.avax.network"]}]});case 11:t.next=15;break;case 13:t.prev=13,t.t1=t.catch(8);case 15:return e=new m.a.providers.Web3Provider(window.ethereum,"any"),t.next=18,e.send("eth_requestAccounts");case 18:return n=e.getSigner(),t.next=21,n.getAddress();case 21:return a=t.sent,console.log("Account Ethers:",a),this.setState({account:a}),t.next=26,e.send("net_version",[]);case 26:return t.next=28,e.getNetwork();case 28:if(i=t.sent,console.log("Network: ",i.chainId),r=T.networks[i.chainId],console.log("networkData: ",r),!r){t.next=54;break}return t.prev=33,s=T.abi,u=r.address,o=new m.a.Contract(u,s,n),this.setState({contractAddress:u}),this.setState({contract:o}),t.next=41,o.totalSupply();case 41:return l=t.sent,y=parseInt(l,10),this.setState({intTotalSupply:y}),console.log(this.state.intTotalSupply),t.next=47,this.retrieveMyTokens();case 47:t.next=52;break;case 49:t.prev=49,t.t2=t.catch(33),console.log(t.t2);case 52:t.next=55;break;case 54:window.alert("Smart contract not deployed to detected network.");case 55:case"end":return t.stop()}}),t,this,[[0,5],[8,13],[33,49]])})));return function(){return t.apply(this,arguments)}}()},{key:"retrieveMyTokens",value:function(){var t=Object(o.a)(p.a.mark((function t(){var e,n,a;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.state.contract.balanceOf(this.state.account);case 2:e=t.sent,n=0;case 4:if(!(n<e)){t.next=12;break}return t.next=7,this.state.contract.tokenOfOwnerByIndex(this.state.account,n);case 7:a=t.sent,this.setState({myBurgers:[].concat(Object(s.a)(this.state.myBurgers),[a])});case 9:n++,t.next=4;break;case 12:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"retrieveAllTokens",value:function(){var t=Object(o.a)(p.a.mark((function t(){var e,n,a;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=this.state.totalSupply,n=1;case 2:if(!(n<=e)){t.next=10;break}return t.next=5,this.state.contract.tokenByIndex(n-1);case 5:a=t.sent,this.setState({allBurgers:[].concat(Object(s.a)(this.state.allBurgers),[a])});case 7:n++,t.next=2;break;case 10:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"getTotalAmount",value:function(){var t=Object(o.a)(p.a.mark((function t(e){var n;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.state.contract.getNFTPrice(e);case 2:return n=t.sent,t.abrupt("return",n);case 4:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"mint",value:function(){var t=Object(o.a)(p.a.mark((function t(e){var n;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.getTotalAmount(e);case 2:n=t.sent,console.log(e,n),this.state.contract.mintBurger(e,{value:n}),this.state.contract.on("Transfer",(function(t,e,n){window.location.reload()}));case 6:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"render",value:function(){var t=this;return Object(v.jsxs)("div",{id:f.a.CryptoBurger,children:[Object(v.jsx)("div",{id:f.a.MintingPage,children:Object(v.jsx)("div",{id:f.a.MenuBg,children:Object(v.jsxs)("div",{id:f.a.Menu,children:[Object(v.jsxs)("div",{id:f.a.ContainsLinks,children:[Object(v.jsxs)("div",{id:f.a.LinkoTw,children:[" ",Object(v.jsx)("a",{href:"https://twitter.com/crptburger",target:"_blank",rel:"noopener noreferrer",children:"TWITTER "})," "]}),Object(v.jsxs)("div",{id:f.a.LinkoTe,children:[" ",Object(v.jsx)("a",{href:"https://t.me/cryptoburger_official",target:"_blank",rel:"noopener noreferrer",children:"TELEGRAM "})]}),Object(v.jsxs)("div",{id:f.a.LinkoDi,children:[" ",Object(v.jsx)("a",{href:"https://cryptoburger.art",target:"_blank",rel:"noopener noreferrer",children:"MARKETPLACE "})]})]}),Object(v.jsxs)("div",{id:f.a.ContainsInfo,children:[Object(v.jsxs)("div",{id:f.a.InfoTotalSupply,children:[Object(v.jsx)("div",{id:f.a.TSL,children:" Total Supply "}),Object(v.jsx)("div",{id:f.a.TSR,children:"20,020"})]}),Object(v.jsxs)("div",{id:f.a.InfoCurrentSupply,children:[Object(v.jsx)("div",{id:f.a.TSL,children:" Current Supply "}),Object(v.jsxs)("div",{id:f.a.TSR,children:[" ",this.state.intTotalSupply," "]})]}),Object(v.jsxs)("div",{id:f.a.InfoUnitPrice,children:[Object(v.jsx)("div",{id:f.a.TSL,children:" Burger Price"}),Object(v.jsx)("div",{id:f.a.TSR,children:"AVAX 0.69"})]})]}),Object(v.jsx)("div",{id:f.a.ContainsBuy,children:Object(v.jsxs)("form",{onSubmit:function(e){e.preventDefault();var n=t.burger.value;t.mint(n)},children:[Object(v.jsx)("span",{children:Object(v.jsx)("input",{className:f.a.Button,type:"submit",value:"ORDER NOW",img:h})}),Object(v.jsx)("span",{children:Object(v.jsx)("input",{className:f.a.Qtt,type:"number",maxlenght:"2",min:"1",max:"20",size:"2",defaultValue:"1",ref:function(e){t.burger=e}})})]})})]})})}),Object(v.jsx)("div",{id:f.a.MyBurgersPage,children:Object(v.jsxs)("div",{id:f.a.MyBurgersBg,children:[Object(v.jsx)("div",{id:f.a.MyBurgerHeader,children:Object(v.jsx)("h1",{children:"My Burger Collection"})}),Object(v.jsx)("p",{}),Object(v.jsx)("div",{id:f.a.BurgerContent,children:Object(v.jsx)("div",{className:"row text-center",children:this.state.myBurgers.map((function(e,n){return Object(v.jsxs)("div",{className:"col-md-2 mb-1",children:[Object(v.jsxs)("div",{children:[" ",Object(v.jsx)("img",{style:{width:"100%",margin:"5px 0"},alt:e.toString(),src:t.state.gateway+e.toString()+".png"})]}),Object(v.jsx)("div",{children:e.toString()})]},n)}))})})]})})]})}}]),n}(a.Component),g=x;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(Object(v.jsx)(g,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[64,1,2]]]);
//# sourceMappingURL=main.3820986a.chunk.js.map