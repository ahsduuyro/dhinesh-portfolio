const roles = [
"Associate Team Lead",
"Application Support Engineer",
"Microsoft 365 Administrator",
"Front-End Developer"
];

let roleIndex = 0;
let charIndex = 0;

const typingElement =
document.getElementById("typing");

function typeEffect(){

if(charIndex < roles[roleIndex].length){

typingElement.innerHTML +=
roles[roleIndex].charAt(charIndex);

charIndex++;

setTimeout(typeEffect,100);

}
else{

setTimeout(eraseEffect,1500);

}

}

function eraseEffect(){

if(charIndex > 0){

typingElement.innerHTML =
roles[roleIndex].substring(0,charIndex-1);

charIndex--;

setTimeout(eraseEffect,50);

}
else{

roleIndex++;

if(roleIndex >= roles.length){
roleIndex = 0;
}

setTimeout(typeEffect,300);

}

}

typeEffect();

particlesJS("particles-js",{

particles:{
number:{value:80},
size:{value:3},
move:{speed:2},
line_linked:{enable:true}
}

});