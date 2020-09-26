$(document).ready(() => {
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleLinkUpDelete);
  $(document).on("click", "button.edit", handleLinkUpEdit);

  // This function does an API call to delete posts
  function deleteLinkUp(id) {
    const target = id;
    $.ajax({
      method: "DELETE",
      url: "/api/linkup/" + id
    }).then(function() {
      $(`#${target}`).remove();
      console.log("success");
    });
  }
  const profile = $("#myProfile");
  profile.on("click", function() {
    $.get("/api/user_data").then(data => {
      $(".member-name").text(data.email);
      console.log("Profile ID ===>", data.id);
      const userID = data.id;
      $.get("/api/linkup/UserId/" + userID, function(res) {
        displayUserLinkUp(res);
      });
    });
  });

  function displayUserLinkUp(data) {
    for (let i = 0; i < data.length; i++) {
      const eventTime = convertTime(data[i].startTime);
      const displayEach = `
      <div id="${data[i].id}" class="card-title" style="font-size: 20px">
        <b>${data[i].name}</b></p>
                    <p><b>Where: </b>${data[i].street} ${data[i].city}, ${data[i].state} ${data[i].zipCode}</p>
                    <p><b>When: </b>${data[i].linkUpDate} at ${eventTime}</p>
                    <p class="card-text"><b>What: </b>${data[i].linkUpDesc}.
                    </p>
                    <button type="button" data-id=${data[i].id} class="btn btn-primary btn-xsm edit">Edit</button>
                    <button type="button" data-id=${data[i].id} class="btn btn-danger btn-xsm delete">Delete</button>
                    <hr>
                 </div>
                    `;
      $(".pro").append(displayEach);
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
    // return time
    return timeValue;
  }

  function handleLinkUpDelete() {
    const currentLinkUp = $(this).data("id");
    console.log("Delete This===>", currentLinkUp);
    deleteLinkUp(currentLinkUp);
  }
  function handleLinkUpEdit() {
    const currentLinkUp = $(this).data("id");
    console.log("Edit This===>", currentLinkUp);
    window.location.replace("/linkup/edit?linkup_id=" + currentLinkUp)
  }
});
