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
            flamincome.__abi__.vault_baseline = text
        }).catch(err => {
            console.log(err)
            setTimeout(flamincome.__init__, 1000)
        })
        fetch('/assets/abi.erc20.json').then(resp => resp.text()).then(text => {
            flamincome.__abi__.erc20 = text
        }).catch(err => {
            console.log(err)
            setTimeout(flamincome.__init__, 1000)
        })
        fetch('/assets/registry.json').then(resp => resp.text()).then(text => {
            flamincome.__registry__ = text
        }).catch(err => {
            console.log(err)
            setTimeout(flamincome.__init__, 1000)
        })
    },
    __abi__: {},
    __registry__: null,
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