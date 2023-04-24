import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/getTax",(req, res) => {
    
    const data = req.body
    let caclulator:any = undefined;
    let vehicleInstance:any = undefined;
    
    //check if city does exist
    try{
      const city = data.city
      caclulator = require(`./congestionTaxCalculator_${city}`)
    } catch(error) {
      console.error('Error of getting tax rule of input city:', error)
      res.status(500).send('The tax rules of input city does not exist!')
      throw error
    }
    
    //check if type of vehicle does exist
    try{
      const className = require(`./${data.vehicle}`)
      vehicleInstance = new className.default
    } catch(error) {
      console.error('Error of getting vehicle:', error)
      res.status(500).send('The type of vehicle does not exist!')
      throw error
    }

    //get data of time and convert it into Date type
    const timeData = data.timestamp
    const timeList:Date[] = timeData.map((timeData) => new Date(timeData))

    //limit the scope to the year 2013
    
    for (let i = 0; i < timeList.length; i++) {
      const year:number = timeList[i].getFullYear();
      try {
        if(year != 2013) throw new Error(`Date ${timeList[i]} is not in 2013.`);
      } catch (error) {
        res.status(500).send(`The Date ${timeList[i]} is not in 2013!`)
        throw error
      }
      
      console.log(year);
      
      
    }
      
    
    let totalTax:number = caclulator.getTax(vehicleInstance, timeList)
    
    res.status(200).json(totalTax)

});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});