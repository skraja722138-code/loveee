
// ==================== START SCREEN ==================== //
const startBtn = document.getElementById("startBtn");
const startScreen = document.querySelector(".start-screen");
const mainContent = document.querySelector(".main-content");
const music = document.getElementById("bgMusic");
const particlesContainer = document.querySelector(".particles");
const dotsContainer = document.getElementById("dots");
const confettiContainer = document.getElementById("confetti-container");

let hasStarted = false;

// Music will play when user clicks start button

startBtn.addEventListener("click", function() {
    if (hasStarted) return;
    hasStarted = true;
    
    // Play music when user interacts
    if (music) {
        music.volume = 0.3;
        music.play().catch(() => {
            console.log("Music autoplay blocked - will play on user interaction");
        });
    }
    
    startScreen.style.animation = "fadeOutStart 0.8s ease-out forwards";
    
    setTimeout(() => {
        startScreen.classList.add("hidden");
        mainContent.classList.remove("hidden");
        
        typeWriter();
        createConfetti();
        createParticles();
    }, 800);
});

const style = document.createElement("style");
style.textContent = `
    @keyframes fadeOutStart {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.95); }
    }
`;
document.head.appendChild(style);

// ==================== TYPEWRITER EFFECT ==================== //
const text = "Happy Birthday KOLIJAR TUKRA 🎉❤️";
let index = 0;

function typeWriter() {
    const typeText = document.getElementById("typeText");
    if (index < text.length) {
        typeText.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}

// ==================== IMAGE SLIDESHOW ==================== //
const slideshow = document.getElementById("slideshow");
const imageFiles = [
    "IMG_20250621_100447_204 - Copy.jpg",
    "IMG_20251010_133102_425.jpg",
    "IMG_20251010_133108_276.jpg",
    "IMG_20251010_133119_010.jpg",
    "IMG_20251129_014152_019 - Copy.webp",
    "Screenshot_2025-06-29-08-59-44-13_1c337646f29875672b5a61192b9010f9.jpg",
    "Vmake1749905775437 - Copy.png",
    "Vmake1752427978704.png",
    "WhatsApp Image 2026-02-25 at 10.01.50 PM.jpeg",
    "WhatsApp Image 2026-02-25 at 10.01.50 PMp.jpeg",
    "WhatsApp Image 2026-02-25 at 10.01.51 PMr - Copy.jpeg",
    "WhatsApp Image 2026-02-25 at 10.01.51 PMrr - Copy.jpeg",
    "WhatsApp Image 2026-02-26 at 2.06.23 AM.jpeg"
];
let images = [];
let currentImageIndex = 0;
const animationTypes = [
    'smoothZoom',
    'slideZoomInLoop',
    'kenburnsLoop',
    'panLeftLoop',
    'panRightLoop',
    'breatheLoop',
    'tiltRotateLoop',
    'brightnessShiftLoop',
    'slideUpLoop'
];
let imageAnimations = {};

// Assign random animations to each image
for (let i = 0; i < imageFiles.length; i++) {
    imageAnimations[i] = animationTypes[Math.floor(Math.random() * animationTypes.length)];
}

// Create images
for (let i = 0; i < imageFiles.length; i++) {
    const img = document.createElement("img");
    img.src = `images/${imageFiles[i]}`;
    img.alt = `Birthday Photo ${i + 1}`;
    img.loading = "lazy";
    if (i === 0) img.classList.add("active");
    slideshow.appendChild(img);
    images.push(img);
    
    // Create dot
    const dot = document.createElement("div");
    dot.className = "dot";
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToImage(i));
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".dot");

// Next and previous buttons
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateGallery();
    });
}

if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        nextImage();
    });
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateGallery();
}

function goToImage(index) {
    currentImageIndex = index;
    updateGallery();
}

function updateGallery() {
    images.forEach((img, idx) => {
        img.classList.remove("active");
        img.style.animation = 'none';
    });
    dots.forEach(dot => dot.classList.remove("active"));
    
    const activeImg = images[currentImageIndex];
    activeImg.classList.add("active");
    
    // Apply the animation infinitely
    const animationName = imageAnimations[currentImageIndex];
    activeImg.style.animation = `${animationName} 5s ease-in-out infinite`;
    
    dots[currentImageIndex].classList.add("active");
}

// Auto-rotate images every 6 seconds
setInterval(nextImage, 5000); // Increased to 5s for smooth entrance + exit overlap

// Keyboard navigation
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        nextImage();
    } else if (e.key === "ArrowLeft") {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateGallery();
    }
});

// ==================== PARTICLE EFFECT ==================== //
function createParticles() {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        
        const size = Math.random() * 5 + 3;
        particle.style.width = size + "px";
        particle.style.height = size + "px";
        
        const xPos = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = Math.random() * 10 + 15;
        
        particle.style.left = xPos + "%";
        particle.style.bottom = "-10px";
        particle.style.animationDuration = duration + "s";
        particle.style.animationDelay = delay + "s";
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => particle.remove(), (duration + delay) * 1000);
    }
    
    if (hasStarted && !mainContent.classList.contains("hidden")) {
        setTimeout(createParticles, 2000);
    }
}

// ==================== CONFETTI EFFECT ==================== //
function createConfetti() {
    const colors = ["#f5576c", "#f093fb", "#4facfe", "#00f2fe", "#667eea"];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        
        const left = Math.random() * 100;
        const delay = Math.random() * 0.5;
        const duration = Math.random() * 2 + 2.5;
        const rotate = Math.random() * 360;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.left = left + "%";
        confetti.style.top = "-20px";
        confetti.style.background = color;
        confetti.style.animationDelay = delay + "s";
        confetti.style.animationDuration = duration + "s";
        confetti.style.transform = `rotateZ(${rotate}deg)`;
        
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), (duration + delay) * 1000);
    }
}

// ==================== TOUCH INTERACTIONS ==================== //
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchStartX - touchEndX > 50) {
        nextImage();
    } else if (touchEndX - touchStartX > 50) {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateGallery();
    }
}

// ==================== MOUSE FOLLOW EFFECT ==================== //
document.addEventListener("mousemove", (e) => {
    const blobs = document.querySelectorAll(".blob");
    blobs.forEach((blob, index) => {
        const speed = 20 + index * 10;
        blob.style.transform = `translate(${e.clientX / speed}px, ${e.clientY / speed}px)`;
    });
});

// ==================== DOUBLE-CLICK CONFETTI ==================== //
document.addEventListener("dblclick", (e) => {
    if (hasStarted && !mainContent.classList.contains("hidden")) {
        createExtraConfetti(e.clientX, e.clientY);
    }
});

function createExtraConfetti(x, y) {
    const colors = ["#f5576c", "#f093fb", "#4facfe", "#00f2fe", "#667eea"];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        
        const angle = (Math.PI * 2 * i) / 30;
        const velocity = Math.random() * 5 + 5;
        const offsetX = Math.cos(angle) * velocity;
        const offsetY = Math.sin(angle) * velocity;
        
        const duration = Math.random() * 2 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.left = x + "px";
        confetti.style.top = y + "px";
        confetti.style.background = color;
        confetti.style.animationDuration = duration + "s";
        confetti.style.setProperty('--offsetX', offsetX + "px");
        confetti.style.setProperty('--offsetY', offsetY + "px");
        confetti.style.animation = `confettiBurst ${duration}s linear forwards`;
        
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), duration * 1000);
    }
}

const burstStyle = document.createElement("style");
burstStyle.textContent = `
    @keyframes confettiBurst {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--offsetX), var(--offsetY)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(burstStyle);
