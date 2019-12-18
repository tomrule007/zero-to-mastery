// Solve the questions below:

// #1) Create a promise that resolves in 4 seconds and returns "success" string
const waitFourSeconds = msg =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(msg);
    }, 4000);
  });
const start = Date.now();
// #2) Run the above promise and make it console.log "success"
waitFourSeconds('success').then(response => {
  const end = Date.now();

  console.log(`Start: ${start}
End: ${end}
Time:${end - start}
response: ${response}`);
});

// #3) Read about Promise.resolve() and Promise.reject(). How can you make
// the above promise shorter with Promise.resolve() and console loggin "success"
Promise.resolve(
  setTimeout(() => {
    console.log('Another 4seconds');
  }, 4000)
);

// #4) Catch this error and console log 'Ooops something went wrong'
Promise.reject('failed').catch(() => console.log('Ooops something went wrong'));

// #5) Use Promise.all to fetch all of these people from Star Wars (SWAPI) at the same time.
// Console.log the output and make sure it has a catch block as well.
const urls = [
  'https://swapi.co/api/people/1',
  'https://swapi.co/api/people/2',
  'https://swapi.co/api/people/3',
  'https://swapi.co/api/people/4'
];
Promise.all(urls.map(url => fetch(url).then(response => response.json())))
  .then(allResponse => console.log(allResponse))
  .catch(error => console.log(error));
// #6) Change one of your urls above to make it incorrect and fail the promise
// does your catch block handle it?
