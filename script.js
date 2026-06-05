/* --- 1. TYPEWRITER EFFECT --- */
const words = ["Frontend Developer", "Problem Solver", "Tech Enthusiast"];
let i = 0, timer;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            document.getElementById('typewriter').innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000);
            return false;
        }
        timer = setTimeout(loopTyping, 100);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            document.getElementById('typewriter').innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) i++;
            else i = 0;
            setTimeout(typingEffect, 500);
            return false;
        }
        timer = setTimeout(loopDeleting, 50);
    };
    loopDeleting();
}
// Start typewriter on load
typingEffect();


/* --- 2. RESUME POPUP MODAL --- */
const modal = document.getElementById('resume-modal');
const openBtn = document.getElementById('open-resume');
const closeBtn = document.getElementById('close-resume');

openBtn.addEventListener('click', () => modal.classList.add('active'));
closeBtn.addEventListener('click', () => modal.classList.remove('active'));
window.addEventListener('click', (e) => { 
    if (e.target === modal) modal.classList.remove('active'); 
});


/* --- 3. ANIMATED PARTICLES BACKGROUND --- */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 230, 255, 0.5)';
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 70; i++) particles.push(new Particle());
}
initParticles();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    // Draw connecting paths between adjacent points
    for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
            let dist = Math.hypot(particles[a].x - particles[b].x, particles[a].y - particles[b].y);
            if (dist < 100) {
                ctx.strokeStyle = `rgba(0, 230, 255, ${1 - dist/100 * 0.25})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}
animate();


/* --- 4. SCROLL WATCHER (ACTIVE LINK & SKILLS) --- */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const skillBars = document.querySelectorAll('.bar');

window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });

    // Fire bar expansion when user lands on skills view
    if (current === 'skills') {
        skillBars.forEach(bar => {
            bar.style.width = bar.getAttribute('data-progress');
        });
    }
});

/* --- 5. FORMSPREE CONTACT FORM HANDLING --- */
const form = document.getElementById('contact-form');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Stop the page from redirecting
    
    const data = new FormData(form);
    const btn = form.querySelector('.btn');
    const originalText = btn.innerHTML;
    
    // Change button state to let user know it's working
    btn.innerHTML = "Sending...";
    btn.disabled = true;

    fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert("Message sent successfully! I will get back to you soon.");
            form.reset(); // Clear the inputs
        } else {
            alert("Oops! There was a problem submitting your form. Please try again.");
        }
    }).catch(error => {
        alert("Form submission failed. Please check your internet connection.");
    }).then(() => {
        // Reset the button back to normal
        btn.innerHTML = originalText;
        btn.disabled = false;
    });
});