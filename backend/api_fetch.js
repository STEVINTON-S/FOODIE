const axios = require('axios');
const { MongoClient } = require('mongodb');

const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const mongoURI = 'mongodb://localhost:27017';
const dbName = 'MealDB';
const collectionName = 'Meals';

async function fetchMealData(searchTerm) {
    try {
        const response = await axios.get(`${API_URL}${searchTerm}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from API: ${error.message}`);
        return null;
    }
}

function extractMealDetails(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(meal[`strIngredient${i}`]);
        } else {
            break;
        }
    }

    return {
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strCategory: meal.strCategory,
        strArea: meal.strArea,
        strMealThumb: meal.strMealThumb,
        strTags: meal.strTags,
        strYoutube: meal.strYoutube,
        ingredients: ingredients.join(', '),
        price: `$${(Math.random() * (50 - 10) + 10).toFixed(2)}`
    };
}

async function storeMealData(client, mealData) {
    if (!mealData || !mealData.meals) return;
    const meals = mealData.meals.map(extractMealDetails);

    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const existingMeals = await collection.find().toArray();
        const existingMealIds = existingMeals.map(meal => meal.idMeal);

        const uniqueDocuments = meals.filter(meal => !existingMealIds.includes(meal.idMeal))
            .map(meal => ({
                _id: meal.idMeal,
                ...meal
            }));

        if (uniqueDocuments.length === 0) {
            console.log("No new meals to insert.");
            return;
        }

        await collection.insertMany(uniqueDocuments);
        console.log(`Stored ${uniqueDocuments.length} new records in the database.`);
    } catch (error) {
        console.error(`Error storing data in the database: ${error.message}`);
    }
}

async function synchronizeData() {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const searchTerms = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

        for (const term of searchTerms) {
            const mealData = await fetchMealData(term);
            await storeMealData(client, mealData);
        }

        console.log('Data synchronization completed.');
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

async function main() {
    await synchronizeData();
    setTimeout(main, 86400000);  // 24 hours
}

main();
