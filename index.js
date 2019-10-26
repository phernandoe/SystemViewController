const { fetchJson } = require('./lib/fetchJson');
const { parse } = require('./lib/parse');

console.log('*'.repeat(15));

process.stdin.on('readable', () => {

  let arg;

  while ((arg = process.stdin.read()) !== null) {

    arg = String(arg).trim();

    if (arg === "!q") {                   // Quit the program
      console.log("quitting...");
      process.exit(0);
    }
    
    else if (arg.startsWith(".")) {       // classNames
      const name = arg.replace('.', '');
      fetchJson().then(res => {
        parse(res, 'classNames', name);
      });
    } 
    
    else if (arg.startsWith("#")) {       // ID
      const name = arg.replace('#', '');
      fetchJson().then(res => {
        parse(res, 'identifier', name);
      });
    } 
    
    else {                                // Class
      const name = arg;
      fetchJson().then(res => {
        parse(res, 'class', name);
      });
    }


  }
});