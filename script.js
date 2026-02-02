$(document).ready(function() {
  var envelope = $('#envelope');
  var btn_open = $("#open");
  var btn_reset = $("#reset");
  var audio = document.getElementById("bgMusic");
  
  // Track if music has started yet
  var musicStarted = false;

  // Function to open the envelope
  function openEnvelope() {
    envelope.addClass("open").removeClass("close");
    $("#popupMessage").addClass("show");
    btn_open.text("Close"); // Change button text

    // Play music if it hasn't started
    if (!musicStarted) {
      audio.currentTime = 11; // first time start at 11s
      musicStarted = true;
      audio.play().catch((e) => console.log("Autoplay blocked:", e));
    }
    // If already playing, leave it running
  }

  // Function to close the envelope (toggle)
  function closeEnvelope() {
    envelope.addClass("close").removeClass("open");
    $("#popupMessage").removeClass("show");
    btn_open.text("Open"); // revert button text
    // Music continues playing — do nothing here
  }

  // Function to fully reset everything
  function resetAll() {
    closeEnvelope();
    audio.pause();
    audio.currentTime = 0; // reset to start
    musicStarted = false;   // so next open starts at 11s
  }

  // Toggle envelope open/close on button or envelope click
  function toggleEnvelope() {
    if (envelope.hasClass("close")) {
      openEnvelope();
    } else {
      closeEnvelope();
    }
  }

  // Event listeners
  btn_open.click(toggleEnvelope);      // Open/Close toggle button
  envelope.click(toggleEnvelope);      // Clicking envelope toggles
  btn_reset.click(resetAll);           // Reset button

  // === Video Background Fade-In ===
  var videoWrapper = $('<div id="video-bg-wrapper"><video id="video-bg" autoplay muted loop playsinline><source src="video.mp4" type="video/mp4"></video></div>');
  $('body').append(videoWrapper);

  $('#video-bg-wrapper').css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    overflow: 'hidden',
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity 2s ease'
  });
  $('#video-bg').css({
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  });

  // Fade in video after 8 seconds
  setTimeout(function() {
    $('#video-bg-wrapper').css('opacity', '1');
  }, 8000);
});