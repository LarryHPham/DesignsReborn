(function() {
  // https://jsfiddle.net/88gygkrd/7/
  // NOTE: Info below usually comes from a database to store important information but for now we shall keep it hardcoded
  var donationObj = {
    totalNeeded: 500, // hardcoded to be the limit
    daysLeft: 1,
    startFundDate: 0,
    currentFundDate: 3, //NOTE: think of using unix time stamp to compare with startFundDate to get daysLeft
    donorCount: 1,
    amount: 50,

  };

  var needsEl = document.getElementById('needs');
  var progressEl = document.getElementById('progress');
  var timeLimit = document.getElementById('timeLimit');
  var donorsEl = document.getElementById('donors');
  var donate = document.getElementById('donate');

  var modal = document.getElementById('modal-donate');
  var modalBtn = document.getElementById('modalBtn');
  var close = document.getElementsByClassName('close')[0];

  var save = document.getElementsByClassName('donate-save')[0];
  var tell = document.getElementsByClassName('donate-tell')[0];

  modalBtn.onclick = function() {
    modal.style.display = 'block';
  }

  close.onclick = function() {
    modal.style.display = 'none';
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }

  // creates a bookmark reference to save for later
  save.onclick = function() {
    var title = document.title;
    var url = document.location.href;
    if (window.sidebar && window.sidebar.addPanel) { // Mozilla Firefox Bookmark
      window.sidebar.addPanel(document.title, window.location.href, '');
    } else if (window.external && ('AddFavorite' in window.external)) { // IE Favorite
      window.external.AddFavorite(location.href, document.title);
    } else if (window.opera && window.print) { // Opera Hotlist
      this.title = document.title;
      return true;
    } else { // webkit - safari/chrome
      alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL') + ' + D to bookmark this page.');
    }
  }

  // create a windows prompt to have the link shown for copy and sharing
  // NOTE: Could also make this a facebook but sharing a link is fine
  tell.onclick = function(){
    var url = location.href;
    window.prompt("Copy to clipboard: Ctrl+C, Enter", url)
  }

  // Run to get the current progress and donations
  update();

  // function that detects what is in the input field value and updates the donationObj
  // NOTE: for this project this function is basic and should have edge cases to allow users to have double confirmation before actually donating
  updateDonation = function() {
    let value = parseFloat(donate.value);
    if (value == '' || value == null || isNaN(value)) {
      return false;
    }
    donationObj.donorCount++;
    donationObj.amount += value;
    update();
  };

  // updates the progress bar element
  function updateProgressBar() {
    let percent = parseFloat(donationObj.amount / donationObj.totalNeeded).toFixed(2) * 100;
    if (percent >= 100) {
      percent = 100;
    }
    progressEl.style.width = percent + '%';
  };

  // updates the progress bar element
  function updateDonationNeeds() {
    let needAmount = parseFloat(donationObj.totalNeeded - donationObj.amount).toFixed(0);
    if (needAmount < 0) {
      needsEl.innerHTML = '$' + donationObj.totalNeeded + ' Goal Reached! $' + Math.abs(needAmount) + ' past our original goal!';
    } else {
      needsEl.innerHTML = '$' + needAmount + ' still needed for this project.';
    }
  };

  // updates the progress bar element
  function updateDonors() {
    donorsEl.innerHTML = donationObj.donorCount;
  };

  // updates the time
  function updateTime() {
    timeLimit.innerHTML = 'Only ' + donationObj.daysLeft + ' day(s) left';
  };

  function update() {
    updateProgressBar();
    updateDonationNeeds();
    updateDonors();
    updateTime();
  };

  // charCode 13 is when the 'Enter' key is pressed
  donate.onkeypress = function(e) {
    var event = e || window.event;
    var charCode = event.which || event.keyCode;
    if (charCode == '13') {
      updateDonation();
      return false;
    }
  }

})()
