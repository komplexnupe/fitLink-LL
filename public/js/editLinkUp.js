// $(document).ready(() => {
    const linkUpForm = $("form.LinkUp");
    const categoryInput = $("#category");
    const linkName = $("#LinkName");
    const addressInput = $("#Addy");
    const cityInput = $("#inputCity");
    const stateInput = $("#stateInput");
    const zipCodeInput = $("#Zip");
    const dateInput = $("#Date");
    const startTime = $("#Start");
    const linkUpDuration = $("#duration");
    const linkUpDescription = $("#description");
    var url = window.location.search;
    var linkUpID;

    if (url.indexOf("?linkup_id=") !== -1) {
        linkUpID = url.split("=")[1];
        console.log("ID ===>", linkUpID);
        getLinkUpData(linkUpID);
      }

    function displayEditLinkUp(data) {
        console.log(data);
        const display = `
        <div class="form-row">
        <div class="form-group col-md-6">
          <label for="linkUpCategory">LinkUp Category</label>
          <select class="custom-select" id="category" placeholder="Choose A Category">
            <option selected placeholder="Select Category">${data.category}</option>
            <option value="Basketball">Basketball</option>
            <option value="Biking">Cycling</option>
            <option value="Dodgeball">Dodgeball</option>
            <option value="Football">Football</option>
            <option value="HIIT">HIIT</option>
            <option value="Kickball">Kickball</option>
            <option value="Running">Running</option>
            <option value="Soccer">Soccer</option>
            <option value="Yoga">Yoga</option>
          </select>
        </div>
        <div class="form-group col-md-6">
          <label for="linkUpName">LinkUp Name</label>
          <input class="form-control" type="text" id="LinkName" placeholder="LinkUp Name" value="${data.name}">
        </div>
      </div>
      <div class="form-group">
        <label for="linkUpDescription">LinkUp Description</label>
        <input class="form-control" type="text" id="description" placeholder="Description" value="${data.linkUpDesc}">
      </div>
      <div class="form-group">
        <label for="streetAddress">Street Address</label>
        <input class="form-control" type="text" id="Addy" placeholder="Street Address" value="${data.street}">
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputCity">City</label>
          <input type="text" class="form-control" id="inputCity" placeholder="City" value="${data.city}">
        </div>
        <div class="form-group col-md-4">
          <label for="stateDropdown">State</label>
          <select class="custom-select" id="stateInput">
            <option selected placeholder="Select State">${data.state}</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </div>
        <div class="form-group col-md-2">
          <label for="exampleFormControlTextarea1">Zip Code</label>
          <input class="form-control" type="text" id="Zip" placeholder="Zip Code" value="${data.zipCode}">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-3">
          <label for="exampleFormControlTextarea1">Date</label>
          <input class="form-control" type="date" id="Date" placeholder="Date">
        </div>
        <div class="form-group col-md-3">
          <label for="exampleFormControlTextarea1">Start Time</label>
          <input class="form-control" type="time" id="Start" placeholder="06:00">
        </div>
        <div class="form-group col-md-3">
          <label for="exampleFormControlTextarea1">Duration</label>
          <input class="form-control" type="number" id="duration" placeholder="Minutes" value="${data.duration}">
        </div>
      </div>
      <button type="submit" class="btn btn-fit col-md-12">Edit LinkUp</button>

                      `;
        linkUpForm.append(display);
    }

    linkUpForm.on("submit", event => {
        event.preventDefault();
        console.log(linkName, linkUpDescription, addressInput);
        const linkUpData = {
            name: linkName.val().trim(),
            linkUpDesc: linkUpDescription.val().trim(),
            street: addressInput.val().trim(),
            city: cityInput.val(),
            state: stateInput.val(),
            zipCode: zipCodeInput.val().trim(),
            linkUpDate: dateInput.val(),
            startTime: startTime.val(),
            duration: linkUpDuration.val(),
            category: categoryInput.val()
        };
        console.log(linkUpData);
        // updateLinkUp(linkUpData);
      });
    
      function getLinkUpData(id) {
        $.get("/api/linkup/" + id, function(data) {
          if (data) {
            displayEditLinkUp(data);
          }
        });
      }
  
      function updateLinkUp(data) {
        console.log(data);
        $.ajax({
            method: "PUT",
            url: "/api/linkup/" + linkUpID,
            data: data
          }).then(() => {
            window.location.replace("/viewLinkUps");
            // If there's an error, handle it by throwing up a bootstrap alert
          })
          .catch(error => {
            console.log(error);
          });
        };
//   });
  