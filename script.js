document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("nav ul li button");
    const sections = Array.from(document.querySelectorAll("section[id]")).filter(section =>
        Array.from(buttons).some(btn => btn.getAttribute("data-target") === section.getAttribute("id"))
    );

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

    function setActiveButton(activeButton) {
        buttons.forEach(button => button.classList.remove("active"));
        if (activeButton) activeButton.classList.add("active");
    }

    // Scroll spy: pick whichever tracked section's center is closest to viewport center
    function updateActiveSection() {
        const viewportCenter = window.innerHeight / 2;
        let closestSection = null;
        let closestDistance = Infinity;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionCenter = rect.top + rect.height / 2;
            const distance = Math.abs(sectionCenter - viewportCenter);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestSection = section;
            }
        });

        if (!closestSection) return;
        const currentId = closestSection.getAttribute("id");
        const matchingButton = Array.from(buttons).find(
            button => button.getAttribute("data-target") === currentId
        );
        setActiveButton(matchingButton);
    }

    window.addEventListener("scroll", updateActiveSection);
    window.addEventListener("resize", updateActiveSection);
    updateActiveSection(); // run once on load so the icon is correct immediately

    // Auto-scroll to resume section after welcome animation
    setTimeout(() => {
        const resumeSection = document.getElementById("resume");
        if (!resumeSection) return;
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