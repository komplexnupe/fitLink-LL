$(document).ready(() => {
  $(document).on("click", ".interest", handleInterestBtn);

  const activityCategory = $(".activity");
  activityCategory.on("click", function () {
    $("#linkUpModal").text(event.currentTarget.value);
    // console.log(event.currentTarget.id);
    $("#ol").empty();
    $.get("/api/linkup/category/" + event.currentTarget.id, function (data) {
      // console.log("LinkUps---->", data);
      displayLinkUp(data);
    });
  });
  function displayLinkUp(data) {
    for (let i = 0; i < data.length; i++) {
      // console.log(convertTime(data[i].startTime));
      const eventTime = convertTime(data[i].startTime);
      const displayEach = `
      <p id="evite" class="card-title" style="font-size: 20px">
        <b>${data[i].name}</b>
        <button type="button" data-id=${data[i].id} class="btn btn-fit ml-5 interest float-right">
                        Interested
                        <span class="badge badge-light ml-2">${data[i].interestCount}</span>
                      </button></p>
                    <p><b>Where: </b>${data[i].street} ${data[i].city}, ${data[i].state} ${data[i].zipCode}
                    <p><b>When: </b>${data[i].linkUpDate} at ${eventTime}</p>
                    <p class="card-text"><b>What: </b>${data[i].linkUpDesc}.
                    </p>
                    <hr>
                    `;
      // console.log(displayEach);
      $("#ol").append(displayEach);
    }
  }
  function convertTime(x) {
    let time = x; // your input
    time = time.split(":"); // convert to array
    // fetch
    const hours = Number(time[0]);
    const minutes = Number(time[1]);
    const seconds = Number(time[2]);
    // calculate
    let timeValue;
    if (hours > 0 && hours <= 12) {
      timeValue = "" + hours;
    } else if (hours > 12) {
      timeValue = "" + (hours - 12);
    } else if (hours === 0) {
      timeValue = "12";
    }
    timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes; // get minutes
    timeValue += hours >= 12 ? " P.M." : " A.M."; // get AM/PM
    // show
    // console.log(timeValue);
    return timeValue;
  }

  function handleInterestBtn() {
    const currentLinkUp = $(this).data("id");
    console.log("Interested ===>", currentLinkUp);
  }
});

// const apiKey = "4A2mW06Ar1B7uDV8EwuxOgrQXGpBmAER";
// const addy = "1060 W. Addison St., Chicago IL, 60613"
//         $.ajax({
//             url:`http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${addy}`,
//             method: 'GET',
//         }).then(function (response) {
//             console.log(response);
//         });