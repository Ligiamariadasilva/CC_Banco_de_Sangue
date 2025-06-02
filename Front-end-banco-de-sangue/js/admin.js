// Admin panel functionality
let donors = []
let editingDonorId = null
let isAuthenticated = false

document.addEventListener("DOMContentLoaded", () => {
  initializeAdmin()
})

function initializeAdmin() {
  // Check if already authenticated (simple session simulation)
  const sessionAuth = sessionStorage.getItem("adminAuth")
  if (sessionAuth === "true") {
    isAuthenticated = true
    showDashboard()
    loadDonors()
  } else {
    showLogin()
  }

  // Add event listeners
  addAdminEventListeners()
}

function addAdminEventListeners() {
  // Login form
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  // Logout button
  const logoutBtn = document.getElementById("logoutBtn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout)
  }

  // New donor button
  const newDonorBtn = document.getElementById("newDonorBtn")
  if (newDonorBtn) {
    newDonorBtn.addEventListener("click", openNewDonorModal)
  }

  // Modal close buttons
  const closeModal = document.getElementById("closeModal")
  const cancelBtn = document.getElementById("cancelBtn")
  const modalOverlay = document.querySelector(".modal-overlay")

  if (closeModal) closeModal.addEventListener("click", closeDonorModal)
  if (cancelBtn) cancelBtn.addEventListener("click", closeDonorModal)
  if (modalOverlay) modalOverlay.addEventListener("click", closeDonorModal)

  // Donor form
  const donorForm = document.getElementById("donorForm")
  if (donorForm) {
    donorForm.addEventListener("submit", handleDonorSubmit)
  }

  // Phone formatting
  const phoneInput = document.getElementById("donorPhone")
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      e.target.value = formatPhone(e.target.value)
    })
  }
}

function handleLogin(e) {
  e.preventDefault()

  const username = document.getElementById("username").value.trim()
  const password = document.getElementById("password").value.trim()
  const loginBtn = document.getElementById("loginBtn")
  const loginError = document.getElementById("loginError")

  // Hide previous errors
  loginError.style.display = "none"

  // Validate inputs
  if (!username || !password) {
    showLoginError("Por favor, preencha todos os campos.")
    return
  }

  // Show loading state
  loginBtn.textContent = "Entrando..."
  loginBtn.disabled = true
  loginBtn.classList.add("loading")

  // Simulate API call
  setTimeout(() => {
    if (username === "master" && password === "1234") {
      // Successful login
      isAuthenticated = true
      sessionStorage.setItem("adminAuth", "true")

      // Clear form
      document.getElementById("loginForm").reset()

      // Show dashboard
      showDashboard()
      loadDonors()

      console.log("Login successful")
    } else {
      // Failed login
      showLoginError("Usuário ou senha incorretos")
      console.log("Login failed")
    }

    // Reset button state
    loginBtn.textContent = "Entrar"
    loginBtn.disabled = false
    loginBtn.classList.remove("loading")
  }, 1000)
}

function showLoginError(message) {
  const loginError = document.getElementById("loginError")
  const errorMessage = loginError.querySelector(".alert-message")

  if (errorMessage) {
    errorMessage.textContent = message
  } else {
    loginError.innerHTML = `
      <i class="fas fa-exclamation-triangle alert-icon"></i>
      <span class="alert-message">${message}</span>
    `
  }

  loginError.style.display = "block"
}

function handleLogout() {
  if (confirm("Tem certeza que deseja sair?")) {
    isAuthenticated = false
    sessionStorage.removeItem("adminAuth")
    donors = []
    editingDonorId = null

    // Clear any messages
    const messageEl = document.getElementById("message")
    if (messageEl) {
      messageEl.style.display = "none"
    }

    showLogin()

    // Clear and reset login form
    const loginForm = document.getElementById("loginForm")
    if (loginForm) {
      loginForm.reset()
    }

    const loginError = document.getElementById("loginError")
    if (loginError) {
      loginError.style.display = "none"
    }

    console.log("Logout successful")
  }
}

function showLogin() {
  const loginSection = document.getElementById("loginSection")
  const dashboardSection = document.getElementById("dashboardSection")

  if (loginSection) loginSection.style.display = "block"
  if (dashboardSection) dashboardSection.style.display = "none"

  console.log("Showing login section")
}

function showDashboard() {
  const loginSection = document.getElementById("loginSection")
  const dashboardSection = document.getElementById("dashboardSection")

  if (loginSection) loginSection.style.display = "none"
  if (dashboardSection) dashboardSection.style.display = "block"

  console.log("Showing dashboard section")
}

function loadDonors() {
  // Simulate loading donors from API
  const mockDonors = [
    {
      id: 1,
      nome: "João Silva",
      email: "joao@email.com",
      telefone: "(11) 99999-9999",
      tipoSanguineo: "O+",
      idade: 35,
      peso: 75,
      ultimaDoacao: "2024-01-15",
    },
    {
      id: 2,
      nome: "Maria Santos",
      email: "maria@email.com",
      telefone: "(11) 88888-8888",
      tipoSanguineo: "A+",
      idade: 28,
      peso: 60,
      ultimaDoacao: "2024-02-10",
    },
    {
      id: 3,
      nome: "Pedro Costa",
      email: "pedro@email.com",
      telefone: "(11) 77777-7777",
      tipoSanguineo: "B-",
      idade: 42,
      peso: 80,
      ultimaDoacao: "2024-01-28",
    },
  ]

  donors = mockDonors
  updateDonorsTable()
  updateStats()

  console.log("Donors loaded:", donors.length)
}

function updateDonorsTable() {
  const tbody = document.getElementById("donorsTableBody")
  if (!tbody) {
    console.error("Table body not found")
    return
  }

  tbody.innerHTML = ""

  donors.forEach((donor) => {
    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${donor.nome}</td>
      <td>${donor.email}</td>
      <td>${donor.telefone}</td>
      <td><span class="blood-type-badge">${donor.tipoSanguineo}</span></td>
      <td>${donor.idade}</td>
      <td>${donor.peso}kg</td>
      <td>${formatDate(donor.ultimaDoacao)}</td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-sm btn-edit" onclick="editDonor(${donor.id})">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-delete" onclick="deleteDonor(${donor.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    `
    tbody.appendChild(row)
  })

  console.log("Table updated with", donors.length, "donors")
}

function updateStats() {
  const totalDonorsEl = document.getElementById("totalDonors")
  if (totalDonorsEl) {
    totalDonorsEl.textContent = donors.length
  }
}

function openNewDonorModal() {
  editingDonorId = null
  document.getElementById("modalTitle").textContent = "Novo Doador"
  document.getElementById("submitBtnText").textContent = "Cadastrar"
  document.getElementById("donorForm").reset()
  document.getElementById("donorModal").style.display = "block"
}

function editDonor(id) {
  const donor = donors.find((d) => d.id === id)
  if (!donor) return

  editingDonorId = id
  document.getElementById("modalTitle").textContent = "Editar Doador"
  document.getElementById("submitBtnText").textContent = "Atualizar"

  // Fill form with donor data
  document.getElementById("donorName").value = donor.nome
  document.getElementById("donorEmail").value = donor.email
  document.getElementById("donorPhone").value = donor.telefone
  document.getElementById("donorBloodType").value = donor.tipoSanguineo
  document.getElementById("donorAge").value = donor.idade
  document.getElementById("donorWeight").value = donor.peso
  document.getElementById("donorLastDonation").value = donor.ultimaDoacao

  document.getElementById("donorModal").style.display = "block"
}

function deleteDonor(id) {
  if (confirm("Tem certeza que deseja excluir este doador?")) {
    donors = donors.filter((d) => d.id !== id)
    updateDonorsTable()
    updateStats()
    showMessage("Doador excluído com sucesso!", "success")
  }
}

function closeDonorModal() {
  document.getElementById("donorModal").style.display = "none"
  editingDonorId = null
  document.getElementById("donorForm").reset()
}

function handleDonorSubmit(e) {
  e.preventDefault()

  const formData = {
    nome: document.getElementById("donorName").value.trim(),
    email: document.getElementById("donorEmail").value.trim(),
    telefone: document.getElementById("donorPhone").value.trim(),
    tipoSanguineo: document.getElementById("donorBloodType").value,
    idade: Number.parseInt(document.getElementById("donorAge").value),
    peso: Number.parseFloat(document.getElementById("donorWeight").value),
    ultimaDoacao: document.getElementById("donorLastDonation").value,
  }

  // Validate form
  if (!validateDonorForm(formData)) {
    return
  }

  if (editingDonorId) {
    // Update existing donor
    const donorIndex = donors.findIndex((d) => d.id === editingDonorId)
    if (donorIndex !== -1) {
      donors[donorIndex] = { ...formData, id: editingDonorId }
      showMessage("Doador atualizado com sucesso!", "success")
    }
  } else {
    // Create new donor
    const newDonor = {
      ...formData,
      id: Date.now(), // Simple ID generation
    }
    donors.push(newDonor)
    showMessage("Doador cadastrado com sucesso!", "success")
  }

  updateDonorsTable()
  updateStats()
  closeDonorModal()
}

function validateDonorForm(data) {
  // Validate required fields
  if (!data.nome || !data.email || !data.telefone || !data.tipoSanguineo || !data.ultimaDoacao) {
    alert("Por favor, preencha todos os campos obrigatórios.")
    return false
  }

  // Validate email
  if (!validateEmail(data.email)) {
    alert("Por favor, insira um email válido.")
    return false
  }

  // Validate age
  if (isNaN(data.idade) || data.idade < 16 || data.idade > 69) {
    alert("A idade deve estar entre 16 e 69 anos.")
    return false
  }

  // Validate weight
  if (isNaN(data.peso) || data.peso < 50) {
    alert("O peso deve ser no mínimo 50kg.")
    return false
  }

  return true
}

// Utility functions
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

function formatDate(date) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" }
  return new Date(date).toLocaleDateString("pt-BR", options)
}

function showMessage(message, type) {
  const messageEl = document.getElementById("message")
  if (messageEl) {
    const alertMessage = messageEl.querySelector(".alert-message")
    if (alertMessage) {
      alertMessage.textContent = message
    } else {
      messageEl.innerHTML = `<span class="alert-message">${message}</span>`
    }

    messageEl.className = `alert alert-${type}`
    messageEl.style.display = "block"

    // Hide message after 3 seconds
    setTimeout(() => {
      messageEl.style.display = "none"
    }, 3000)
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validatePhone(phone) {
  const re = /^$$\d{2}$$ \d{4,5}-\d{4}$/
  return re.test(phone)
}

// Export functions for search and export features
function exportDonors() {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    "Nome,Email,Telefone,Tipo Sanguíneo,Idade,Peso,Última Doação\n" +
    donors
      .map((d) => `${d.nome},${d.email},${d.telefone},${d.tipoSanguineo},${d.idade},${d.peso},${d.ultimaDoacao}`)
      .join("\n")

  const encodedUri = encodeURI(csvContent)
  const link = document.createElement("a")
  link.setAttribute("href", encodedUri)
  link.setAttribute("download", "doadores.csv")
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function searchDonors(query) {
  const filteredDonors = donors.filter(
    (donor) =>
      donor.nome.toLowerCase().includes(query.toLowerCase()) ||
      donor.email.toLowerCase().includes(query.toLowerCase()) ||
      donor.tipoSanguineo.toLowerCase().includes(query.toLowerCase()),
  )

  // Update table with filtered results
  const tbody = document.getElementById("donorsTableBody")
  if (!tbody) return

  tbody.innerHTML = ""

  filteredDonors.forEach((donor) => {
    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${donor.nome}</td>
      <td>${donor.email}</td>
      <td>${donor.telefone}</td>
      <td><span class="blood-type-badge">${donor.tipoSanguineo}</span></td>
      <td>${donor.idade}</td>
      <td>${donor.peso}kg</td>
      <td>${formatDate(donor.ultimaDoacao)}</td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-sm btn-edit" onclick="editDonor(${donor.id})">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-delete" onclick="deleteDonor(${donor.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    `
    tbody.appendChild(row)
  })
}

// Make functions globally available
window.editDonor = editDonor
window.deleteDonor = deleteDonor
window.exportDonors = exportDonors
window.searchDonors = searchDonors
