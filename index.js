let flamincome = {
    __init__: function () {
        let address = 'https://raw.githubusercontent.com/flamincome/logo/master/flamincome'
        fetch(address).then(resp => resp.text()).then(text => {
            flamincome.__logo__ = text
        }).catch(err => {
            console.log(err)
            setTimeout(flamincome.__init__, 1000)
        })
    },
    __logo__: '',
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
}

$(document).ready(function () {
    flamincome.__init__()
    let $ptty = $('#terminal').Ptty({
        i18n: {
            welcome: flamincome.__welcome__().outerHTML,
        }
    });
    $ptty.register('command', {
        name: 'get-github',
        method: function (cmd) {
            if (cmd[1]) {
                return {
                    out: `<a href="https://github.com/flamincome/${cmd[1]}">${cmd[1]}</a>`,
                };
            }
            return {
                out: '<a href="https://github.com/flamincome">Flamincome Github</a>',
            };
        },
        options: [1],
        help: 'flamincome github page'
    });
    $ptty.register('command', {
        name: 'deposit-token',
        method: function (cmd) {
            return {
                out: 'coming soon ...',
            };
        },
        help: 'deposit'
    });
    $ptty.register('command', {
        name: 'withdraw-token',
        method: function (cmd) {
            return {
                out: 'coming soon ...',
            };
        },
        help: 'withdraw'
    });
});