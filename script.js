document.addEventListener("DOMContentLoaded", () => {
            const buttons = document.querySelectorAll("nav ul li button");
            const sections = document.querySelectorAll("section");
           
            // Smooth scrolling and active button management
            buttons.forEach(button => {
                button.addEventListener("click", () => {
                    const targetId = button.getAttribute("data-target");
                    const targetSection = document.getElementById(targetId);
                    targetSection.scrollIntoView({ behavior: "smooth" });
                    setActiveButton(button);
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
            }, 3000);

            // Parallax effect for floating elements
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const floatingElements = document.querySelectorAll('.floating-element');
                
                floatingElements.forEach((element, index) => {
                    const speed = (index + 1) * 0.5;
                    element.style.transform = `translateY(${scrolled * speed}px)`;
                });
            });
        });
        document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector("footer");
    const header = document.querySelector("header");
  
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
  


  document.addEventListener("DOMContentLoaded", () => {
    const projects = document.querySelectorAll(".project");
    const buttons = document.querySelectorAll(".voirDetailsbtn");
  
    // Add click event listener to each project and its button
    projects.forEach((project) => {
      project.addEventListener("click", () => toggleProject(project));
    });
  
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent bubbling up to the parent
        const project = button.closest(".project");
        toggleProject(project);
      });
    });
  
    function toggleProject(project) {
      project.classList.toggle("expanded");
    }
  });


  // resume animation :
  

  document.addEventListener("DOMContentLoaded", () => {
    const profilePhoto = document.querySelector('.profilePhoto');
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio > 0.3) { 
          profilePhoto.classList.add('visible');
        } else {
          profilePhoto.classList.remove('visible'); 
        }
      },
      {
        threshold: [0.3], 
      }
    );
  
    observer.observe(profilePhoto);
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const resumeInfo = document.querySelector('.resumeInfo');

    const observer = new IntersectionObserver(
        ([entry]) => {
            console.log(entry); // Log entry details to debug
            if (entry.isIntersecting) {
                console.log('Resume info is in view!');
                resumeInfo.classList.add('visible');
            } else {
                console.log('Resume info is out of view!');
                resumeInfo.classList.remove('visible');
            }
        },
        {
            root: null, 
            threshold: 0.3, 
            rootMargin: "0px 0px 0px 0px", 
        }
    );

    observer.observe(resumeInfo);
});

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
        {
            root: null,
            threshold: 0.3,  
        }
    );

    
    formationLinks.forEach(link => {
        observer.observe(link);
    });

    
    
});
function toggleInterest(card) {
  card.classList.toggle("active");
}