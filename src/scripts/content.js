// setTimeout(() => {
//   if(!!window.React ||
//     !!document.querySelector('[data-reactroot], [data-reactid]'))
//    console.log('React.js');
// }, 5000);

/** function to inject traversal script into running tab's context */
function injectScript(func, node) {
  const th = document.getElementsByTagName(node)[0];
  const s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', func());
  th.appendChild(s);
}

getReactInfo = () => {
  if (!window.__REACT_DEVTOOLS_GLOBAL_HOOK__) console.warn('[Pathfindr]: Pathfindr requires React Dev Tools to be installed.');
  const reactInstances = window.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers || null;
  const instance = reactInstances.get(1);
  // const reactRoot = window.document.body.childNodes;
  const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

  console.log(instance)
  console.log(devTools)
}

chrome.runtime.onMessage.addListener(() => {
  const newEvent = new Event('Pathfindr');
  window.dispatchEvent(newEvent);
});

setTimeout(() => {
  injectScript(getReactInfo, 'body');
}, 5000);