// setTimeout(() => {
//   if (
//     !!window.React ||
//     !!document.querySelector("[data-reactroot], [data-reactid]")
//   )
//     console.log("React.js");
// }, 5000);

chrome.extension.onRequest.addListener(function (
  request,
  sender,
  sendResponse
) {
  if (request.action == "getDOM")
    sendResponse({ dom: document.querySelector("h2").innerHTML });
  else sendResponse({}); // Send nothing..
});

function installHook() {
    if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined') {
      console.log('found react dev tools')
      const reactInstances = window.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers || null;
      const instance = reactInstances.get(1);
      // const reactRoot = window.document.body.childNodes;
      const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
      console.log(instance)
    } else {
      console.log('sadly didnt find react dev tools')
    }
}

// execute the install hook in web page context
const script = document.createElement('script');
script.textContent = `;(${installHook.toString()})();`;
document.documentElement.appendChild(script);
