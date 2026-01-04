// GET ELEMENTS
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const menuIcon = menuToggle.querySelector("i");

  // ADD CLICK EVENT
  menuToggle.addEventListener("click", () => {
    // Toggle the active class on nav-links
    navLinks.classList.toggle("active");

    // Toggle icon: bars ↔ xmark
    if (menuIcon.classList.contains("fa-bars")) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-xmark");
    } else {
      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars");
    }
  });

  // Reset menu when resizing to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navLinks.classList.remove("active"); // hide mobile menu
    menuIcon.classList.remove("fa-xmark"); // make sure X is removed
    menuIcon.classList.add("fa-bars"); // reset to hamburger
  }
});
