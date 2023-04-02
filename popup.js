document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("btn");
    btn.addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "get_description", imageUrl: tabs[0].url },
          function (response) {
            if (response && response.description) {
              responsiveVoice.speak(response.description, "UK English Male", {
                pitch: 1,
                rate: 1,
                volume: 1
              });
            }else{
                responsiveVoice.speak("No image detected.")
            }
          }
        );
      });
    });
  });
  