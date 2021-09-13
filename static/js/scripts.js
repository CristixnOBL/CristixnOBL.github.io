// Cambio de color nav ...............................................................

$(document).ready(function(){
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if(scroll>50){
            $('#nav').css("background","#202529")
            $('#nav').css("transition","0.9s")
        }
        else{
            $('#nav').css("background","")
        }
    })
})

//typing ............................................................................

class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if(this.isDeleting) {
        // Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 200;

        if(this.isDeleting) {
        typeSpeed /= 2;
        }

        // If word is complete
        if(!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}


// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}

// image depending of screen size
const heightOutput = document.querySelector('#height');
const widthOutput = document.querySelector('#width');

function reportWindowSize() {
    heightOutput.textContent = window.innerHeight;
    if(window.innerWidth>500){
        widthOutput.textContent = "PC " + window.innerWidth;
        $("#img_proy_1").attr("src", "static/img/proyectos/pc/xv.png");
    }
    else{
        widthOutput.textContent = "Mobile " + window.innerWidth;
        $("#img_proy_1").attr("src", "static/img/proyectos/mobile/xv.jpg");
    }
}
reportWindowSize();
window.onresize = reportWindowSize;