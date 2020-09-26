// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/viewEvents");
      console.log(req);
    }
    res.sendFile(path.join(__dirname, "../public/welcome.html"));
  });

  app.get("/linkup", (req, res) => {
    // If the user already has an account send them to the members page
    // if (req.user) {
    //   res.redirect("/viewevents");
    // }
    res.sendFile(path.join(__dirname, "../public/createEvents.html"));
  });

  app.get("/linkup/:id/edit", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/edit.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/viewEvents", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/viewEvents.html"));
  });
};
