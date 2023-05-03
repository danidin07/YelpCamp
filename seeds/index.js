const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelper');



mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database is connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDb = async () =>{
    await Campground.deleteMany({});
    for(let i =0; i<50; i++){
        const Rundom1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author:"643fa1f77304ebaf39cd9499",
            location: `${cities[Rundom1000].city}, ${cities[Rundom1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates:[ cities[Rundom1000].longitude,
                             cities[Rundom1000].latitude
            ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dhe6trima/image/upload/v1682493528/samples/landscapes/nature-mountains.jpg',
                    filename: 'YelpCamp/cld-sample-2'
                }

            ],
            description: 'veniam adipisci accusamus quae repellat aliquam dicta cumque quibusdam, iusto molestias quaerat omnis, enim blanditiis?',
            price
          });
          
        await camp.save();
    }
}
seedDb().then(() =>mongoose.connection.close());
