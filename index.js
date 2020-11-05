let flamincome = {
    __init__: function () {
        try {
            window.web3 = new Web3(web3.currentProvider)
        } catch{
        }
        fetch('https://cdn.jsdelivr.net/gh/flamincome/logo/flamincome').then(resp => resp.text()).then(text => {
            flamincome.__logo__ = text
        }).catch(err => {
            console.log(err)
            setTimeout(flamincome.__init__, 1000)
        })
        fetch('https://cdn.jsdelivr.net/gh/flamincome/registry/abi/vault.baseline.json').then(resp => resp.text()).then(text => {
            flamincome.__abi__.vault_baseline = JSON.parse(text)
        }).catch(err => {
            console.log(err)
            setTimeout(flamincome.__init__, 1000)
        })
        fetch('https://cdn.jsdelivr.net/gh/flamincome/registry/abi/erc20.json').then(resp => resp.text()).then(text => {
            flamincome.__abi__.erc20 = JSON.parse(text)
        }).catch(err => {
            console.log(err)
            setTimeout(flamincome.__init__, 1000)
        })
        fetch('https://cdn.jsdelivr.net/gh/flamincome/registry/abi/weth.json').then(resp => resp.text()).then(text => {
            flamincome.__abi__.weth = JSON.parse(text)
        }).catch(err => {
            console.log(err)
            setTimeout(flamincome.__init__, 1000)
        })
        fetch('https://cdn.jsdelivr.net/gh/flamincome/registry/abi/normalizer.methane.json').then(resp => resp.text()).then(text => {
            flamincome.__abi__.normalizer_methane = JSON.parse(text)
        }).catch(err => {
            console.log(err)
            setTimeout(flamincome.__init__, 1000)
        })
        fetch('https://cdn.jsdelivr.net/gh/flamincome/registry/address/erc20.json').then(resp => resp.text()).then(text => {
            flamincome.__registry__.erc20 = JSON.parse(text)
        }).catch(err => {
            console.log(err)
            setTimeout(flamincome.__init__, 1000)
        })
        fetch('https://cdn.jsdelivr.net/gh/flamincome/registry/address/vault.json').then(resp => resp.text()).then(text => {
            flamincome.__registry__.vault = JSON.parse(text)
        }).catch(err => {
            console.log(err)
            setTimeout(flamincome.__init__, 1000)
        })
        fetch('https://cdn.jsdelivr.net/gh/flamincome/registry/address/normalizer.json').then(resp => resp.text()).then(text => {
            flamincome.__registry__.normalizer = JSON.parse(text)
        }).catch(err => {
            console.log(err)
            setTimeout(flamincome.__init__, 1000)
        })
    },
    __ptty__: null,
    __abi__: {},
    __registry__: {},
    __logo__: '',
    __account__: null,
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
        logo.innerText = flamincome.__logo__
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
    __display__: function (data) {
        let out = document.createElement('div')
        out.innerHTML = data
        $('.content .cmd_out:last').empty()
        $(out.outerHTML).appendTo('.content .cmd_out:last')
    },
    __done__: function () {
        flamincome.__ptty__.get_terminal('.prompt').show()
        flamincome.__ptty__.echo()
        flamincome.__ptty__.get_terminal('.prompt').find('.input').focus()
    },
    __before__: function (f) {
        flamincome.__ptty__.get_terminal('.prompt').hide()
        if (flamincome.__registry__.erc20 == null) {
            flamincome.__display__('loading registry.erc20 ...')
            setTimeout(() => flamincome.__before__(f), 1000)
            return
        }
        if (flamincome.__registry__.vault == null) {
            flamincome.__display__('loading registry.vault ...')
            setTimeout(() => flamincome.__before__(f), 1000)
            return
        }
        if (flamincome.__registry__.normalizer == null) {
            flamincome.__display__('loading registry.normalizer ...')
            setTimeout(() => flamincome.__before__(f), 1000)
            return
        }
        if (flamincome.__abi__.erc20 == null) {
            flamincome.__display__('loading abi.erc20 ...')
            setTimeout(() => flamincome.__before__(f), 1000)
            return
        }
        if (flamincome.__abi__.vault_baseline == null) {
            flamincome.__display__('loading abi.vault_baseline ...')
            setTimeout(() => flamincome.__before__(f), 1000)
            return
        }
        if (flamincome.__abi__.weth == null) {
            flamincome.__display__('loading abi.weth ...')
            setTimeout(() => flamincome.__before__(f), 1000)
            return
        }
        try {
            f()
        } catch (err) {
            flamincome.__display__(err.message)
            flamincome.__done__()
        }
    },
    __welcome__: function () {
        let welcome = document.createElement('div')
        let welcome_header = document.createElement('p')
        let div = document.createElement('div')
        let flamingo = document.createElement('img')
        let text = document.createElement('p')
        text.innerText = 'e aí beleza    '
        text.style.height = flamingo.height
        text.style.display = 'inline'
        flamingo.src = 'https://flamingo.finance/favicon.ico'
        flamingo.style.width = '25px'
        div.appendChild(text)
        div.appendChild(flamingo)
        let welcome_logo = flamincome.__speak__(div)
        let welcome_footer = document.createElement('p')
        welcome_header.style.textAlign = 'center'
        welcome_footer.style.textAlign = 'center'
        welcome_header.innerHTML = 'welcome to <b>flamincome</b>'
        welcome_footer.innerHTML = 'terminal UI is in beta; <a href="https://docs.flamincome.finance">docs</a> is in beta; ensure risks before operations <br><b>USE AT YOUR OWN RISK!!!</b>'
        welcome.appendChild(welcome_header)
        welcome.appendChild(welcome_logo)
        welcome.appendChild(welcome_footer)
        return welcome
    },
    __register__: function (n, h, f) {
        flamincome.__ptty__.register('command', {
            name: n,
            method: function (cmd) {
                cmd.out = '...'
                return cmd
            },
            options: [0, 1, 2, 3, 4],
            help: h,
        });
        flamincome.__ptty__.register('callback', {
            name: n,
            method: function (cmd) {
                if (cmd.last != undefined || cmd.in != undefined) {
                    return
                }
                f(cmd)
            },
        });
    },
    __check_connection__: function () {
        if (!flamincome.__account__) {
            throw { message: 'please <b>connect-wallet</b> first' }
        }
    },
    __get_vault_by_symbol__: function (symbol) {
        let vault = flamincome.__registry__.vault[symbol]
        if (!vault) {
            throw { message: `canout find registry '${symbol}'` }
        }
        return new web3.eth.Contract(flamincome.__abi__.vault_baseline, vault)
    },
    __get_normalizer_by_symbol__: function (symbol) {
        let normalizer = flamincome.__registry__.normalizer[symbol]
        if (!normalizer) {
            throw { message: `canout find registry '${symbol}'` }
        }
        return new web3.eth.Contract(flamincome.__abi__.normalizer_methane, normalizer)
    },
    __get_erc20_by_symbol__: function (symbol) {
        let erc20 = flamincome.__registry__.erc20[symbol]
        if (!erc20) {
            throw { message: `canout find registry '${symbol}'` }
        }
        return new web3.eth.Contract(flamincome.__abi__.erc20, erc20)
    },
    __get_weth__: function () {
        let erc20 = flamincome.__registry__.erc20['WETH']
        if (!erc20) {
            throw { message: `canout find registry 'WETH'` }
        }
        return new web3.eth.Contract(flamincome.__abi__.weth, erc20)
    },
    __get_staking_by_symbol__: function (symbol) {
        // ADHOC
        let abi = [{ "inputs": [{ "internalType": "address", "name": "_rewardsDistribution", "type": "address" }, { "internalType": "address", "name": "_rewardsToken", "type": "address" }, { "internalType": "address", "name": "_stakingToken", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "reward", "type": "uint256" }], "name": "RewardAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "reward", "type": "uint256" }], "name": "RewardPaid", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Staked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdrawn", "type": "event" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "earned", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "exit", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "getReward", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getRewardForDuration", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "lastTimeRewardApplicable", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "lastUpdateTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "reward", "type": "uint256" }], "name": "notifyRewardAmount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "periodFinish", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "rewardPerToken", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "rewardPerTokenStored", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "rewardRate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "rewards", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "rewardsDistribution", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "rewardsDuration", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "rewardsToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "stake", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "stakeWithPermit", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "stakingToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "userRewardPerTokenPaid", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }]

        switch (symbol) {
            case 'USDT':
                return new web3.eth.Contract(abi, '0x5da42899d108FEF66689D46025ABB5E647B8477B')
            case 'WBTC':
                return new web3.eth.Contract(abi, '0xBc85c2b7999D4fBeA71C30Bc3ba1Cac2A0648d9E')
            case 'WETH':
                return new web3.eth.Contract(abi, '0xb9B1b40823e5B63d81794c6279AeBc3405B5534d')
            default:
                throw { message: `canout find registry '${symbol}'` }
        }
    },
    __get_lp_by_symbol__: function (symbol) {
        // ADHOC
        switch (symbol) {
            case 'USDT':
                return new web3.eth.Contract(flamincome.__abi__.erc20, '0xFF4eB4541Ccb20587c78c8639dd89Cbe2588a4d0')
            case 'WBTC':
                return new web3.eth.Contract(flamincome.__abi__.erc20, '0x7E2a722FC51b0F693F0c60a43e656787f27509Ab')
            case 'WETH':
                return new web3.eth.Contract(flamincome.__abi__.erc20, '0x8F86981955cd59E512150D0dd1425748E556a9d9')
            default:
                throw { message: `canout find registry '${symbol}'` }
        }
    },
    __transaction__: function (tx, next) {
        tx.on('transactionHash', function (hash) {
            flamincome.__display__(`waiting for confirming ...<br>${hash}`)
        }).on('receipt', function (receipt) {
            flamincome.__display__(JSON.stringify(receipt))
            if (next) {
                next()
            } else {
                flamincome.__done__()
            }
        }).on('error', function (err) {
            flamincome.__display__(err.message)
            flamincome.__done__()
        })
    }
}

$(document).ready(function () {
    flamincome.__init__()
    flamincome.__ptty__ = $('#terminal').Ptty({
        i18n: {
            welcome: flamincome.__welcome__().outerHTML,
        }
    });
    flamincome.__register__('flamincome:', 'flamincome can speak', cmd => {
        flamincome.__before__(() => {
            let args = flamincome.__ptty__.get_command_option('last').split(' ')
            args.shift()
            let p = document.createElement('p')
            p.innerText = args.join(' ')
            let out = flamincome.__speak__(p)
            flamincome.__display__(out.outerHTML)
            flamincome.__done__()
        })
    })
    flamincome.__register__('connect-wallet', 'connect wallet', cmd => {
        flamincome.__before__(() => {
            window.ethereum.send('eth_requestAccounts').then(v => {
                flamincome.__account__ = v.result[0]
                flamincome.__display__('connected')
                flamincome.__done__()
            }).catch(v => {
                flamincome.__display__(`${v.message} (maybe you need to install <a href="https://metamask.io/">metamask</a> for your browser and refresh this page)`)
                flamincome.__done__()
            })
        })
    })
    flamincome.__register__('list-registry-of-erc20s', 'list registry of supported erc20s', cmd => {
        flamincome.__before__(() => {
            let filter = ''
            let out = document.createElement('table')
            let head = document.createElement('tr')
            let name = document.createElement('th')
            let address = document.createElement('th')
            head.appendChild(name)
            head.appendChild(address)
            out.appendChild(head)
            name.innerText = 'contract name'
            address.innerText = 'contract address'
            if (cmd[1]) {
                filter = cmd[1]
            }
            for (var k in flamincome.__registry__.erc20) {
                if (!k.startsWith(filter)) {
                    continue
                }
                let row = document.createElement('tr')
                let name = document.createElement('th')
                let address = document.createElement('th')
                let a = document.createElement('a')
                a.href = `https://etherscan.io/token/${flamincome.__registry__.erc20[k]}`
                a.innerText = flamincome.__registry__.erc20[k]
                row.appendChild(name)
                row.appendChild(address)
                out.appendChild(row)
                name.innerText = k
                address.appendChild(a)
            }
            flamincome.__display__(out.outerHTML)
            flamincome.__done__()
        })
    })
    flamincome.__register__('list-registry-of-vaults', 'list registry of vaults', cmd => {
        flamincome.__before__(() => {
            let filter = ''
            let out = document.createElement('table')
            let head = document.createElement('tr')
            let name = document.createElement('th')
            let address = document.createElement('th')
            head.appendChild(name)
            head.appendChild(address)
            out.appendChild(head)
            name.innerText = 'contract name'
            address.innerText = 'contract address'
            if (cmd[1]) {
                filter = cmd[1]
            }
            for (var k in flamincome.__registry__.vault) {
                if (!k.startsWith(filter)) {
                    continue
                }
                let row = document.createElement('tr')
                let name = document.createElement('th')
                let address = document.createElement('th')
                let a = document.createElement('a')
                a.href = `https://etherscan.io/token/${flamincome.__registry__.vault[k]}`
                a.innerText = flamincome.__registry__.vault[k]
                row.appendChild(name)
                row.appendChild(address)
                out.appendChild(row)
                name.innerText = `f${k} (vault of ${k})`
                address.appendChild(a)
            }
            flamincome.__display__(out.outerHTML)
            flamincome.__done__()
        })
    })
    flamincome.__register__('list-registry-of-normalizers', 'list registry of normalizers', cmd => {
        flamincome.__before__(() => {
            let filter = ''
            let out = document.createElement('table')
            let head = document.createElement('tr')
            let name = document.createElement('th')
            let address = document.createElement('th')
            head.appendChild(name)
            head.appendChild(address)
            out.appendChild(head)
            name.innerText = 'contract name'
            address.innerText = 'contract address'
            if (cmd[1]) {
                filter = cmd[1]
            }
            for (var k in flamincome.__registry__.normalizer) {
                if (!k.startsWith(filter)) {
                    continue
                }
                let row = document.createElement('tr')
                let name = document.createElement('th')
                let address = document.createElement('th')
                let a = document.createElement('a')
                a.href = `https://etherscan.io/token/${flamincome.__registry__.normalizer[k]}`
                a.innerText = flamincome.__registry__.normalizer[k]
                row.appendChild(name)
                row.appendChild(address)
                out.appendChild(row)
                name.innerText = `n${k} (normalizer of ${k})`
                address.appendChild(a)
            }
            flamincome.__display__(out.outerHTML)
            flamincome.__done__()
        })
    })
    flamincome.__register__('get-balance-of-ftoken-by-symbol', 'get flamincomed token balance', cmd => {
        flamincome.__before__(() => {
            flamincome.__check_connection__()
            let vault = flamincome.__get_vault_by_symbol__(cmd[1])
            let account = cmd[2]
            if (!account) {
                account = flamincome.__account__
            }
            let balanceOf = vault.methods.balanceOf(account).call()
            let decimals = vault.methods.decimals().call()
            Promise.all([balanceOf, decimals]).then(vals => {
                let balanceOf = vals[0]
                let decimals = parseInt(vals[1])
                balanceOf = balanceOf.padStart(decimals, '0')
                let position = balanceOf.length - decimals
                var output = [balanceOf.slice(0, position), balanceOf.slice(position)].join('.');
                flamincome.__display__(output)
                flamincome.__done__()
            }).catch(err => {
                flamincome.__display__(err.message)
                flamincome.__done__()
            })
        })
    })
    flamincome.__register__('get-value-of-ftoken-by-symbol', 'get underlying value of an account', cmd => {
        flamincome.__before__(() => {
            flamincome.__check_connection__()
            let symbol = cmd[1]
            let vault = flamincome.__get_vault_by_symbol__(symbol)
            let account = cmd[2]
            if (!account) {
                account = flamincome.__account__
            }
            let balanceOf = vault.methods.balanceOf(account).call()
            let decimals = vault.methods.decimals().call()
            let priceE18 = vault.methods.priceE18().call()
            Promise.all([balanceOf, decimals, priceE18]).then(vals => {
                let balanceOf = new web3.utils.BN(vals[0])
                let priceE18 = new web3.utils.BN(vals[2])
                balanceOf = balanceOf.mul(priceE18).div(new web3.utils.BN('1000000000000000000'))
                balanceOf = balanceOf.toString()
                let decimals = parseInt(vals[1])
                balanceOf = balanceOf.padStart(decimals, '0')
                let position = balanceOf.length - decimals
                var output = [balanceOf.slice(0, position), balanceOf.slice(position)].join('.');
                flamincome.__display__(`${output} ${symbol}`)
                flamincome.__done__()
            }).catch(err => {
                flamincome.__display__(err.message)
                flamincome.__done__()
            })
        })
    })
    flamincome.__register__('get-apy-of-ftoken-by-symbol', 'get apy of a vault', cmd => {
        flamincome.__before__(() => {
            flamincome.__check_connection__()
            let symbol = cmd[1]
            let db = cmd[2]
            if (!db) {
                db = 10000
            }
            let vault = flamincome.__get_vault_by_symbol__(symbol)
            web3.eth.getBlockNumber().then(num => {
                let nl = num - db
                let nr = num
                let bl = web3.eth.getBlock(nl)
                let br = web3.eth.getBlock(nr)
                Promise.all([bl, br]).then(([bl, br]) => {
                    let duration = br.timestamp - bl.timestamp
                    let pl = vault.methods.priceE18().call({}, nl)
                    let pr = vault.methods.priceE18().call({}, nr)
                    Promise.all([pl, pr]).then(([pl, pr]) => {
                        pl = parseFloat(pl)
                        pr = parseFloat(pr)
                        let apy = (((pr / pl) ** (31557600 / duration) - 1) * 100).toFixed(2)
                        flamincome.__display__(`${apy} %`)
                        flamincome.__done__()
                    })
                })
            })
        })
    })
    flamincome.__register__('get-totalvalue-of-ftoken-by-symbol', 'get total value of flamincomed token', cmd => {
        flamincome.__before__(() => {
            flamincome.__check_connection__()
            let symbol = cmd[1]
            let vault = flamincome.__get_vault_by_symbol__(symbol)
            let balances = vault.methods.balance().call()
            let decimals = vault.methods.decimals().call()
            Promise.all([balances, decimals]).then(vals => {
                let balances = vals[0]
                let decimals = parseInt(vals[1])
                balances = balances.padStart(decimals, '0')
                let position = balances.length - decimals
                var output = [balances.slice(0, position), balances.slice(position)].join('.');
                flamincome.__display__(`${output} ${symbol}`)
                flamincome.__done__()
            }).catch(err => {
                flamincome.__display__(err.message)
                flamincome.__done__()
            })
        })
    })
    flamincome.__register__('get-price-of-ftoken-by-symbol', 'get price per share of flamincomed token', cmd => {
        flamincome.__before__(() => {
            flamincome.__check_connection__()
            let symbol = cmd[1]
            let vault = flamincome.__get_vault_by_symbol__(symbol)
            let priceE18 = vault.methods.priceE18().call()
            Promise.all([priceE18]).then(vals => {
                let priceE18 = vals[0].padStart(18, '0')
                let position = priceE18.length - 18
                var output = [priceE18.slice(0, position), priceE18.slice(position)].join('.');
                flamincome.__display__(`${output} ${symbol}`)
                flamincome.__done__()
            }).catch(err => {
                flamincome.__display__(err.message)
                flamincome.__done__()
            })
        })
    })
    flamincome.__register__('get-balance-of-erc20-by-symbol', 'get erc20 balance', cmd => {
        flamincome.__before__(() => {
            flamincome.__check_connection__()
            let erc20 = flamincome.__get_erc20_by_symbol__(cmd[1])
            let account = cmd[2]
            if (!account) {
                account = flamincome.__account__
            }
            let balanceOf = erc20.methods.balanceOf(account).call()
            let decimals = erc20.methods.decimals().call()
            Promise.all([balanceOf, decimals]).then(vals => {
                let balanceOf = vals[0]
                let decimals = parseInt(vals[1])
                balanceOf = balanceOf.padStart(decimals, '0')
                let position = balanceOf.length - decimals
                var output = [balanceOf.slice(0, position), balanceOf.slice(position)].join('.');
                flamincome.__display__(output)
                flamincome.__done__()
            }).catch(err => {
                flamincome.__display__(err.message)
                flamincome.__done__()
            })
        })
    })
    flamincome.__register__('get-balance-of-erc20-by-address', 'get erc20 balance', cmd => {
        flamincome.__before__(() => {
            flamincome.__check_connection__()
            let erc20 = new web3.eth.Contract(flamincome.__abi__.erc20, cmd[1])
            let account = cmd[2]
            if (!account) {
                account = flamincome.__account__
            }
            let balanceOf = erc20.methods.balanceOf(account).call()
            let decimals = erc20.methods.decimals().call()
            Promise.all([balanceOf, decimals]).then(vals => {
                let balanceOf = vals[0]
                let decimals = parseInt(vals[1])
                balanceOf = balanceOf.padStart(decimals, '0')
                let position = balanceOf.length - decimals
                var output = [balanceOf.slice(0, position), balanceOf.slice(position)].join('.');
                flamincome.__display__(output)
                flamincome.__done__()
            }).catch(err => {
                flamincome.__display__(err.message)
                flamincome.__done__()
            })
        })
    })
    flamincome.__register__('deposit-token-to-vault', 'deposit token to mint ftoken', cmd => {
        flamincome.__before__(() => {
            flamincome.__check_connection__()
            let vault = flamincome.__get_vault_by_symbol__(cmd[1])
            let erc20 = flamincome.__get_erc20_by_symbol__(cmd[1])
            let amount = cmd[2]
            let allowance = erc20.methods.allowance(flamincome.__account__, vault._address).call()
            let balanceOf = erc20.methods.balanceOf(flamincome.__account__).call()
            let decimals = erc20.methods.decimals().call()
            Promise.all([balanceOf, decimals, allowance]).then(vals => {
                let num = vals[0]
                if (amount) {
                    let position = amount.indexOf('.')
                    num = amount.concat('0'.repeat(vals[1]))
                    if (position >= 0) {
                        let l = amount.slice(0, position)
                        let r = amount.slice(position + 1).padEnd(vals[1], '0').slice(0, vals[1])
                        num = l + r
                    }
                }
                num = new web3.utils.BN(num)
                let allowance = new web3.utils.BN(vals[2])

                if (allowance.cmp(num) == -1) {
                    if (allowance > 0) {
                        flamincome.__transaction__(
                            erc20.methods.approve(vault._address, 0).send({ from: flamincome.__account__ }),
                            function () {
                                flamincome.__transaction__(
                                    erc20.methods.approve(vault._address, new web3.utils.BN(2).pow(new web3.utils.BN(256)).subn(1)).send({ from: flamincome.__account__ }),
                                    function () {
                                        flamincome.__transaction__(
                                            vault.methods.deposit(num).send({ from: flamincome.__account__ })
                                        )
                                    }
                                )
                            }
                        )
                        return
                    }
                    flamincome.__transaction__(
                        erc20.methods.approve(vault._address, new web3.utils.BN(2).pow(new web3.utils.BN(256)).subn(1)).send({ from: flamincome.__account__ }),
                        function () {
                            flamincome.__transaction__(
                                vault.methods.deposit(num).send({ from: flamincome.__account__ })
                            )
                        }
                    )
                    return
                }
                flamincome.__transaction__(
                    vault.methods.deposit(num).send({ from: flamincome.__account__ })
                )
            }).catch(err => {
                flamincome.__display__(err.message)
                flamincome.__done__()
            })
        })
    })
    flamincome.__register__('withdraw-token-from-vault', 'burn ftoken to withdraw token', cmd => {
        flamincome.__before__(() => {
            flamincome.__check_connection__()
            let vault = flamincome.__get_vault_by_symbol__(cmd[1])
            let amount = cmd[2]
            let balanceOf = vault.methods.balanceOf(flamincome.__account__).call()
            let decimals = vault.methods.decimals().call()
            Promise.all([balanceOf, decimals]).then(vals => {
                let num = vals[0]
                if (amount) {
                    let position = amount.indexOf('.')
                    num = amount.concat('0'.repeat(vals[1]))
                    if (position >= 0) {
                        let l = amount.slice(0, position)
                        let r = amount.slice(position + 1).padEnd(vals[1], '0').slice(0, vals[1])
                        num = l + r
                    }
                }
                num = new web3.utils.BN(num)

                flamincome.__transaction__(
                    vault.methods.withdraw(num).send({ from: flamincome.__account__ })
                )
            }).catch(err => {
                flamincome.__display__(err.message)
                flamincome.__done__()
            })
        })
    })
    flamincome.__register__('wrap-eth-to-weth', 'wrap ETH to WETH', cmd => {
        flamincome.__before__(() => {
            flamincome.__check_connection__()
            let weth = flamincome.__get_weth__()
            let amount = cmd[1]
            if (!amount) {
                throw { message: 'please specify the amount' }
            }
            let balance = web3.eth.getBalance(flamincome.__account__)
            Promise.all([balance]).then(vals => {
                let position = amount.indexOf('.')
                let num = amount.concat('0'.repeat(18))
                if (position >= 0) {
                    let l = amount.slice(0, position)
                    let r = amount.slice(position + 1).padEnd(18, '0').slice(0, 18)
                    num = l + r
                }
                num = new web3.utils.BN(num)

                flamincome.__transaction__(
                    weth.methods.deposit().send({ from: flamincome.__account__, value: num })
                )
            }).catch(err => {
                flamincome.__display__(err.message)
                flamincome.__done__()
            })
        })
    })
    flamincome.__register__('unwrap-weth-to-eth', 'unwrap WETH to ETH', cmd => {
        flamincome.__before__(() => {
            flamincome.__check_connection__()
            let weth = flamincome.__get_weth__()
            let amount = cmd[1]
            let balanceOf = weth.methods.balanceOf(flamincome.__account__).call()
            Promise.all([balanceOf]).then(vals => {
                let num = vals[0]
                if (amount) {
                    let position = amount.indexOf('.')
                    num = amount.concat('0'.repeat(vals[1]))
                    if (position >= 0) {
                        let l = amount.slice(0, position)
                        let r = amount.slice(position + 1).padEnd(vals[1], '0').slice(0, vals[1])
                        num = l + r
                    }
                }
                num = new web3.utils.BN(num)

                flamincome.__transaction__(
                    weth.methods.withdraw(num).send({ from: flamincome.__account__ })
                )
            }).catch(err => {
                flamincome.__display__(err.message)
                flamincome.__done__()
            })
        })
    })
    flamincome.__register__('deposit-ftoken-to-normalizer', 'deposit ftoken to mint ntoken', cmd => {
        flamincome.__before__(() => {
            flamincome.__check_connection__()
            let normalizer = flamincome.__get_normalizer_by_symbol__(cmd[1])
            let vault = flamincome.__get_vault_by_symbol__(cmd[1])
            let deposit = cmd[2]
            let mint = cmd[3]
            if (!deposit) {
                throw { message: 'please specify the deposit amount and mint amount' }
            }
            if (!mint) {
                throw { message: 'please specify the deposit amount and mint amount' }
            }
            let decimals = normalizer.methods.decimals().call()
            let allowance = vault.methods.allowance(flamincome.__account__, normalizer._address).call()
            Promise.all([allowance, decimals]).then(([allowance, decimals]) => {
                let position = deposit.indexOf('.')
                let d = deposit.concat('0'.repeat(decimals))
                if (position >= 0) {
                    let l = deposit.slice(0, position)
                    let r = deposit.slice(position + 1).padEnd(decimals, '0').slice(0, decimals)
                    d = l + r
                }
                position = mint.indexOf('.')
                let m = mint.concat('0'.repeat(decimals))
                if (position >= 0) {
                    let l = mint.slice(0, position)
                    let r = mint.slice(position + 1).padEnd(decimals, '0').slice(0, decimals)
                    m = l + r
                }
                d = new web3.utils.BN(d)
                allowance = new web3.utils.BN(allowance)
                if (allowance.cmp(d) == -1) {
                    if (allowance > 0) {
                        flamincome.__transaction__(
                            vault.methods.approve(normalizer._address, 0).send({ from: flamincome.__account__ }),
                            function () {
                                flamincome.__transaction__(
                                    vault.methods.approve(normalizer._address, new web3.utils.BN(2).pow(new web3.utils.BN(256)).subn(1)).send({ from: flamincome.__account__ }),
                                    function () {
                                        flamincome.__transaction__(
                                            normalizer.methods.RealizeFToken(d, m).send({ from: flamincome.__account__ })
                                        )
                                    }
                                )
                            }
                        )
                        return
                    }
                    flamincome.__transaction__(
                        vault.methods.approve(normalizer._address, new web3.utils.BN(2).pow(new web3.utils.BN(256)).subn(1)).send({ from: flamincome.__account__ }),
                        function () {
                            flamincome.__transaction__(
                                normalizer.methods.RealizeFToken(d, m).send({ from: flamincome.__account__ })
                            )
                        }
                    )
                    return
                }
                flamincome.__transaction__(
                    normalizer.methods.RealizeFToken(d, m).send({ from: flamincome.__account__ })
                )
            })
        })
    })
    flamincome.__register__('withdrawall-ftoken-from-normalizer', 'burn ntoken to withdraw ftoken', cmd => {
        flamincome.__before__(() => {
            flamincome.__check_connection__()
            let normalizer = flamincome.__get_normalizer_by_symbol__(cmd[1])
            let f = normalizer.methods.f(flamincome.__account__).call()
            let n = normalizer.methods.n(flamincome.__account__).call()
            let balanceOf = normalizer.methods.balanceOf(flamincome.__account__).call()
            Promise.all([f, n, balanceOf]).then(vals => {
                let f = new web3.utils.BN(vals[0])
                let n = new web3.utils.BN(vals[1])
                let balanceOf = new web3.utils.BN(vals[2])
                if (balanceOf.cmp(n) == -1) {
                    flamincome.__display__('not enough balance')
                    flamincome.__done__()
                    return
                }
                flamincome.__transaction__(
                    normalizer.methods.UnrealizeFToken(f, n).send({ from: flamincome.__account__ })
                )
            })
        })
    })
    flamincome.__register__('stake-lptoken', 'stake uniswap lptoken', cmd => {
        flamincome.__before__(() => {
            flamincome.__check_connection__()
            let staking = flamincome.__get_staking_by_symbol__(cmd[1])
            let lp = flamincome.__get_lp_by_symbol__(cmd[1])
            let amount = cmd[2]
            let allowance = lp.methods.allowance(flamincome.__account__, staking._address).call()
            let balanceOf = lp.methods.balanceOf(flamincome.__account__).call()
            let decimals = lp.methods.decimals().call()
            Promise.all([balanceOf, decimals, allowance]).then(vals => {
                let num = vals[0]
                if (amount) {
                    let position = amount.indexOf('.')
                    num = amount.concat('0'.repeat(vals[1]))
                    if (position >= 0) {
                        let l = amount.slice(0, position)
                        let r = amount.slice(position + 1).padEnd(vals[1], '0').slice(0, vals[1])
                        num = l + r
                    }
                }
                num = new web3.utils.BN(num)
                let allowance = new web3.utils.BN(vals[2])

                if (allowance.cmp(num) == -1) {
                    if (allowance > 0) {
                        flamincome.__transaction__(
                            lp.methods.approve(staking._address, 0).send({ from: flamincome.__account__ }),
                            function () {
                                flamincome.__transaction__(
                                    lp.methods.approve(staking._address, new web3.utils.BN(2).pow(new web3.utils.BN(256)).subn(1)).send({ from: flamincome.__account__ }),
                                    function () {
                                        flamincome.__transaction__(
                                            staking.methods.stake(num).send({ from: flamincome.__account__ })
                                        )
                                    }
                                )
                            }
                        )
                        return
                    }
                    flamincome.__transaction__(
                        lp.methods.approve(staking._address, new web3.utils.BN(2).pow(new web3.utils.BN(256)).subn(1)).send({ from: flamincome.__account__ }),
                        function () {
                            flamincome.__transaction__(
                                staking.methods.stake(num).send({ from: flamincome.__account__ })
                            )
                        }
                    )
                    return
                }
                flamincome.__transaction__(
                    staking.methods.stake(num).send({ from: flamincome.__account__ })
                )
            }).catch(err => {
                flamincome.__display__(err.message)
                flamincome.__done__()
            })
        })
    })
    flamincome.__register__('unstake-lptoken', 'unstake uniswap lptoken', cmd => {
        flamincome.__before__(() => {
            flamincome.__check_connection__()
            let staking = flamincome.__get_staking_by_symbol__(cmd[1])
            let amount = cmd[2]
            let balanceOf = staking.methods.balanceOf(flamincome.__account__).call()
            Promise.all([balanceOf]).then(vals => {
                let num = vals[0]
                if (amount) {
                    let position = amount.indexOf('.')
                    num = amount.concat('0'.repeat(18))
                    if (position >= 0) {
                        let l = amount.slice(0, position)
                        let r = amount.slice(position + 1).padEnd(18, '0').slice(0, 18)
                        num = l + r
                    }
                }
                num = new web3.utils.BN(num)

                flamincome.__transaction__(
                    staking.methods.withdraw(num).send({ from: flamincome.__account__ })
                )
            }).catch(err => {
                flamincome.__display__(err.message)
                flamincome.__done__()
            })
        })
    })
    flamincome.__register__('claim-reward-of-staking', 'claim staking reward', cmd => {
        flamincome.__before__(() => {
            flamincome.__check_connection__()
            let staking = flamincome.__get_staking_by_symbol__(cmd[1])
            flamincome.__transaction__(
                staking.methods.getReward().send({ from: flamincome.__account__ })
            )
        })
    })
    flamincome.__register__('get-amount-of-staking', 'get staking amount', cmd => {
        flamincome.__before__(() => {
            flamincome.__check_connection__()
            let staking = flamincome.__get_staking_by_symbol__(cmd[1])
            let balanceOf = staking.methods.balanceOf(flamincome.__account__).call()
            Promise.all([balanceOf]).then(vals => {
                let balanceOf = vals[0].padStart(18, '0')
                let position = balanceOf.length - 18
                var output = [balanceOf.slice(0, position), balanceOf.slice(position)].join('.');
                flamincome.__display__(`${output} UNI-V2`)
                flamincome.__done__()
            }).catch(err => {
                flamincome.__display__(err.message)
                flamincome.__done__()
            })
        })
    })
    flamincome.__register__('get-earning-of-staking', 'get staking earning', cmd => {
        flamincome.__before__(() => {
            flamincome.__check_connection__()
            let staking = flamincome.__get_staking_by_symbol__(cmd[1])
            let earned = staking.methods.earned(flamincome.__account__).call()
            Promise.all([earned]).then(vals => {
                let earned = vals[0].padStart(18, '0')
                let position = earned.length - 18
                var output = [earned.slice(0, position), earned.slice(position)].join('.');
                flamincome.__display__(`${output} FLAG`)
                flamincome.__done__()
            }).catch(err => {
                flamincome.__display__(err.message)
                flamincome.__done__()
            })
        })
    })
    flamincome.__register__('withdraw-ftoken-from-normalizer-as-raw', 'burn ntoken to withdraw ftoken', cmd => {
        flamincome.__before__(() => {
            flamincome.__check_connection__()
            let normalizer = flamincome.__get_normalizer_by_symbol__(cmd[1])
            let w = cmd[2]
            let d = cmd[3]
            flamincome.__transaction__(
                normalizer.methods.UnrealizeFToken(w, d).send({ from: flamincome.__account__ })
            )
        })
    })
});
