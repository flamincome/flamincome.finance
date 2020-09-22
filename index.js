let flamincome = {
    __init__: function () {
        try {
            window.web3 = new Web3(web3.currentProvider)
        } catch{
        }
        fetch('/assets/logo').then(resp => resp.text()).then(text => {
            flamincome.__logo__ = text
        }).catch(err => {
            console.log(err)
            setTimeout(flamincome.__init__, 1000)
        })
        fetch('/assets/abi.vault_baseline.json').then(resp => resp.text()).then(text => {
            flamincome.__abi__.vault_baseline = JSON.parse(text)
        }).catch(err => {
            console.log(err)
            setTimeout(flamincome.__init__, 1000)
        })
        fetch('/assets/abi.erc20.json').then(resp => resp.text()).then(text => {
            flamincome.__abi__.erc20 = JSON.parse(text)
        }).catch(err => {
            console.log(err)
            setTimeout(flamincome.__init__, 1000)
        })
        fetch('/assets/registry.json').then(resp => resp.text()).then(text => {
            flamincome.__registry__ = JSON.parse(text)
        }).catch(err => {
            console.log(err)
            setTimeout(flamincome.__init__, 1000)
        })
    },
    __ptty__: null,
    __abi__: {},
    __registry__: null,
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
        flamincome.__ptty__.get_terminal('.prompt').find('.input').focus()
        let terminal = document.getElementById('terminal')
        terminal.scrollTop = terminal.scrollHeight
    },
    __before__: function (f) {
        flamincome.__ptty__.get_terminal('.prompt').hide()
        if (flamincome.__registry__ == null) {
            flamincome.__display__('loading registry ...')
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
        let welcome_logo = flamincome.__speak__(null)
        let welcome_footer = document.createElement('p')
        welcome_header.style.textAlign = 'center'
        welcome_footer.style.textAlign = 'center'
        welcome_header.innerHTML = 'welcome to <b>flamincome</b>'
        welcome_footer.innerHTML = 'docs is comming soon (console UI is current under developing)<br><b>USE AT YOUR OWN RISK!!!</b>'
        welcome.appendChild(welcome_header)
        welcome.appendChild(welcome_logo)
        welcome.appendChild(welcome_footer)
        return welcome
    },
    __register__: function (n, h, f) {
        flamincome.__ptty__.register('command', {
            name: n,
            method: function (cmd) {
                return { out: '...' }
            },
            options: [0, 1, 2, 3, 4],
            help: h,
        });
        flamincome.__ptty__.register('callback', {
            name: n,
            method: f,
        });
    },
    __check_connection__: function () {
        if (!flamincome.__account__) {
            throw { message: 'please <b>connect-wallet</b> first' }
        }
    },
    __get_vault_by_symbol__: function (symbol) {
        let vault = flamincome.__registry__[`VaultBaseline${symbol}`]
        if (!vault) {
            throw { message: `cannout find registry '${symbol}'` }
        }
        return new web3.eth.Contract(flamincome.__abi__.vault_baseline, vault)
    },
    __get_erc20_by_symbol__: function (symbol) {
        let erc20 = flamincome.__registry__[`ERC20${symbol}`]
        if (!erc20) {
            throw { message: `cannout find registry '${symbol}'` }
        }
        return new web3.eth.Contract(flamincome.__abi__.erc20, erc20)
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
    flamincome.__register__('connect-wallet', 'connect wallet', cmd => {
        flamincome.__before__(() => {
            window.ethereum.send('eth_requestAccounts').then(v => {
                flamincome.__account__ = v.result[0]
                flamincome.__display__('connected')
                flamincome.__done__()
            }).catch(v => {
                flamincome.__display__(v.message)
                flamincome.__done__()
            })
        })
    })
    flamincome.__register__('list-registry', 'list registry', cmd => {
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
    flamincome.__register__('get-value-of-ftoken-by-symbol', 'get total value of flamincomed token', cmd => {
        flamincome.__before__(() => {
            flamincome.__check_connection__()
            let vault = flamincome.__get_vault_by_symbol__(cmd[1])
            let balances = vault.methods.balance().call()
            let decimals = vault.methods.decimals().call()
            Promise.all([balances, decimals]).then(vals => {
                let balances = vals[0]
                let decimals = parseInt(vals[1])
                balances = balances.padStart(decimals, '0')
                let position = balances.length - decimals
                var output = [balances.slice(0, position), balances.slice(position)].join('.');
                flamincome.__display__(output)
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
                        let r = amount.slice(position + 1).padEnd(vals[1]).slice(0, vals[1])
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
                    } else {
                        flamincome.__transaction__(
                            erc20.methods.approve(vault._address, new web3.utils.BN(2).pow(new web3.utils.BN(256)).subn(1)).send({ from: flamincome.__account__ }),
                            function () {
                                flamincome.__transaction__(
                                    vault.methods.deposit(num).send({ from: flamincome.__account__ })
                                )
                            }
                        )
                    }
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
            flamincome.__display__('coming soon ...')
            flamincome.__done__()
        })
    })
});