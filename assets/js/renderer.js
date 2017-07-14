var aio = require('asterisk.io');
var ami = null;
var agi = null;

var el = document.querySelector('.chrome-tabs');
var chromeTabs = new ChromeTabs();
chromeTabs.init(el, { tabOverlapDistance: 14, minWidth: 45, maxWidth: 243 });

chromeTabs.addTab({
  title: 'Consola',
  content: 'console'
});

chromeTabs.addTab({
  title: 'Ajustes',
  content: 'settings'
});

chromeTabs.addTab({
  title: 'SSH',
  content: 'ssh'
});

chromeTabs.addTab({
  title: 'Test',
  content: 'test'
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
	       	console.log(data)
        }
    );
}

ami.on('ready', function(){
 
 
});