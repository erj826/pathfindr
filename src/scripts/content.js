setTimeout(() => {
  if (
    !!window.React ||
    !!document.querySelector("[data-reactroot], [data-reactid]")
  )
    console.log("React.js");
}, 5000);

chrome.extension.onRequest.addListener(function (
  request,
  sender,
  sendResponse
) {
  if (request.action == "getDOM")
    sendResponse({ dom: document.querySelector("h2").innerHTML });
  else sendResponse({}); // Send nothing..
});
