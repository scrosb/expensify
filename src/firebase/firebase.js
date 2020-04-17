import * as firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APPID,
};

firebase.initializeApp(config);
const database = firebase.database();

export { firebase, database as default };


// database.ref('expenses').on('child_removed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// })

// //child_added
// database.ref('expenses').on('child_added', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// })


// database.ref('expenses')
//   .once('value')
//   .then((snapshot) => {
//     const expenses = []

//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id:childSnapshot.key,
//         ...childSnapshot.val()
//       })
//     })

//     console.log(expenses);
//   })

//   database.ref('expenses').on('value',(snapshot) => {
//     const expenses = []

//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id:childSnapshot.key,
//         ...childSnapshot.val()
//       })
//     })

//     console.log(expenses);
// }, (e) => {
//   console.log('Database Error fetching ', e);
// });

// database.ref('expenses').push(
//   {
//     description:'Credit Card',
//     note: '',
//     amount: 4500,
//     createdAt:moment(0).add(4, 'days').valueOf()
//   },
// )




// {
//   id:'1',
//   description:'Gum',
//   note: '',
//   amount: 195,
//   createdAt:0
// },
// {
//   id:'2',
//   description:'Rent',
//   note: '',
//   amount: 109500,
//   createdAt:moment(0).subtract(4, 'days').valueOf()
// },
// {
//   id:'3',
  // description:'Credit Card',
  // note: '',
  // amount: 4500,
  // createdAt:moment(0).add(4, 'days').valueOf()
// },

// database.ref('notes').push({
//   title: 'Course Topics',
//   body:'React Native, Angular, Python'
// });

///on is realtime
// database.ref().on('value',(snapshot) => {
//       const val = snapshot.val();
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// }, (e) => {
//   console.log('Database Error fetching ', e);
// });

// const fireBaseNotes = {
//   notes:{
//     adsfhsdfh:{
//       title: 'first note',
//       body:'this is my note'
//     },
//     sdagsdgasdg:{
//       title: 'second note',
//       body:'this is my second note'
//     }
//   }
// }



// const notes = [{
//   id:12,
//   title: 'first note',
//   body:'this is my note'
// }, {
//   id:13,
//   title: 'second note',
//   body:'this is my second note'



// setTimeout(() => {
//   database.ref('age').set(28);
// }, 3500)

// setTimeout(() => {
//   database.ref('name').set('joe');
// }, 3500)

// setTimeout(() => {
//   database.ref('age').set(30);
// }, 10500)


// database.ref('location/city')
//   .once('value')
//   .then((snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
//   })
//   .catch(e => {
//     console.log('error', e)
//   })


// database.ref().set({
//   name:'Silas Crosby',
//   age: 26,
//   stressLevel:6,
//   job:{
//     title:'Software Developer',
//     company:'Google'
//   },
//   location: {
//     city: 'Houston',
//     country:'United States'
//   },
// }).then(() => {
//   console.log('Data is saved!');
// }).catch((e) => {
//   console.log('This Failed, ', e);
// })

// database.ref().update({
//   'job/company':'Amazon',
//   stressLevel:9,
//   'location/city':'Seattle'
// }).then(() => {
//   console.log('company, city, stress updated')
// }).catch((e) => {
//   console.log('Errors: ', e);
// })






// database.ref('isSingle').set(null)
//   .then(() => {
//     console.log('Remove Succeded')
//   }).catch(e => {
//     console.log('there was an Error: ', e.message);
//   });







//set can take any datatype

// database.ref().set('This is my data');

// database.ref('age').set(27);
// database.ref('location/city').set('Michigan');

// database.ref('attributes').set({height:76, weight:260}).then(() => {
//   console.log('data is saved');
// }).catch(e => {
//   console.log('ERROR OH NO!!!!!', e);
// })

// console.log('I made a request to change the data');