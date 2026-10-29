document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        const answerDiv = item.querySelector('.faq-answer');

        questionButton.addEventListener('click', () => {
            // Isara muna ang ibang nakabukas (optional, para isa lang ang bukas bawat oras)
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // I-toggle ang kasalukuyang kinlik
            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                answerDiv.style.maxHeight = answerDiv.scrollHeight + 'px';
            } else {
                answerDiv.style.maxHeight = null;
            }
        });
    });
});

// Function para buksan ang Prayer Modal
function openPrayerModal(eventName = '') {
    const modal = document.getElementById('prayerModal');
    const title = document.getElementById('modalTitle');

    if (eventName) {
        title.innerText = 'Register for ' + eventName;
    } else {
        title.innerText = 'Prayer Request & Connect';
    }

    modal.style.display = 'flex';
}

// Function para isara ang Modal
function closePrayerModal() {
    const modal = document.getElementById('prayerModal');
    modal.style.display = 'none';

    // Reset Form at Success screen
    document.getElementById('prayerForm').style.display = 'block';
    document.getElementById('modalSuccess').style.display = 'none';
    document.getElementById('prayerForm').reset();
}

// Function para sa Form Submission
function handlePrayerSubmit(event) {
    event.preventDefault();

    // Itago ang form at ipakita ang success confirmation
    document.getElementById('prayerForm').style.display = 'none';
    document.getElementById('modalSuccess').style.display = 'block';
}
document.addEventListener("DOMContentLoaded", function () {
    const music = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicToggleBtn");

    if (!music) return;

    // 1. Kunin ang huling oras at play state mula sa localStorage
    const savedTime = localStorage.getItem("musicTime");
    const isPlaying = localStorage.getItem("musicPlaying") === "true";

    // 2. I-set agad sa huling segundo ang kanta kapag handa na ang audio
    function setSavedTime() {
        if (savedTime && !isNaN(savedTime)) {
            music.currentTime = parseFloat(savedTime);
        }
    }

    if (music.readyState >= 1) {
        setSavedTime();
    } else {
        music.addEventListener("loadedmetadata", setSavedTime);
    }

    // 3. Kung nag-play ito dati bago lumipat ng page, subukang i-resume
    if (isPlaying) {
        music.play().then(() => {
            if (musicBtn) musicBtn.innerText = "⏸ Pause Music";
        }).catch(error => {
            // Kung hinarangan ng browser, hayaan lang; hihintayin ang click ng user sa button
            if (musicBtn) musicBtn.innerText = "🎵 Play Music";
            localStorage.setItem("musicPlaying", "false");
        });
    }

    // 4. Patuloy na i-save ang kasalukuyang segundo habang tumutugtog
    music.addEventListener("timeupdate", function () {
        if (!music.paused) {
            localStorage.setItem("musicTime", music.currentTime);
        }
    });
});

// Function para sa Play/Pause button
function toggleMusic() {
    const music = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicToggleBtn");

    if (music.paused) {
        // Sisiguraduhing nandoon pa rin sa huling oras bago mag-play
        const savedTime = localStorage.getItem("musicTime");
        if (savedTime && !isNaN(savedTime)) {
            music.currentTime = parseFloat(savedTime);
        }

        music.play();
        localStorage.setItem("musicPlaying", "true");
        if (musicBtn) musicBtn.innerText = "⏸ Pause Music";
    } else {
        music.pause();
        localStorage.setItem("musicPlaying", "false");
        if (musicBtn) musicBtn.innerText = "🎵 Play Music";
    }
}

// TESTIMONIAL CAROUSEL SLIDER LOGIC
let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.testimonial-card');
    if (slides.length === 0) return;

    slides[currentSlide].classList.remove('active');

    currentSlide += direction;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    slides[currentSlide].classList.add('active');
}


// READ FULL STORY MODAL LOGIC
function openStoryModal(title, author, content) {
    const modal = document.getElementById('readStoryModal');

    document.getElementById('modalStoryTitle').innerText = title;
    document.getElementById('modalStoryAuthor').innerText = ' ' + author;
    document.getElementById('modalStoryContent').innerText = content;

    // Alisin muna natin ang style.display = 'flex' kung nakatago ito sa CSS gamit ang opacity/visibility
    modal.classList.add('active');
}

function closeReadStoryModal() {
    const modal = document.getElementById('readStoryModal');
    modal.classList.remove('active');
}
// SHARE YOUR STORY MODAL LOGIC
function openShareStoryModal() {
    document.getElementById('shareStoryModal').style.display = 'flex';
}

function closeShareStoryModal() {
    document.getElementById('shareStoryModal').style.display = 'none';
    document.getElementById('shareStoryForm').style.display = 'block';
    document.getElementById('shareStorySuccess').style.display = 'none';
    document.getElementById('shareStoryForm').reset();
}

function handleShareStorySubmit(event) {
    event.preventDefault();
    document.getElementById('shareStoryForm').style.display = 'none';
    document.getElementById('shareStorySuccess').style.display = 'block';
}


function openModal(imgSrc, title, desc) {
    document.getElementById('modalImg').src = imgSrc;
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDesc').innerText = desc;
    document.getElementById('eventModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('eventModal').style.display = 'none';
}

function closeModalOnOutside(event) {
    const modal = document.getElementById('eventModal');
    if (event.target === modal) {
        closeModal();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('teamModal');
    const modalImg = document.getElementById('modalImg');
    const modalName = document.getElementById('modalName');
    const modalRole = document.getElementById('modalRole');
    const modalDesc = document.getElementById('modalDesc');
    const closeBtn = document.getElementById('modalCloseBtn');
    const cards = document.querySelectorAll('.team-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('.team-img');
            const name = card.querySelector('.team-info h3');
            const role = card.querySelector('.team-info span');
            const desc = card.querySelector('.team-info p');

            if (img) modalImg.src = img.src;
            if (name) modalName.textContent = name.textContent;
            if (role) modalRole.textContent = role.textContent;
            if (desc) modalDesc.textContent = desc.textContent;
            modal.classList.add('active')
        });
    });

    // Isara ang modal nang may animation
 const closeModal = () => {
    modal.classList.remove('active'); // Diretsong mag-a-animate pabalik (fade-out)
};
    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Pindutin ang 'Escape' key para magsara
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('eventSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Naka-target na ngayon sa eksaktong class na gamit mo (.card)
    const eventCards = document.querySelectorAll('.gallery .card');

    let currentFilter = 'all';
    let searchQuery = '';

    function filterEvents() {
        eventCards.forEach(card => {
            // Kinukuha ang buong text sa loob ng card para mag-match sa search query
            const textContent = card.innerText ? card.innerText.toLowerCase() : '';
            const category = card.getAttribute('data-category') || 'all';

            const matchesSearch = textContent.includes(searchQuery);
            const matchesCategory = (currentFilter === 'all') || (category === currentFilter);

            if (matchesSearch && matchesCategory) {
                card.style.display = ""; // Ipakita
            } else {
                card.style.display = "none"; // Itago
            }
        });
    }

    // Live Search Input Listener
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            filterEvents();
        });
    }
});
// Function para buksan ang larawan nang malaki sa mismong screen
window.viewFullImage = function () {
    const modalImg = document.getElementById('modalImg');
    const zoomModal = document.getElementById('imgZoomModal');
    const zoomedImg = document.getElementById('zoomedImg');

    if (modalImg && modalImg.src) {
        zoomedImg.src = modalImg.src;
        zoomModal.style.display = 'flex';
    }
};

window.closeImgZoom = function () {
    const zoomModal = document.getElementById('imgZoomModal');
    if (zoomModal) {
        zoomModal.style.display = 'none';
    }
};

// Pagtatagpo sa custom button gamit ang ID nito[cite: 2]
  // Pagtatagpo sa custom button gamit ang ID nito
const subscribeBtn = document.getElementById("subscribeBtn");

if (subscribeBtn) {
  subscribeBtn.addEventListener("click", async function () {
    // Check if the user is already opted in to push notifications
    const isOptedIn = OneSignal.User.PushSubscription.optedIn;

    if (isOptedIn) {
      // If already subscribed, opt the user out
      await OneSignal.User.PushSubscription.optOut();
      alert("You have opted out of notification alerts.");
    } else {
      // If not yet subscribed, request permission and opt-in
      await OneSignal.Notifications.requestPermission();
      await OneSignal.User.PushSubscription.optIn();
    }
  });
}