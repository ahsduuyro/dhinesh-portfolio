const roles = [
    "Associate Team Lead",
    "Front-End Developer",
    "Application Support Engineer",
    "Problem Solver",
    "Tech Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;
let currentRole = "";
let isDeleting = false;

const typingElement = document.getElementById("typing");

function typeEffect() {

    currentRole = roles[roleIndex];

    if(!isDeleting){
        typingElement.textContent =
        currentRole.substring(0,charIndex+1);

        charIndex++;

        if(charIndex === currentRole.length){
            isDeleting = true;
            setTimeout(typeEffect,1500);
            return;
        }
    }
    else{
        typingElement.textContent =
        currentRole.substring(0,charIndex-1);

        charIndex--;

        if(charIndex === 0){
            isDeleting = false;
            roleIndex++;

            if(roleIndex === roles.length){
                roleIndex = 0;
            }
        }
    }

    setTimeout(typeEffect,
        isDeleting ? 50 : 100);
}

typeEffect();