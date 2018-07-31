feather.replace();

// change nav background color to white

window.onscroll = () => {
  const nav = document.querySelector('#navbar');
  const classes = document.getElementById('navbar').className;
  if(this.scrollY <= 100) {
  	nav.className = 'site-header fixed-top py-1';
  } else {
  	nav.className = 'site-header fixed-top py-1 scroll';
  }
};