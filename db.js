const mongoose = require('mongoose');
const mongouri = 'mongodb+srv://sreevathsav2002:2002vashtaveers@cluster0.royyza1.mongodb.net/foodify-mern?retryWrites=true&w=majority'

const dbConnect = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(mongouri);
        console.log('Mongo connected');
        fetchData();
    }
    catch (error) {
        console.error('Mongo connection error:', error);
        process.exit(1);
    }
};

const fetchData = async () => {
    try {
        // const collection = mongoose.connection.db.collection('food_category');
        const foodItems = mongoose.connection.db.collection('food_items');
        const data = await foodItems.find({}).toArray();
        const foodCategory = mongoose.connection.db.collection('food_category');
        const data1 = await foodCategory.find({}).toArray();
        
        global.food_items = data;
        global.food_category = data1;
        // console.log(global.food_items)
        console.log(data);
        console.log(data1);
    } catch (error) {
        console.error('Error fetching data:', error);
        process.exit(1);
    }
};

module.exports = dbConnect;