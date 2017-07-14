var aio = require('asterisk.io');
var ami = null;
var agi = null;

var exec = require('ssh-exec')


var el = document.querySelector('.chrome-tabs');
var chromeTabs = new ChromeTabs();
chromeTabs.init(el, { tabOverlapDistance: 14, minWidth: 45, maxWidth: 243 });

chromeTabs.addTab({
  title: 'Ajustes',
  content: 'settings'
});

chromeTabs.addTab({
  title: 'Archivos de configuración',
  content: 'ssh'
});

chromeTabs.addTab({
  title: 'Test',
  content: 'test'
});


chromeTabs.addTab({
  title: 'Consola',
  content: 'console'
});

var ami = aio.ami('192.168.1.73',5038,'abraham','1271');

ami.on('error', function(err){
    throw err;
});

window.cmd = function(command, cb)
{
	ami.action(
        'Command',
        {
            Command: command
        },
        function(data){
	       	cb(data)
        }
    );

}

ami.on('ready', function(){
 
 
});


$('.console').terminal(function(command, term) {
    
    if(command == 'cf -ls')
    {
        term.echo('Buscando archivos de configuración')

        exec('cd /etc/asterisk && ls', {
            user: 'sivoz',
            host: '192.168.1.73',
            password: '$1V0z'
        }, function (err, stdout, stderr) {
          term.echo(stdout)
        }) 
    }
    else
    {
        term.echo('Llamando comando de asterisk, por favor espera')

        window.cmd(command,function(data){
            console.log(data)
            term.echo(data.content)
        })
    }

})