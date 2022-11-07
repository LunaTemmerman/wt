if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('https://lunatemmerman.ikdoeict.be/sw.js', {
      scope: 'https://lunatemmerman.ikdoeict.be/',
    })
    .then(registration => {
      console.log('SW Registered!');
      console.log(registration);
    })
    .catch(error => {
      console.log('SW Registration Failed!');
      console.log(error);
    });
} else {
  console.log('Oops... Something went wrong!');
}
