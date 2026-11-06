
/* ==========================================
   OBSTETRICKS — INTERACTIVE JAVASCRIPT
   Author: Tope Omotoyinbo
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {

    // ======================================
    // 1. PRELOADER
    // ======================================

    const preloader = document.getElementById("preloader");

    function hidePreloader() {
        if (preloader) {
            preloader.classList.add("hide");
        }
    }

    window.addEventListener("load", hidePreloader);

    // Fallback in case the load event takes too long.
    setTimeout(hidePreloader, 2500);


    // ======================================
    // 2. MOBILE NAVIGATION
    // ======================================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        function closeMenu() {
            navLinks.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }

        menuToggle.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });

        // Close menu after clicking a navigation link.

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", closeMenu);

        });

        // Close menu with Escape.

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

        // Close menu when clicking outside.

        document.addEventListener("click", function (event) {

            if (
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }

        });

    }


    // ======================================
    // 3. STICKY HEADER EFFECT
    // ======================================

    const header = document.getElementById("header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    // ======================================
    // 4. SCROLL REVEAL ANIMATIONS
    // ======================================

    const revealElements = document.querySelectorAll(".reveal");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {

        revealElements.forEach(element => {
            element.classList.add("active");
        });

    } else {

        const revealObserver = new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }

        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    }


    // ======================================
    // 5. INTERACTIVE QUIZ
    // ======================================

    const quizOptions = document.querySelectorAll(".quiz-option");

    const quizFeedback = document.getElementById("quizFeedback");

    const quizReset = document.getElementById("quizReset");

    const correctMessage =
        "Excellent! 🎉 Femur is not one of the bones of the bony pelvis.";

    const wrongMessage =
        "Not quite! The correct answer is Femur. Keep learning!";

    function handleQuizAnswer(selectedOption) {

        // Prevent multiple selections.

        if (selectedOption.disabled) return;

        // Disable all options after an answer.

        quizOptions.forEach(option => {

            option.disabled = true;

            if (option.dataset.answer === "correct") {
                option.classList.add("correct");
            }

        });

        const isCorrect =
            selectedOption.dataset.answer === "correct";

        if (isCorrect) {

            quizFeedback.textContent = correctMessage;

            quizFeedback.style.color = "#39834c";

        } else {

            selectedOption.classList.add("wrong");

            quizFeedback.textContent = wrongMessage;

            quizFeedback.style.color = "#b54b3d";

        }

    }


    quizOptions.forEach(option => {

        option.addEventListener("click", function () {

            handleQuizAnswer(this);

        });

    });


    // ======================================
    // 6. QUIZ RESET
    // ======================================

    if (quizReset) {

        quizReset.addEventListener("click", function () {

            quizOptions.forEach(option => {

                option.disabled = false;

                option.classList.remove("correct", "wrong");

            });

            if (quizFeedback) {

                quizFeedback.textContent =
                    "Choose your answer above.";

                quizFeedback.style.color = "";

            }

        });

    }


    // ======================================
    // 7. BACK TO TOP BUTTON
    // ======================================

    const backToTop = document.getElementById("backToTop");

    function updateBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 450) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }

    window.addEventListener("scroll", updateBackToTop, {
        passive: true
    });

    updateBackToTop();

    if (backToTop) {

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? "auto" : "smooth"
            });

        });

    }


    // ======================================
    // 8. AUTOMATIC COPYRIGHT YEAR
    // ======================================

    const yearElement = document.getElementById("year");

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }


    // ======================================
    // 9. NAVIGATION ACTIVE SECTION
    // ======================================

    const sections = document.querySelectorAll("main section[id]");

    const navigationLinks = document.querySelectorAll(
        ".nav-links a[href^='#']"
    );

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(

            function (entries) {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const currentId = entry.target.id;

                        navigationLinks.forEach(link => {

                            link.classList.remove("active-link");

                            if (
                                link.getAttribute("href") ===
                                "#" + currentId
                            ) {

                                link.classList.add("active-link");

                            }

                        });

                    }

                });

            },

            {
                rootMargin: "-25% 0px -65% 0px"
            }

        );

        sections.forEach(section => {

            sectionObserver.observe(section);

        });

    }


    // ======================================
    // 10. CONSOLE BRANDING
    // ======================================

    console.log(
        "%c OBSTETRICKS ",
        "background:#102c24;color:#a3c76b;font-size:20px;font-weight:bold;padding:10px;"
    );

    console.log(
        "Making Obstetrics and Gynaecology easier to remember."
    );

});
