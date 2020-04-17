const promise = new Promise((resolve, reject) => {
  //resolve went well,
  //reject something went wrong

  setTimeout(() => {
// resolve({
//   name:'Silas',
//   age: 26
// })

    reject('Something went wrong');
  }, 5000)

});

console.log('before');

promise.then((data) => {
  console.log( '1', data);
}).catch(e => {
  console.log('error: ' ,e);
})



console.log('after')
