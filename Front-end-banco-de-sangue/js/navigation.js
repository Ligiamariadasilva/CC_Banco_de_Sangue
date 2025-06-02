// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link")
  const currentPage = window.location.pathname.split("/").pop() || "index.html"

  // Set active navigation link
  navLinks.forEach((link) => {
    link.classList.remove("active")
    const href = link.getAttribute("href")
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active")
    }
  })

  // Handle navigation clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      // If it's a same-page link, don't prevent default
      if (href.startsWith("#")) {
        return
      }

      // Add loading state
      this.style.opacity = "0.6"

      // Remove loading state after a short delay
      setTimeout(() => {
        this.style.opacity = "1"
      }, 200)
    })
  })
})

// Smooth scrolling for anchor links
function smoothScroll(target) {
  const element = document.querySelector(target)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
  const navLinks = document.querySelector(".nav-links")
  navLinks.classList.toggle("mobile-open")
}

// Utility function to show/hide elements
function toggleElement(elementId, show = null) {
  const element = document.getElementById(elementId)
  if (!element) return

  if (show === null) {
    element.style.display = element.style.display === "none" ? "block" : "none"
  } else {
    element.style.display = show ? "block" : "none"
  }
}

// Utility function to show messages
function showMessage(message, type = "success", duration = 3000) {
  const messageEl = document.getElementById("message")
  if (!messageEl) return

  messageEl.className = `alert alert-${type}`
  messageEl.querySelector(".alert-message").textContent = message
  messageEl.style.display = "block"

  setTimeout(() => {
    messageEl.style.display = "none"
  }, duration)
}
