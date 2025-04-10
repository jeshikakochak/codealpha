
const books = [
    { id: 1, title: "The Alchemist", author: "Paulo Coelho", category: "Fiction" },
    { id: 2, title: "Clean Code", author: "Robert C. Martin", category: "Programming" },
    { id: 3, title: "Sapiens", author: "Yuval Noah Harari", category: "History" },
  ];
  
  let history = [];
  let currentTab = 'All';
  
  document.getElementById('search').addEventListener('input', renderBooks);
  
  function renderBooks() {
    const search = document.getElementById('search').value.toLowerCase();
    const container = document.getElementById('books');
    container.innerHTML = '';
  
    const filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(search) || book.author.toLowerCase().includes(search);
      const matchesTab = currentTab === 'All' || book.category === currentTab;
      return matchesSearch && matchesTab;
    });
  
    filtered.forEach(book => {
      const card = document.createElement('div');
      card.className = 'book-card';
      card.innerHTML = `
        <h3>${book.title}</h3>
        <p><em>by ${book.author}</em></p>
        <p>Category: ${book.category}</p>
        <button onclick='borrowBook(${book.id})'>Borrow</button>
      `;
      container.appendChild(card);
    });
  }
  
  function showTab(tab) {
    currentTab = tab;
    document.getElementById('borrow-history').style.display = tab === 'HistoryTab' ? 'block' : 'none';
    renderBooks();
  }
  
  function borrowBook(id) {
    const book = books.find(b => b.id === id);
    history.push({ ...book, borrowedAt: new Date().toLocaleString() });
    updateHistory();
    alert(`You borrowed: ${book.title}`);
  }
  
  function updateHistory() {
    const list = document.getElementById('history-list');
    list.innerHTML = '';
    history.forEach(entry => {
      const li = document.createElement('li');
      li.textContent = `${entry.title} (Borrowed at: ${entry.borrowedAt})`;
      list.appendChild(li);
    });
  }
  
  renderBooks();
  