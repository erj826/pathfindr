chrome.extension.onRequest.addListener(function (
  request,
  sender,
  sendResponse
) {
  if (request.action == "getDOM")
    sendResponse({ dom: document.querySelector("h2").innerHTML });
});

setTimeout(() => {
  if (
    !!window.React ||
    !!document.querySelector("[data-reactroot], [data-reactid]")
  )
    console.log("Pathfindr: this page is using React.js");
}, 5000);
