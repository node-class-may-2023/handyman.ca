// selected the "select" element, document.querySelector
// assign event handler, onClick
// onClick => fetch from an end point that provide JSON of the service Types
// then populate the select-options with the data from BE
// for that, BE should have an endpoint that reads the service types, and send it as JSON data

// setting min/ max for dates
// select the input:date (serviceDate)
// get the current day (Date.now())
// get the current day + 90 days
// set minDate to the input min using serviceDate.setAttribute('min', currentDay)
// set maxDate to the input max using serviceDate.setAttribute('max', currentDayPlus90)

// Disable name, contact, and address if selection is NO (getAttribute())
// select the radio buttons, and get the state of both
// select name, contact, address input boxes

// if no is checked
// for example for name input box, use requesterName.setAttribute('disabled', true), repeat for the rest
// set name, contact, and address fields as optional, for example requesterName.removeAttribute('required')

// if yes is checked
// enable name, contact, and address fields using for example requesterName.removeAttribute('disabled')
// set name, contact, and address fields as required, for example requesterName.setAttribute('required', true)
