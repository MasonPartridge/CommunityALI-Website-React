// FILE OVERVIEW
// This file recieves an application from the user
// Then, it stores that application in the database
// Finally, it sends the user to the signup-success.html page

const models = require("../connect-to-database");
const Application = models.Application;

const store_application = async function(req) {
  try {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const time = hours.toString() + ':' + minutes.toString() + ':' + seconds.toString();

    const apply = new Application({
      service: req.body.service,
      name: req.body.name,
      email: req.body.email,
      w_number: req.body.w_number,
      date: formattedDate,
      time: time,
      is_new_applicant: true
    });

    await apply.save(); // Use await to wait for the save operation to complete

    // Display success page
    return 'success';
  } catch (error) {
    console.log(error);
    return 'failure';
  }
};


module.exports = store_application;