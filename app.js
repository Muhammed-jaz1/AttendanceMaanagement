const express =require('express')
const bodyParser=require('body-parser')
const cors=require ('cors')
const app=express()
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const port =require('./config/index').server.port
console.log(port);



var swaggerDefinition = {
  info: {
      title: 'Training 0',
      version: '2',
      description: '',

  },
  host: `localhost:5000`,
  basePath: '/',
  schemes: [
      'http',
      'https'
  ],
  securityDefinitions: {
      Bearer: {
          type: 'apiKey',
          in: 'header',
          name: 'auth-token'
      }
  }

};
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};


const swaggerSpec = swaggerJSDoc(options);


const user = require('./routes/user');
const attendance =require('./routes/attendance')


const db = require('./models');
// app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())

db.sequelize.sync({force:false})
  .then(()=> console.log('successfully synced with DB'))
  .catch((err)=> console.log("Sync error", err))


app.use('/training', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', user);
app.use('/attendance',attendance)




// set port, listen for requests
app.listen(port,()=>{
  console.log("Localhost 3000 server is running....");
})