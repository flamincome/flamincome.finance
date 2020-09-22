let flamincome = {
    __init__: function () {
        window.web3 = new Web3(web3.currentProvider)
        let address = 'https://raw.githubusercontent.com/flamincome/logo/master/flamincome'
        fetch(address).then(resp => resp.text()).then(text => {
            flamincome.__logo__ = text
        }).catch(err => {
            console.log(err)
            setTimeout(flamincome.__init__, 1000)
        })
    },
    __abi__: {
        vault_baseline: [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_token",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_controller",
                        "type": "address"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    }
                ],
                "name": "allowance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "controller",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "decimals",
                "outputs": [
                    {
                        "internalType": "uint8",
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "subtractedValue",
                        "type": "uint256"
                    }
                ],
                "name": "decreaseAllowance",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "governance",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "addedValue",
                        "type": "uint256"
                    }
                ],
                "name": "increaseAllowance",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "max",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "min",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "symbol",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "token",
                "outputs": [
                    {
                        "internalType": "contract IERC20",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "totalSupply",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "recipient",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "transfer",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "recipient",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "balance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_min",
                        "type": "uint256"
                    }
                ],
                "name": "setMin",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_governance",
                        "type": "address"
                    }
                ],
                "name": "setGovernance",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_controller",
                        "type": "address"
                    }
                ],
                "name": "setController",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "available",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "earn",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "depositAll",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_amount",
                        "type": "uint256"
                    }
                ],
                "name": "deposit",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "withdrawAll",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "reserve",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "harvest",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_shares",
                        "type": "uint256"
                    }
                ],
                "name": "withdraw",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "priceE18",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ],
        erc20: [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    }
                ],
                "name": "allowance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "decimals",
                "outputs": [
                    {
                        "internalType": "uint8",
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "subtractedValue",
                        "type": "uint256"
                    }
                ],
                "name": "decreaseAllowance",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "addedValue",
                        "type": "uint256"
                    }
                ],
                "name": "increaseAllowance",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "symbol",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "totalSupply",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "recipient",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "transfer",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "recipient",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
    },
    __registry__: {
        "ERC20USDT": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        "ERC20TUSD": "0x0000000000085d4780B73119b644AE5ecd22b376",
        "ERC20USDC": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        "ERC20DAI": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        "ERC20wBTC": "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
        "ERC20renBTC": "0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D",
        "ERC20sBTC": "0xfE18be6b3Bd88A2D2A7f928d00292E7a9963CfC6",
        "ERC20wETH": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "VaultBaselinewBTC": "0x1a389c381a8242B7acFf0eB989173Cd5d0EFc3e3",
        "StrategyBaselineAmmoniarenBTC": "0x19dc0A94b461d081A800660b2B121485d62feaC3",
        "StrategyBaselineCarbonGaugeBTCInstance": "0x15C7C218c8010b4793F37798EC76f8671e24d885",
        "NormalizerMethaneTUSD": "0x886f6F287Bb2eA7DE03830a5FD339EDc107c559f",
        "VaultBaselineDAI": "0x163D457fA8247f1A9279B9fa8eF513de116e4327",
        "StrategyBaselineBenzeneYearnDAI": "0x1d3C58047826cD63AA70595090c7050664c232B5",
        "StrategyBaselineAmmoniasBTC": "0xF7870e91c12931A45F033802e3F7a4E386B6AF36",
        "VaultBaselineUSDC": "0x3f7E3d82bdDc28d3Eb04F0d0A51e9Fc82db581f0",
        "NormalizerMethanesBTC": "0x2Dd56dC238D1Fc2F9aAC3793A287F4E0aF1B08b4",
        "StrategyBaselineAmmoniaTUSD": "0x4E3013C0371C7fD9009faAef6dfcf848B6189148",
        "VaultBaselineTUSD": "0xa322AEa77769666453377CC697fbE4C6390b9942",
        "VaultBaselineaETH": "0xDcecEcf69735cC68495b2d24F5D4591a0666059f",
        "Strategy_YFI_DForceUSDTInstance": "0x58D4Ae01E66612F85E5FcdD540D95e8CEA523A12",
        "VaultBaselineyDAI": "0x79A2e8C1120d6B5fBfaBD3f7a39CF8473A635742",
        "StrategyBaselineAmmoniaOKB": "0x883FF202F429E277a0e988fBfc33bF816e143b35",
        "StrategyBaselineAmmoniawBTC": "0x2b68E5cC1D62e7682c0aE13a7ffcE2450B7846F5",
        "VaultBaselineyCRV": "0x5e7B4de4aC8e319fB2ec4bF9Fa98192346f8C99B",
        "VaultBaselineUSDT": "0x54bE9254ADf8D5c8867a91E44f44c27f0c88e88A",
        "VaultBaselineOKB": "0x272C8dF3E8068952606046c1389fc1e2320FCCfd",
        "StrategyBaselineBenzeneCurveBTCwBTC": "0xAC211c1f0Ed96aBA24B5585e9f9B65A823081A08",
        "StrategyBaselineAmmoniacrvBTC": "0xDbc806Cb39A51DB346A9951Ec93263c0E03A7390",
        "VaultBaselinerenBTC": "0xB0B3442b632175B0b7d9521291c51060722C4e8C",
        "StrategyBaselineAmmoniawETH": "0x73433c585c1dcc3d0c866cCF880F70E7B9735C4f",
        "NormalizerMethaneUSDT": "0x2205d2F559ef91580090011Aa4E0eF68Ec33da44",
        "StrategyBaselineCarbonGaugeInstance": "0x3125809AD69279cC0ed74fa3E972Ee84bee993AA",
        "NormalizerMethanewETH": "0xE179198Fd42f5De1a04Ffd9a36D6DC428cEB13f7",
        "StrategyBaselineBenzeneAaveETHInstance": "0x3Af1b537EC82Bf2e158C96F81831C0B1c9AB3dD4",
        "NormalizerMethaneDAI": "0x7245deD8459f59b0a680640535476c11b3cd0Ef6",
        "ControllerBaselineSingleton": "0xDc03b4900Eff97d997f4B828ae0a45cd48C3b22d",
        "NormalizerMethanerenBTC": "0x7757Ffe3aC09bC6430f6896F720E77CF80ec1F74",
        "Strategy_YFI_wETHInstrance": "0x978B3aEc60fba0387299710Aa33F222E2033a09e",
        "VaultBaselinewETH": "0x1E9DC5d843731D333544e63B2B2082D21EF78ed3",
        "StrategyBaselineBenzeneCurveUSDDAI": "0xE776472517E32CC1846D4489308927eE3a8bBb9b",
        "NormalizerMethanewBTC": "0xbB44B36e588445D7DA61A1e2e426664d03D40888",
        "StrategyBaselineAmmoniaDAI": "0x88802d906C28B18eDDe15568c623965b81D594e2",
        "StrategyBaselineAmmoniaUSDC": "0xD7A28808D3Af84255cAa914F5736563151A7E2D3",
        "VaultBaselinecrvBTC": "0x483A47247d5cBd420A9c5d2838Ec89776ba8B56B",
        "StrategyBaselineAmmoniayCRV": "0x44a06e775a80769DA1C2980Fa48328e4924C543C",
        "StrategyBaselineAmmoniayDAI": "0x6E3Cb53dd2335B358a6682411f878F2109Fc3c4F",
        "StrategyBaselineAmmoniaaETH": "0x8512E356ad141d9EBcbe17e3546c376e18882FaC",
        "NormalizerMethaneUSDC": "0x7F0AD0525cb8C17D3F5c06cEb0AEA20Fa0d2cA0A",
        "StrategyBaselineAmmoniaUSDT": "0xc08E8046EB3170D03D9BE252240Db5D7c824720b",
        "VaultBaselinesBTC": "0x681D3261CC6d2A18b59f8B53219b96F06BcEeB69"
    },
    __logo__: '',
    __accounts__: null,
    __speak__: function (item) {
        let root = document.createElement('div')
        let logo = document.createElement('pre')
        logo.style.textAlign = 'center'
        logo.style.backgroundColor = 'transparent'
        logo.style.border = '0px'
        root.style.justifyContent = 'center'
        root.style.alignItems = 'center'
        root.style.display = 'flex'
        root.style.backgroundColor = 'rgba(0,0,0,0.9)'
        root.style.border = '1px solid rgba(255,255,255,0.15)'
        logo.id = Math.random().toFixed(50).substr(2)
        let refresh = function () {
            if (flamincome.__logo__.length == 0) {
                $(`#${logo.id}`).text('loading ...')
                logo.innerText = 'loading ...'
                setTimeout(refresh, 1000)
            } else {
                $(`#${logo.id}`).text(flamincome.__logo__)
            }
        }
        refresh()
        root.appendChild(logo)
        if (item) {
            root.appendChild(item)
        }
        return root
    },
    __welcome__: function () {
        let welcome = document.createElement('div')
        let welcome_header = document.createElement('p')
        let welcome_logo = flamincome.__speak__(null)
        let welcome_footer = document.createElement('p')
        welcome_header.style.textAlign = 'center'
        welcome_footer.style.textAlign = 'center'
        welcome_header.innerHTML = 'welcome to <b>flamincome</b>'
        welcome_footer.innerHTML = 'docs is comming soon<br><b>USE AT YOUR OWN RISK!!!</b>'
        welcome.appendChild(welcome_header)
        welcome.appendChild(welcome_logo)
        welcome.appendChild(welcome_footer)
        return welcome
    },
    ConnectWallet: function () {
        window.ethereum.enable()
    }
}

$(document).ready(function () {
    flamincome.__init__()
    let $ptty = $('#terminal').Ptty({
        i18n: {
            welcome: flamincome.__welcome__().outerHTML,
        }
    });
    $ptty.register('command', {
        name: 'connect-wallet',
        method: function (cmd) {
            $ptty.get_terminal('.prompt').hide()
            window.ethereum.send('eth_requestAccounts').then(v => {
                $('.content .cmd_out:last').empty()
                $('<span>connected</span>').appendTo('.content .cmd_out:last')
                flamincome.__accounts__ = v.result
                $ptty.get_terminal('.prompt').show()
                $ptty.get_terminal('.prompt').find('.input').focus()
            }).catch(v => {
                $('.content .cmd_out:last').empty()
                $('<span>failed</span>').appendTo('.content .cmd_out:last')
                $ptty.get_terminal('.prompt').show()
                $ptty.get_terminal('.prompt').find('.input').focus()
            })
            return {
                out: '...',
            }
        },
        help: 'connect wallet'
    });
    $ptty.register('command', {
        name: 'list-registry',
        method: function (cmd) {
            let filter = ''
            if (cmd[1]) {
                filter = cmd[1]
            }
            let out = document.createElement('table')
            let head = document.createElement('tr')
            let name = document.createElement('th')
            let address = document.createElement('th')
            head.appendChild(name)
            head.appendChild(address)
            out.appendChild(head)
            name.innerText = 'contract name'
            address.innerText = 'contract address'
            for (var k in flamincome.__registry__) {
                if (!k.startsWith(filter)) {
                    continue
                }
                let row = document.createElement('tr')
                let name = document.createElement('th')
                let address = document.createElement('th')
                row.appendChild(name)
                row.appendChild(address)
                out.appendChild(row)
                name.innerText = k
                address.innerText = flamincome.__registry__[k]
            }
            return {
                out: out.outerHTML,
            }
        },
        options: [1],
        help: 'list registry'
    });
    $ptty.register('command', {
        name: 'get-balance-of-ftoken-by-symbol',
        method: function (cmd) {
            if (!flamincome.__accounts__) {
                return {
                    out: '<b>connect-wallet</b> first',
                }
            }
            if (!cmd[1]) {
                return {
                    out: 'Usage: get-balance-of-ftoken-by-symbol &lt;SYMBOL&gt; [ACCOUNT_ADDRESS]',
                }
            }
            if (!cmd[2]) {
                cmd[2] = flamincome.__accounts__[0]
            }
            let vault = flamincome.__registry__[`VaultBaseline${cmd[1]}`]
            if (!vault) {
                return {
                    out: `the vault of ${cmd[1]} not found in the registry`,
                }
            }
            $ptty.get_terminal('.prompt').hide()
            vault = new web3.eth.Contract(flamincome.__abi__.vault_baseline, vault)
            let balanceOf = vault.methods.balanceOf(flamincome.__accounts__[0]).call()
            let decimals = vault.methods.decimals().call()
            Promise.all([balanceOf, decimals]).then(vals => {
                let balanceOf = vals[0]
                let decimals = parseInt(vals[1])
                balanceOf = balanceOf.padStart(decimals, '0')
                let position = balanceOf.length - decimals
                var output = [balanceOf.slice(0, position), balanceOf.slice(position)].join('.');
                $('.content .cmd_out:last').empty()
                $(`<span>${output}</span>`).appendTo('.content .cmd_out:last')
                $ptty.get_terminal('.prompt').show()
                $ptty.get_terminal('.prompt').find('.input').focus()
            })
            return {
                out: '...',
            }
        },
        options: [1, 2],
        help: 'get flamincomed token balance'
    });
    $ptty.register('command', {
        name: 'get-balance-of-erc20-by-address',
        method: function (cmd) {
            if (!flamincome.__accounts__) {
                return {
                    out: '<b>connect-wallet</b> first',
                }
            }
            if (!cmd[1]) {
                return {
                    out: 'Usage: get-balance-of-erc20-by-address &lt;TOKEN_ADDRESS&gt; [ADDRESS]',
                }
            }
            if (!cmd[2]) {
                cmd[2] = flamincome.__accounts__[0]
            }
            $ptty.get_terminal('.prompt').hide()
            let vault = new web3.eth.Contract(flamincome.__abi__.vault_baseline, cmd[1])
            let balanceOf = vault.methods.balanceOf(cmd[2]).call()
            let decimals = vault.methods.decimals().call()
            Promise.all([balanceOf, decimals]).then(vals => {
                let balanceOf = vals[0]
                let decimals = parseInt(vals[1])
                balanceOf = balanceOf.padStart(decimals, '0')
                let position = balanceOf.length - decimals
                var output = [balanceOf.slice(0, position), balanceOf.slice(position)].join('.');
                $('.content .cmd_out:last').empty()
                $(`<span>${output}</span>`).appendTo('.content .cmd_out:last')
                $ptty.get_terminal('.prompt').show()
                $ptty.get_terminal('.prompt').find('.input').focus()
            })
            return {
                out: '...',
            }
        },
        options: [1, 2],
        help: 'get erc20 token balance'
    });
    $ptty.register('command', {
        name: 'deposit-token-to-vault',
        method: function (cmd) {
            if (!flamincome.__accounts__) {
                return {
                    out: '<b>connect-wallet</b> first',
                }
            }
            if (!cmd[1]) {
                return {
                    out: 'Usage: deposit-token-to-vault &lt;SYMBOL&gt; [AMOUNT]',
                }
            }
            let amount = cmd[2]
            let vault = flamincome.__registry__[`VaultBaseline${cmd[1]}`]
            if (!vault) {
                return {
                    out: `the vault of ${cmd[1]} not found in the registry`,
                }
            }
            let erc20 = flamincome.__registry__[`ERC20${cmd[1]}`]
            if (!erc20) {
                return {
                    out: `the erc20 token of ${cmd[1]} not found in the registry`,
                }
            }
            $ptty.get_terminal('.prompt').hide()
            vault = new web3.eth.Contract(flamincome.__abi__.vault_baseline, vault)
            erc20 = new web3.eth.Contract(flamincome.__abi__.erc20, erc20)
            let allowance = erc20.methods.allowance(flamincome.__accounts__[0], vault._address).call()
            let balanceOf = erc20.methods.balanceOf(flamincome.__accounts__[0]).call()
            let decimals = erc20.methods.decimals().call()
            Promise.all([balanceOf, decimals, allowance]).then(vals => {
                let num = vals[0]
                if (amount) {
                    let position = amount.indexOf('.')
                    num = amount.concat('0'.repeat(vals[1]))
                    if (position >= 0) {
                        let l = amount.slice(0, position)
                        let r = amount.slice(position + 1).padEnd(vals[1]).slice(0, vals[1])
                        num = l + r
                    }
                }
                num = new web3.utils.BN(num)
                let allowance = new web3.utils.BN(vals[2])

                if (allowance.cmp(num) == -1) {
                    $('.content .cmd_out:last').empty()
                    $(`<span>not enough allowance. try to type <b>set-allowance-for-vault-by-symbol-without-decimals ${cmd[1]}</b></span>`).appendTo('.content .cmd_out:last')
                    $ptty.get_terminal('.prompt').show()
                    $ptty.get_terminal('.prompt').find('.input').focus()
                    return
                }

                vault.methods.deposit(num).send({ from: flamincome.__accounts__[0] })
                    .on('transactionHash', function (hash) {
                        $('.content .cmd_out:last').empty()
                        $(`<span>${hash}</span>`).appendTo('.content .cmd_out:last')
                    })
                    .on('receipt', function (receipt) {
                        $('.content .cmd_out:last').empty()
                        // FIX
                        $(`<span>${JSON.stringify(receipt)}</span>`).appendTo('.content .cmd_out:last')
                        $ptty.get_terminal('.prompt').show()
                        $ptty.get_terminal('.prompt').find('.input').focus()
                        return
                    })
                    .on('error', function (err) {
                        window.x = err
                        $('.content .cmd_out:last').empty()
                        $(`<span>${err.message}</span>`).appendTo('.content .cmd_out:last')
                        $ptty.get_terminal('.prompt').show()
                        $ptty.get_terminal('.prompt').find('.input').focus()
                        return
                    });
            })
            return {
                out: '...',
            }
        },
        options: [1, 2],
        help: 'deposit erc20 token to mint ftoken'
    });
    $ptty.register('command', {
        name: 'set-allowance-for-vault-by-symbol-without-decimals',
        method: function (cmd) {
            if (!flamincome.__accounts__) {
                return {
                    out: '<b>connect-wallet</b> first',
                }
            }
            if (!cmd[1]) {
                return {
                    out: 'Usage: set-allowance-for-vault-by-symbol-without-decimals &lt;SYMBOL&gt; [AMOUNT]',
                }
            }
            if (!cmd[2]) {
                cmd[2] = new web3.utils.BN(2).pow(new web3.utils.BN(256)).subn(1)
            }
            let vault = flamincome.__registry__[`VaultBaseline${cmd[1]}`]
            if (!vault) {
                return {
                    out: `the vault of ${cmd[1]} not found in the registry`,
                }
            }
            let erc20 = flamincome.__registry__[`ERC20${cmd[1]}`]
            if (!erc20) {
                return {
                    out: `the erc20 token of ${cmd[1]} not found in the registry`,
                }
            }
            $ptty.get_terminal('.prompt').hide()
            vault = new web3.eth.Contract(flamincome.__abi__.vault_baseline, vault)
            erc20 = new web3.eth.Contract(flamincome.__abi__.erc20, erc20)
            let allowance = erc20.methods.allowance(flamincome.__accounts__[0], vault._address).call()
            Promise.all([allowance]).then(vals => {
                let num = new web3.utils.BN(vals[0])

                if (num > 0) {
                    $('.content .cmd_out:last').empty()
                    $(`<span>try to type <b>reset-allowance-for-vault-by-symbol ${cmd[1]}</b> first</span>`).appendTo('.content .cmd_out:last')
                    $ptty.get_terminal('.prompt').show()
                    $ptty.get_terminal('.prompt').find('.input').focus()
                    return
                }

                erc20.methods.approve(vault._address, cmd[2]).send({ from: flamincome.__accounts__[0] })
                    .on('transactionHash', function (hash) {
                        $('.content .cmd_out:last').empty()
                        $(`<span>${hash}</span>`).appendTo('.content .cmd_out:last')
                    })
                    .on('receipt', function (receipt) {
                        $('.content .cmd_out:last').empty()
                        // FIX
                        $(`<span>${JSON.stringify(receipt)}</span>`).appendTo('.content .cmd_out:last')
                        $ptty.get_terminal('.prompt').show()
                        $ptty.get_terminal('.prompt').find('.input').focus()
                        return
                    })
                    .on('error', function (err) {
                        window.x = err
                        $('.content .cmd_out:last').empty()
                        $(`<span>${err.message}</span>`).appendTo('.content .cmd_out:last')
                        $ptty.get_terminal('.prompt').show()
                        $ptty.get_terminal('.prompt').find('.input').focus()
                        return
                    });
            })
            return {
                out: '...',
            }
        },
        options: [1, 2],
        help: 'set erc20 token allowance'
    });
    $ptty.register('command', {
        name: 'reset-allowance-for-vault-by-symbol',
        method: function (cmd) {
            if (!flamincome.__accounts__) {
                return {
                    out: '<b>connect-wallet</b> first',
                }
            }
            if (!cmd[1]) {
                return {
                    out: 'Usage: reset-allowance-for-vault-by-symbol &lt;SYMBOL&gt;',
                }
            }
            let vault = flamincome.__registry__[`VaultBaseline${cmd[1]}`]
            if (!vault) {
                return {
                    out: `the vault of ${cmd[1]} not found in the registry`,
                }
            }
            let erc20 = flamincome.__registry__[`ERC20${cmd[1]}`]
            if (!erc20) {
                return {
                    out: `the erc20 token of ${cmd[1]} not found in the registry`,
                }
            }
            $ptty.get_terminal('.prompt').hide()
            vault = new web3.eth.Contract(flamincome.__abi__.vault_baseline, vault)
            erc20 = new web3.eth.Contract(flamincome.__abi__.erc20, erc20)
            let allowance = erc20.methods.allowance(flamincome.__accounts__[0], vault._address).call()
            Promise.all([allowance]).then(vals => {
                let num = new web3.utils.BN(vals[0])

                if (num == 0) {
                    $('.content .cmd_out:last').empty()
                    $(`<span>current allowance is already 0</span>`).appendTo('.content .cmd_out:last')
                    $ptty.get_terminal('.prompt').show()
                    $ptty.get_terminal('.prompt').find('.input').focus()
                    return
                }

                erc20.methods.approve(vault._address, 0).send({ from: flamincome.__accounts__[0] })
                    .on('transactionHash', function (hash) {
                        $('.content .cmd_out:last').empty()
                        $(`<span>${hash}</span>`).appendTo('.content .cmd_out:last')
                    })
                    .on('receipt', function (receipt) {
                        $('.content .cmd_out:last').empty()
                        // FIX
                        $(`<span>${JSON.stringify(receipt)}</span>`).appendTo('.content .cmd_out:last')
                        $ptty.get_terminal('.prompt').show()
                        $ptty.get_terminal('.prompt').find('.input').focus()
                        return
                    })
                    .on('error', function (err) {
                        window.x = err
                        $('.content .cmd_out:last').empty()
                        $(`<span>${err.message}</span>`).appendTo('.content .cmd_out:last')
                        $ptty.get_terminal('.prompt').show()
                        $ptty.get_terminal('.prompt').find('.input').focus()
                        return
                    });
            })
            return {
                out: '...',
            }
        },
        options: [1],
        help: 'reset erc20 token allowance to 0'
    });
});