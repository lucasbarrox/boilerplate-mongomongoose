require('dotenv').config();
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
 const lucasB = new Person({
   name: "Lucas Barros",
   age: 25,
   favoriteFoods: ["feijao", "pizza"]
 });

 lucasB.save()
   .then(data => {
     console.log("Person saved:", data);
     done(null, data);
   })
   .catch(err => {
     console.error(err);
     done(err);
   });
};

const createManyPeople = async (arrayOfPeople, done) => {
 try {
   const people = await Person.create(arrayOfPeople);
   console.log("People created:", people);
   done(null, people);
 } catch (err) {
   console.error(err);
   done(err);
 }
};

const findPeopleByName = async (personName, done) => {
 try {
   const peopleFound = await Person.find({ name: personName });
   console.log(`Found people with name ${personName}:`, peopleFound);
   done(null, peopleFound);
 } catch (err) {
   console.error(err);
   done(err);
 }
};

const findOneByFood = async (food, done) => {
 try {
   const personFound = await Person.findOne({ favoriteFoods: food });
   console.log(`Found person who likes ${food}:`, personFound);
   done(null, personFound);
 } catch (err) {
   console.error(err);
   done(err);
 }
};

const findPersonById = (personId, done) => {
 Person.findById(personId)
   .then(data => {
     console.log("Found person:", data);
     done(null, data);
   })
   .catch(err => {
     console.error(err);
     done(err);
   });
};

const findEditThenSave = async (personId, done) => {
 const foodToAdd = "hamburger";
 try {
   const person = await Person.findById(personId);
   person.favoriteFoods.push(foodToAdd);
   const updatedPerson = await person.save();
   console.log("Updated person:", updatedPerson);
   done(null, updatedPerson);
 } catch (err) {
   console.error(err);
   done(err);
 }
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
