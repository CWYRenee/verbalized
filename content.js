chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'get_description') {
      const imageUrl = request.imageUrl;
      chrome.runtime.sendMessage({ action: 'detectText', imageUrl }, function(response) {
        if (response.success) {
          sendResponse({ description: response.text });
        } else {
          console.error(response.error);
        }
      });
      return true;
    }
  });
  