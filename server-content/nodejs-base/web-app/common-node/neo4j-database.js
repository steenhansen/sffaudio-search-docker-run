

// const INIT_NEO4J_PASSWORD= process.env.INIT_NEO4J_PASSWORD;  
// const INSIDE_BOLT_PORT = process.env.INSIDE_BOLT_PORT;      
// const NEO4J_USERNAME= process.env.NEO4J_USERNAME; 

//const INIT_NEO4J_PASSWORD= 'yer_password';  
//const INSIDE_BOLT_PORT = 7687;      
//const NEO4J_USERNAME= 'neo4j'; 


////////////////////////////////////////////////////////////////////

const NEO4J_CONTAINER_NAME= process.env.NEO4J_CONTAINER_NAME; 


const SPACES_NEO4J_USERNAME= process.env.NEO4J_USERNAME; 
const SPACES_INIT_NEO4J_PASSWORD= process.env.INIT_NEO4J_PASSWORD; 



const NEO4J_USERNAME= SPACES_NEO4J_USERNAME.trim(); 
const INIT_NEO4J_PASSWORD= SPACES_INIT_NEO4J_PASSWORD.trim(); 

const BOLT_URI = 'bolt://' + NEO4J_CONTAINER_NAME + ':7687' 




//console.log('2 NEO4J_USERNAME', NEO4J_USERNAME, '**')
//console.log('2 INIT_NEO4J_PASSWORD', INIT_NEO4J_PASSWORD, '**')
//console.log('2 NEO4J_AUTH', process.env.NEO4J_AUTH)

const NO_INTERNAL_ENCRYPTION = {encrypted: false};
const neo4j_v1 = require('neo4j-driver').v1;
const neo4j_v1_auth = neo4j_v1.auth.basic(NEO4J_USERNAME, INIT_NEO4J_PASSWORD);
const neo4j_driver = neo4j_v1.driver(BOLT_URI, neo4j_v1_auth, NO_INTERNAL_ENCRYPTION);









const neo4j_session = neo4j_driver.session();



module.exports = neo4j_session;
