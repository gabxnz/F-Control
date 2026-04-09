document.addEventListener('DOMContentLoaded', () => {
    const balanceEl = document.getElementById('balance');
    const totalEarningsEl = document.getElementById('total-earnings');
    const totalExpensesEl = document.getElementById('total-expenses');

    // --- FORMS ---
    const earningsForm = document.getElementById('earnings-form');
    const earningTextInput = document.getElementById('earning-text-input');
    const earningAmountInput = document.getElementById('earning-amount-input');
    const expensesForm = document.getElementById('expenses-form');
    const expenseTextInput = document.getElementById('expense-text-input');
    const expenseAmountInput = document.getElementById('expense-amount-input');

    // --- BUTTONS ---
    const viewEarningsHistoryBtn = document.getElementById('viewEarningsHistoryBtn');
    const viewExpensesHistoryBtn = document.getElementById('viewExpensesHistoryBtn');
    
    // --- MENU ELEMENTS ---
    const openMenuBtn = document.getElementById('openMenuBtn');
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const menuCaixinhaBtn = document.getElementById('menuCaixinhaBtn');
    
    // --- MODAL ELEMENTS ---
    const caixinhaModal = document.getElementById('caixinhaModal');
    const historyModal = document.getElementById('historyModal');
    const confirmDeleteModal = document.getElementById('confirmDeleteModal');
    const editModal = document.getElementById('editModal');
    
    let itemToDelete = { type: null, index: null };
    let itemToEdit = { type: null, index: null };

    let earnings = [];
    let expenses = [];
    let savings = 0;
    let savingsHistory = [];

    // --- UTILITY & DATA FUNCTIONS ---
    const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const saveData = () => {
        localStorage.setItem('financeApp.earnings', JSON.stringify(earnings));
        localStorage.setItem('financeApp.expenses', JSON.stringify(expenses));
        localStorage.setItem('financeApp.savings', savings);
        localStorage.setItem('financeApp.savingsHistory', JSON.stringify(savingsHistory));
    };
    const loadData = () => {
        earnings = JSON.parse(localStorage.getItem('financeApp.earnings')) || [];
        expenses = JSON.parse(localStorage.getItem('financeApp.expenses')) || [];
        savings = parseFloat(localStorage.getItem('financeApp.savings')) || 0;
        savingsHistory = JSON.parse(localStorage.getItem('financeApp.savingsHistory')) || [];
    };

    // --- MODAL & MENU GENERIC FUNCTIONS ---
    const openModal = (modalEl) => {
        const modalContent = modalEl.querySelector('.modal-content');
        modalEl.classList.remove('hidden');
        setTimeout(() => {
            modalEl.classList.remove('opacity-0');
            if(modalContent) modalContent.classList.remove('scale-95', 'opacity-0');
        }, 10);
    };
    const closeModal = (modalEl) => {
        const modalContent = modalEl.querySelector('.modal-content');
        modalEl.classList.add('opacity-0');
         if(modalContent) modalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => modalEl.classList.add('hidden'), 300);
    };
     const openSideMenu = () => {
        menuOverlay.classList.remove('hidden');
        setTimeout(() => {
            sideMenu.classList.remove('-translate-x-full');
            menuOverlay.classList.remove('opacity-0');
        }, 10);
    };
    const closeSideMenu = () => {
        sideMenu.classList.add('-translate-x-full');
        menuOverlay.classList.add('opacity-0');
        setTimeout(() => menuOverlay.classList.add('hidden'), 300);
    };

    // --- RENDER FUNCTION ---
    const render = () => {
        let totalEarnings = earnings.reduce((sum, item) => sum + item.amount, 0);
        let totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
        const balance = totalEarnings - totalExpenses;
        
        balanceEl.textContent = formatCurrency(balance);
        balanceEl.classList.toggle('text-red-300', balance < 0);
        balanceEl.classList.toggle('text-white', balance >= 0);
        
        totalEarningsEl.textContent = formatCurrency(totalEarnings);
        totalExpensesEl.textContent = formatCurrency(totalExpenses);

        saveData();
    };

    // --- ADDING ITEMS ---
    earningsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = earningTextInput.value.trim() || 'Ganho';
        const amount = parseFloat(earningAmountInput.value);
        if (!isNaN(amount) && amount > 0) {
            earnings.unshift({ text, amount, date: new Date() });
            earningTextInput.value = '';
            earningAmountInput.value = '';
            render();
        }
    });

    expensesForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = expenseTextInput.value.trim() || 'Gasto';
        const amount = parseFloat(expenseAmountInput.value);
        if (!isNaN(amount) && amount > 0) {
            expenses.unshift({ text, amount, date: new Date() });
            expenseTextInput.value = '';
            expenseAmountInput.value = '';
            render();
        }
    });
    
    // --- SIDE MENU & DARK MODE EVENTS ---
    openMenuBtn.addEventListener('click', openSideMenu);
    closeMenuBtn.addEventListener('click', closeSideMenu);
    menuOverlay.addEventListener('click', closeSideMenu);
    
    menuCaixinhaBtn.addEventListener('click', () => {
        closeSideMenu();
        setTimeout(() => {
            const caixinhaModalBalance = caixinhaModal.querySelector('#caixinhaModalBalance');
            const caixinhaModalInput = caixinhaModal.querySelector('#caixinhaModalInput');
            caixinhaModalBalance.textContent = formatCurrency(savings);
            caixinhaModalInput.value = '';
            openModal(caixinhaModal);
        }, 300);
    });

    // --- CAIXINHA MODAL ---
    const viewCaixinhaHistoryBtn = caixinhaModal.querySelector('#viewCaixinhaHistoryBtn');
    caixinhaModal.querySelector('#closeCaixinhaBtn').addEventListener('click', () => closeModal(caixinhaModal));
    caixinhaModal.addEventListener('click', (e) => { if (e.target === caixinhaModal) { closeModal(caixinhaModal); } });
    caixinhaModal.querySelector('#caixinhaAddBtn').addEventListener('click', () => {
        const value = parseFloat(caixinhaModal.querySelector('#caixinhaModalInput').value);
        if (value && value > 0) {
            savings += value;
            savingsHistory.unshift({ type: 'add', amount: value, date: new Date() });
            saveData();
            caixinhaModal.querySelector('#caixinhaModalBalance').textContent = formatCurrency(savings);
            caixinhaModal.querySelector('#caixinhaModalInput').value = '';
        }
    });
    caixinhaModal.querySelector('#caixinhaRemoveBtn').addEventListener('click', () => {
        const value = parseFloat(caixinhaModal.querySelector('#caixinhaModalInput').value);
        if (value && value > 0 && value <= savings) {
            savings -= value;
            savingsHistory.unshift({ type: 'remove', amount: value, date: new Date() });
            saveData();
            caixinhaModal.querySelector('#caixinhaModalBalance').textContent = formatCurrency(savings);
            caixinhaModal.querySelector('#caixinhaModalInput').value = '';
        }
    });
    viewCaixinhaHistoryBtn.addEventListener('click', () => openHistoryModal('savings'));
    
    // --- HISTORY MODAL ---
    const openHistoryModal = (type) => {
        const titleEl = historyModal.querySelector('#historyModalTitle');
        const listEl = historyModal.querySelector('#historyModalList');
        const data = type === 'earnings' ? earnings : (type === 'expenses' ? expenses : savingsHistory);
        
        titleEl.textContent = `Histórico de ${type === 'earnings' ? 'Ganhos' : (type === 'expenses' ? 'Gastos' : 'Caixinha')}`;
        listEl.innerHTML = '';

        if (data.length === 0) {
            listEl.innerHTML = `<li class="text-center text-slate-400 py-4">Nenhum item registrado.</li>`;
        } else {
            data.forEach((item, index) => {
                const li = document.createElement('li');
                
                if (type === 'savings') {
                    li.className = 'list-item bg-slate-700 p-3 rounded-lg border border-slate-600';
                    const colorClass = item.type === 'add' ? 'text-emerald-400' : 'text-rose-400';
                    const sign = item.type === 'add' ? '+' : '-';
                    li.innerHTML = `
                        <div>
                            <p class="font-semibold ${colorClass}">${sign} ${formatCurrency(item.amount)}</p>
                            <p class="text-sm text-slate-400">${new Date(item.date).toLocaleString('pt-BR')}</p>
                        </div>
                    `;
                } else {
                    li.className = 'list-item bg-slate-700 p-3 rounded-lg border border-slate-600';
                    const colorClass = type === 'earnings' ? 'text-cyan-400' : 'text-purple-400';
                    li.innerHTML = `
                        <div class="flex-grow flex flex-col">
                            <div>
                                <p class="font-semibold ${colorClass}">${formatCurrency(item.amount)}</p>
                                <p class="text-sm text-slate-300">${item.text}</p>
                            </div>
                            <div class="flex justify-between items-center mt-2">
                                <p class="text-xs text-slate-500">${item.date ? new Date(item.date).toLocaleString('pt-BR') : ''}</p>
                                <div class="flex items-center gap-2">
                                    <button data-action="edit" data-type="${type}" data-index="${index}" class="text-slate-500 hover:text-blue-400 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil pointer-events-none"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                                    </button>
                                    <button data-action="delete" data-type="${type}" data-index="${index}" class="text-slate-500 hover:text-red-400 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2 pointer-events-none"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }
                listEl.appendChild(li);
            });
        }
        openModal(historyModal);
    };
    viewEarningsHistoryBtn.addEventListener('click', () => openHistoryModal('earnings'));
    viewExpensesHistoryBtn.addEventListener('click', () => openHistoryModal('expenses'));
    historyModal.querySelector('#closeHistoryBtn').addEventListener('click', () => closeModal(historyModal));
    historyModal.addEventListener('click', (e) => { if (e.target === historyModal) { closeModal(historyModal); } });

    // --- EDIT & DELETE (EVENT DELEGATION) ---
    const openEditModal = (type, index) => {
        itemToEdit = { type, index };
        const item = type === 'earnings' ? earnings[index] : expenses[index];
        editModal.querySelector('#editAmountInput').value = item.amount;
        editModal.querySelector('#editTextIn').value = item.text;
        closeModal(historyModal);
        openModal(editModal);
    };

    const confirmDeletion = (type, index) => {
        itemToDelete = { type, index };
        openModal(confirmDeleteModal);
    };
    
    historyModal.addEventListener('click', (e) => {
        const button = e.target.closest('button[data-action]');
        if (!button) return;

        const { action, type, index } = button.dataset;

        if (action === 'edit') {
            openEditModal(type, parseInt(index));
        } else if (action === 'delete') {
            confirmDeletion(type, parseInt(index));
        }
    });

    editModal.querySelector('#cancelEditBtn').addEventListener('click', () => {
        closeModal(editModal);
        openHistoryModal(itemToEdit.type);
    });
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) {
            closeModal(editModal);
            openHistoryModal(itemToEdit.type);
        }
    });
    editModal.querySelector('#saveEditBtn').addEventListener('click', () => {
        const { type, index } = itemToEdit;
        const newAmount = parseFloat(editModal.querySelector('#editAmountInput').value);
        const newText = editModal.querySelector('#editTextIn').value.trim() || (type === 'earnings' ? 'Ganho' : 'Gasto');
        if (newAmount && newAmount > 0) {
            const dataArray = type === 'earnings' ? earnings : expenses;
            dataArray[index].amount = newAmount;
            dataArray[index].text = newText;
            render();
            closeModal(editModal);
            openHistoryModal(type);
        }
    });

    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    confirmDeleteBtn.addEventListener('click', () => {
        const { type, index } = itemToDelete;
        if (type === 'earnings') {
            earnings.splice(index, 1);
        } else if (type === 'expenses') {
            expenses.splice(index, 1);
        }
        closeModal(confirmDeleteModal);
        render();
        openHistoryModal(type);
    });
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    cancelDeleteBtn.addEventListener('click', () => closeModal(confirmDeleteModal));
    confirmDeleteModal.addEventListener('click', (e) => { if (e.target === confirmDeleteModal) { closeModal(confirmDeleteModal); } });
    
    // --- SCROLL INTO VIEW ON FOCUS ---
    const scrollInputIntoView = (event) => {
        if (window.innerWidth < 768) { // Only on mobile
            setTimeout(() => {
                event.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    };
    earningAmountInput.addEventListener('focus', scrollInputIntoView);
    earningTextInput.addEventListener('focus', scrollInputIntoView);
    expenseAmountInput.addEventListener('focus', scrollInputIntoView);
    expenseTextInput.addEventListener('focus', scrollInputIntoView);

    // --- INITIALIZATION ---
    loadData();
    render();
});