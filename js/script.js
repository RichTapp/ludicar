document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 120) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

});

async function shareProject() {

    const shareData = {
        title: "LUDICAR",
        text: "Projeto sobre desenvolvimento infantil e a importância do brincar",
        url: window.location.href
    };

    try {

        if (navigator.share) {

            await navigator.share(shareData);

        } else {

            copyLink();

        }

    } catch(error){

        console.log(error);

    }

}


function copyLink() {

    const url = window.location.href;

    if(navigator.clipboard){

        navigator.clipboard.writeText(url)
        .then(() => {

            showMessage("Link copiado!");

        })
        .catch(() => {

            fallbackCopy(url);

        });

    } else {

        fallbackCopy(url);

    }

}


function fallbackCopy(text){

    const input = document.createElement("input");

    input.value = text;

    document.body.appendChild(input);

    input.select();

    document.execCommand("copy");

    document.body.removeChild(input);

    showMessage("Link copiado!");

}


function showMessage(message){

    const aviso = document.createElement("div");

    aviso.innerText = message;

    aviso.classList.add("copy-alert");

    document.body.appendChild(aviso);

    setTimeout(()=>{

        aviso.remove();

    },2000);

}


const carousel = document.querySelector('#carouselFases');

if (carousel) {
    new bootstrap.Carousel(carousel, {
        touch: true
    });
}