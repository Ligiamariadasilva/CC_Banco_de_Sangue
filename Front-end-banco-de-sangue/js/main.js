// Main page functionality
document.addEventListener("DOMContentLoaded", () => {
  // Initialize page
  initializePage()

  // Add event listeners
  addEventListeners()
})

function initializePage() {
  // Add any initialization logic here
  console.log("Blood donation system initialized")

  // Animate hero section on load
  animateHeroSection()

  // Initialize intersection observer for animations
  initializeScrollAnimations()
}

function addEventListeners() {
  // "Saiba Mais" button functionality
  const saibaMaisBtn = document.querySelector(".btn-outline")
  if (saibaMaisBtn) {
    saibaMaisBtn.addEventListener("click", (e) => {
      e.preventDefault()
      scrollToSection(".benefits-section")
    })
  }

  // Add hover effects to benefit cards
  const benefitCards = document.querySelectorAll(".benefit-card")
  benefitCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })
}

function animateHeroSection() {
  const heroContent = document.querySelector(".hero-content")
  if (heroContent) {
    heroContent.style.opacity = "0"
    heroContent.style.transform = "translateY(30px)"

    setTimeout(() => {
      heroContent.style.transition = "all 0.8s ease-out"
      heroContent.style.opacity = "1"
      heroContent.style.transform = "translateY(0)"
    }, 100)
  }
}

function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe benefit cards
  const benefitCards = document.querySelectorAll(".benefit-card")
  benefitCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `all 0.6s ease-out ${index * 0.1}s`
    observer.observe(card)
  })

  // Observe info sections
  const infoSections = document.querySelectorAll(".info-content, .blood-types-card")
  infoSections.forEach((section, index) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(30px)"
    section.style.transition = `all 0.6s ease-out ${index * 0.2}s`
    observer.observe(section)
  })
}

function scrollToSection(selector) {
  const element = document.querySelector(selector)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Blood type information functionality
function showBloodTypeInfo(bloodType) {
  const info = {
    "A+": "Pode doar para: A+ e AB+. Pode receber de: A+, A-, O+ e O-",
    "A-": "Pode doar para: A+, A-, AB+ e AB-. Pode receber de: A- e O-",
    "B+": "Pode doar para: B+ e AB+. Pode receber de: B+, B-, O+ e O-",
    "B-": "Pode doar para: B+, B-, AB+ e AB-. Pode receber de: B- e O-",
    "AB+": "Pode doar para: AB+. Pode receber de: todos os tipos (receptor universal)",
    "AB-": "Pode doar para: AB+ e AB-. Pode receber de: A-, B-, AB- e O-",
    "O+": "Pode doar para: A+, B+, AB+ e O+. Pode receber de: O+ e O-",
    "O-": "Pode doar para: todos os tipos (doador universal). Pode receber de: O-",
  }

  alert(`Tipo Sanguíneo ${bloodType}:\n${info[bloodType]}`)
}

// Add click events to blood type elements
document.addEventListener("DOMContentLoaded", () => {
  const bloodTypes = document.querySelectorAll(".blood-type")
  bloodTypes.forEach((type) => {
    type.style.cursor = "pointer"
    type.addEventListener("click", function () {
      showBloodTypeInfo(this.textContent)
    })
  })
})

// Utility functions
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("pt-BR")
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validatePhone(phone) {
  const re = /^$$\d{2}$$\s\d{4,5}-\d{4}$/
  return re.test(phone)
}

function formatPhone(phone) {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, "")

  // Format as (XX) XXXXX-XXXX or (XX) XXXX-XXXX
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  } else if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }

  return phone
}
