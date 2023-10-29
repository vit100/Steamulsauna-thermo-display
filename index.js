const  LCD = require('@oawu/lcd1602');
const lcd = new LCD();
//lcd.text(0,0,'xxx');
//lcd.text(1,5,'yy')


const got = require('got')

async function getDataForSensor(sensorId){
   const dataStr = await got(`https://thermo-sensor.azurewebsites.net/api/Thermo/6164FB7E?id=${sensorId}`);
	return JSON.parse(dataStr.body)[0];	
   
}

const sensorsToShow = [
	{name:"Small Banya", id:1},
	{name: "Big Banya", id:3},
	{name: "Small Sauna",id:4},
	{name: "Big Sauna", id:5}
]

function sleep(delay){
	return new Promise((resolve)=>{
		setTimeout(resolve,delay)
	})
}

async function run(){
while(true){
for(const item of sensorsToShow){
	const data = await getDataForSensor(item.id);
	console.log(`${item.name}`, data );
	lcd.clear();
	lcd.text(0,3,item.name);
	lcd.text(1,5,`${data.v} C.`)
	await sleep(5000);
}
}}

run();


//getDataForSensor(1);
