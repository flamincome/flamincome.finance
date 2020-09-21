$(document).ready(function () {
    let welcome = document.createElement('div')
    let welcome_header = document.createElement('p')
    let welcome_logo = document.createElement('pre')
    let welcome_footer = document.createElement('p')
    welcome_header.id = 'welcome_header'
    welcome_logo.id = 'welcome_logo'
    welcome_footer.id = 'welcome_footer'
    welcome_header.style.textAlign = 'center'
    welcome_logo.style.textAlign = 'center'
    welcome_logo.innerText = 'loading ...'
    welcome_footer.style.textAlign = 'center'
    welcome_header.innerHTML = 'welcome to <b>flamincome</b>'
    welcome_footer.innerHTML = 'get start at <a href="https://flamincome.github.io/docs">docs</a><br><b>USE AT YOUR OWN RISK!!!</b>'
    welcome.appendChild(welcome_header)
    welcome.appendChild(welcome_logo)
    welcome.appendChild(welcome_footer)

    let $ptty = $('#terminal').Ptty({
        i18n: {
            welcome: welcome.outerHTML,
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