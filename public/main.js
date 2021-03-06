/*jshint esversion: 6 */

const form = document.querySelector('.inputform');
const search = document.querySelector('.inputform input');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;
  const url ='/weather?address=' + location;
  const errormsg = document.querySelector('.error');
  const datamsg = document.querySelector('.data');

  datamsg.textContent = 'Loading...';
  errormsg.textContent = '';

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        errormsg.textContent = data.error;
        datamsg.textContent = '';
      }
      else {
        errormsg.textContent = '';
        datamsg.textContent = 'Currently ' + data.temperature + ' degrees in ' + data.location + ', with ' + data.chanceOfRain + '% chance of rain.';
      }
    });
  });
});
