const API_KEY = 'AIzaSyAKLhtUEohfa6rygfQ6IT43xOBUDjHwB8E'; // Replace with your Google Cloud API key

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'detectText') {
    const imageUrl = request.imageUrl;
    detectText(imageUrl)
      .then((result) => {
        sendResponse({ success: true, text: result });
      })
      .catch((error) => {
        sendResponse({ success: false, error: error.message });
      });
    return true;
  }
});

function detectText(imageUrl) {
  return new Promise((resolve, reject) => {
    const payload = {
      requests: [
        {
          image: {
            source: {
              imageUri: imageUrl
            }
          },
          features: [
            {
              type: 'TEXT_DETECTION'
            }
          ]
        }
      ]
    };
    const url = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
      .then((response) => response.json())
      .then((result) => {
        const textAnnotations = result.responses[0].textAnnotations;
        if (textAnnotations && textAnnotations.length > 0) {
          resolve(textAnnotations[0].description);
        } else {
          reject(new Error('No text found in image'));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
