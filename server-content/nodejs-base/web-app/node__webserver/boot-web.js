
require('../common-node/global-require');
const heroku_environment = rootAppRequire('common-node/check-start/heroku-environment');
heroku_environment.processEnvVars();

rootAppRequire('node__webserver/web-server')

const OUTSIDE_BROWSER_URI=27474
const OUTSIDE_BOLT_URI = 27687;


const SPACES_NEO4J_USERNAME= process.env.NEO4J_USERNAME; 
const SPACES_INIT_NEO4J_PASSWORD= process.env.INIT_NEO4J_PASSWORD; 


const OUTSIDE_HTML_PORT= process.env.OUTSIDE_HTML_PORT; 

const NEO4J_USERNAME= SPACES_NEO4J_USERNAME.trim(); 
const INIT_NEO4J_PASSWORD= SPACES_INIT_NEO4J_PASSWORD.trim(); 







const DB_BROWSER_URI = `DB Browser     ~ http://localhost:${OUTSIDE_BROWSER_URI}/browser/`;    
const DB_CONNECT_URL = `DB Connect URL ~ neo4j://       localhost:${OUTSIDE_BOLT_URI}`;    
const DB_USERNAME    = `DB Username    ~ ${NEO4J_USERNAME}`;    
const DB_PASSWORD    = `DB Password    ~ ${INIT_NEO4J_PASSWORD}`;    
const HTML_PROGRAM   = `Web Page       ~ http://localhost:${OUTSIDE_HTML_PORT}/`;       

console.log('\n  \033[93m  DB_BROWSER_URI *****', DB_BROWSER_URI, '\033[0m');
console.log(  '  \033[93m  DB_CONNECT_URL *****', DB_CONNECT_URL, '\033[0m');
console.log(  '  \033[93m  DB_USERNAME    *****', DB_USERNAME,    '\033[0m');
console.log(  '  \033[93m  DB_PASSWORD    *****', DB_PASSWORD,    '\033[0m');
console.log(  '  \033[93m  HTML_PROGRAM   *****', HTML_PROGRAM,   '\033[0m\n');



