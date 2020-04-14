// console.log('destructuring');

// const person = {
//   name: 'Silas',
//   age: 27,
//   location:{
//     city: 'Houston',
//     temp: 90
//   }
// }

// const { name : firstName = 'Anonymous', age} = person

// const {city, temp: temperature} = person.location;



// console.log(`${firstName} is ${age} and he lives in ${city}`);


// if(city && temperature){
//   console.log(`It's ${temperature} in ${city}`);
// }

// const book = {
//   title:'Ego is the Enemy',
//   author: 'Ryan Holiday',
//   publisher:{
//     name: 'Penguin Books'
//   }
// };

// const {name: publisherName = 'Self-Published'} = book.publisher

// console.log(publisherName)

// Array destructuring

const address = ['1299 S Juniper Street','Philadelphia', 'Pennsylvania', '19147'];

//matches by position, you can leave off variables to skip array values
const [,, state= 'New York'] = address;

console.log(`You are in ${state}`);

const item = ['Coffee (hot)', '$2.00', '2.50', '2.75'];

const [coffee,,medium,] =  item;

console.log(`A medium ${coffee} costs ${medium}`);




