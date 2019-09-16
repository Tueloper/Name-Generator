//variables
const generateNames = document.querySelector('#generate-names');

//eventListeners
eventListeners();

function eventListeners() {
  generateNames.addEventListener('submit', (e) => {
    
    //prevent the form from loading
    e.preventDefault();

    //read values from the form
    const country = document.querySelector('#country').value;
    const gender = document.querySelector('#genre').value;
    const amount = document.querySelector('#quantity').value;

    //Build the URL
    let url = `https://uinames.com/api/?`

    //read the country and append date
    if (country === '' || gender === '' || amount === undefined ) {
      
      //add error prompt
      printMessage('All Fields must be Filled', 'alert-danger');
    } else {

      printMessage('Thank You For your Input', 'alert-success')

      url += `region=${country}&gender=${gender}&amount=${amount}`
      
      //fetch the requesta
      const xhr = new XMLHttpRequest();

      //open the connection
      xhr.open('GET', url, true)

      //execute
      xhr.onload = function () {
        if (this.status === 200) {
          const names = JSON.parse(this.responseText)
          
          //insert the values in html
          const result = document.getElementById('result')

          let html = `<h2 class="text-center mb-2"> Generated Names</h2>`;
          html += '<ul class="list">';
          names.forEach(element => {
            html += `
              <li>${element.name}</li>
            `
          });
          html += '</ul>'
          // return console.log(html)
          result.innerHTML = html;
        }
      };

      xhr.send();

    }
  })
}

//functions
function printMessage(message, alert) {

  //create the message
  const errorDiv = document.createElement('div');
  errorDiv.classList.add('text-center', 'alert', alert);
  errorDiv.appendChild(document.createTextNode(message))

  // return console.log(errorDiv) 

  //insert the message
  document.querySelector('.six').insertBefore(errorDiv, document.querySelector('.control'));

  //setTimeOut
  setTimeout(() => {
    document.querySelector('#generate-names .alert').remove()
  }, 4000)
};