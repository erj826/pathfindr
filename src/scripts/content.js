setTimeout(() => {
  if(!!window.React ||
    !!document.querySelector('[data-reactroot], [data-reactid]'))
   console.log('React.js');
}, 5000);