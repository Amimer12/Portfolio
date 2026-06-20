document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("nav ul li button");
    const sections = document.querySelectorAll("section");

    // Smooth scrolling and active button management
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-target");
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
                setActiveButton(button);
            }
        });
    });

    // Scroll spy
    window.addEventListener("scroll", () => {
        let currentSection = "";

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSection = section.getAttribute("id");
            }
        });

        buttons.forEach(button => {
            button.classList.remove("active");
            if (button.getAttribute("data-target") === currentSection) {
                setActiveButton(button);
            }
        });
    });

    function setActiveButton(activeButton) {
        buttons.forEach(button => button.classList.remove("active"));
        activeButton.classList.add("active");
    }

    // Auto-scroll to resume section after welcome animation
    setTimeout(() => {
        const resumeSection = document.getElementById("resume");
        const resumeRect = resumeSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (resumeRect.top >= viewportHeight) {
            resumeSection.scrollIntoView({ behavior: "smooth" });
        }
    }, 3200);
});

// Header subtle slide near footer
document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector("footer");
    const header = document.querySelector("header");
    if (!footer || !header) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                const footerVisibility = entry.intersectionRatio;
                const slideAmount = footerVisibility * -50;
                header.style.transform = `translateY(${slideAmount}%)`;
            } else {
                header.style.transform = `translateY(0)`;
            }
        },
        {
            root: null,
            threshold: Array.from({ length: 101 }, (_, i) => i / 100),
        }
    );

    observer.observe(footer);
});

// Project expand / collapse
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".voirDetailsbtn");

    buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            const project = button.closest(".project");
            project.classList.toggle("expanded");
        });
    });
});

// Profile photo reveal
document.addEventListener("DOMContentLoaded", () => {
    const profilePhoto = document.querySelector('.profilePhoto');
    if (!profilePhoto) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.intersectionRatio > 0.3) {
                profilePhoto.classList.add('visible');
            } else {
                profilePhoto.classList.remove('visible');
            }
        },
        { threshold: [0.3] }
    );

    observer.observe(profilePhoto);
});

document.addEventListener("DOMContentLoaded", () => {
    const resumeInfo = document.querySelector('.resumeInfo');
    if (!resumeInfo) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                resumeInfo.classList.add('visible');
            } else {
                resumeInfo.classList.remove('visible');
            }
        },
        { root: null, threshold: 0.3, rootMargin: "0px 0px 0px 0px" }
    );

    observer.observe(resumeInfo);
});

// Education list reveal
document.addEventListener("DOMContentLoaded", () => {
    const formationLinks = document.querySelectorAll('.formations li');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const link = entry.target;
                if (entry.isIntersecting) {
                    link.classList.add('visible');
                } else {
                    link.classList.remove('visible');
                }
            });
        },
        { root: null, threshold: 0.3 }
    );

    formationLinks.forEach(link => observer.observe(link));
});

// Interest card expand
function toggleInterest(card) {
    card.classList.toggle("active");
}

// Language progress circles
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".languageCard").forEach(card => {
        const percent = card.dataset.percent;
        const color = card.dataset.color;
        const circle = card.querySelector(".progress-fill");
        const radius = 54;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percent / 100) * circumference;

        circle.style.stroke = color;
        circle.style.strokeDasharray = circumference;

        const cardObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setTimeout(() => { circle.style.strokeDashoffset = offset; }, 150);
                cardObserver.disconnect();
            }
        }, { threshold: 0.4 });

        cardObserver.observe(card);
    });
});

// Skill bars: animate width in on scroll into view
document.addEventListener("DOMContentLoaded", () => {
    const bars = document.querySelectorAll(".skillLevel");
    bars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = "0%";
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setTimeout(() => { bar.style.width = targetWidth; }, 100);
                obs.disconnect();
            }
        }, { threshold: 0.3 });
        obs.observe(bar);
    });
});

// Git-style commit activity heatmap (signature hero element)
document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("heatmap");
    if (!grid) return;

    const weeks = 12;
    const days = 7;
    const totalCells = weeks * days;

    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement("div");
        cell.classList.add("heatmap-cell");

        // Weighted random activity level, denser toward the most recent weeks
        const weekIndex = Math.floor(i / days);
        const recencyBoost = weekIndex / weeks;
        const roll = Math.random() + recencyBoost * 0.35;

        let level = 0;
        if (roll > 1.05) level = 4;
        else if (roll > 0.85) level = 3;
        else if (roll > 0.6) level = 2;
        else if (roll > 0.4) level = 1;

        cell.setAttribute("data-level", level);
        cell.style.opacity = "0";
        cell.style.transition = "opacity 0.4s ease";
        grid.appendChild(cell);

        setTimeout(() => { cell.style.opacity = "1"; }, 10 * i);
    }
});