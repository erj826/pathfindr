setTimeout(() => {
  if(!!window.React ||
    !!document.querySelector('[data-reactroot], [data-reactid]'))
   console.log('React.js');
}, 5000);

function installHook() {
  let __ReactSightFiberDOM;
  if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined') {
    const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    const reactInstances = window.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers || null;
    const instance = reactInstances.get(1);

    // onCommitFiberRoot
    devTools.onCommitFiberRoot = (function (original) {
      return function (...args) {
        __ReactSightFiberDOM = args[1];
        console.log('DOM: ', __ReactSightFiberDOM);
        traverse16(__ReactSightFiberDOM);
        return original(...args);
      };
    })(devTools.onCommitFiberRoot);
  
    // This will print like an infinite # of components to console.
    console.log(devTools.onCommitFiberRoot());

  } else {
    console.log('sadly didnt find react dev tools')
  }
}

// execute the install hook in web page context
const script = document.createElement('script');
script.textContent = `;(${installHook.toString()})();`;
document.documentElement.appendChild(script);