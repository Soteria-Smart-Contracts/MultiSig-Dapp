let account;
const ABI = window.abi;
let netID;
const contractAddress = "0xf5c9e57e177B4F5CCfCb13b18e4154774E917401";
const ShibC = "0x1FDc495289B590e78d455cf7faa6cd804de5Cbc1";
let LoggedIn = false;

loginWithEth();

LoginText = document.getElementById('LoggedIn');
Signer = document.getElementById('Signer');
NewIDETC = document.getElementById('NewIDETC');

async function loginWithEth(){
    if(LoggedIn == false){
    if(window.ethereum){
        await ethereum.request({ method: 'eth_requestAccounts' });
        window.web3 = await new Web3(ethereum);
        await getID();
        if (netID != 61){
            console.log("The current Metamask/Web3 network is not Ethereum Classic, please connect to the Ethereum Classic."); 
            alert("The current Metamask/Web3 network is not Ropsten, please connect to the Ethereum Classic network.");
            return("Failed to connect")
        }
        accountarray = await web3.eth.getAccounts();
        contract = new window.web3.eth.Contract(ABI, contractAddress, window.web3);
        account = accountarray[0];
        CanSign = await IsSigner();
        console.log('Logged In')
        LoginText.innerHTML = "Connected with:" + '<br>' + account.substring(0, 7) + '...';
        if(CanSign == true){
            Signer.innerText = "This account is a signer"
        }else{
            Signer.innerText = "This account is not a signer"
        }
        LoggedIn = true;
    } else { 
        alert("No ETHER Wallet available")
    }
    }
}

async function getID(){
    let idhex = web3.eth._provider.chainId;
    netID = parseInt(idhex, 16);

    return(netID);
}

async function CreateETCProp(){
    let Amount = BigInt(web3.utils.toWei(document.getElementById('ETCAMM').value));
    let Receiver = document.getElementById('ETCrec').value;
    let Memo = document.getElementById('ETCmemo').value;
    console.log(Amount, Receiver, Memo);

    gas = await contract.methods.CreateETCProposal(Amount, Receiver, Memo).estimateGas({from: account, value: 0});
    ID = await contract.methods.CreateETCProposal(Amount, Receiver, Memo).send({from: account, value: 0, gas: gas});
    NewIDETC.innerText = "Your New proposal ID is" + ID;
}

async function CreateShibCProp(){
    let Amount = BigInt(web3.utils.toWei(document.getElementById('SHAMM').value));
    let Receiver = document.getElementById('SHrec').value;
    let Memo = document.getElementById('SHmemo').value;
    console.log(Amount, Receiver, Memo);

    gas = await contract.methods.CreateETCProposal(Amount, Receiver, Memo).estimateGas({from: account, value: 0});
    ID = await contract.methods.CreateETCProposal(Amount, Receiver, Memo).send({from: account, value: 0, gas: gas});
    NewIDETC.innerText = "Your New proposal ID is" + ID;
}

async function IsSigner(){
    let One = await contract.methods.SignerOne().call();
    let Two = await contract.methods.SignerTwo().call();
    let Three = await contract.methods.SignerThree().call();
    let Four = await contract.methods.SignerFour().call();

    if(account === One || account === Two || account === Three || account === Four){
        return(true);
    }
}

