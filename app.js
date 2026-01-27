// Simp Cash - Main Logic

// Mock Data
let isBalanceVisible = false;
const transactions = [
    { id: 1, type: 'Send Money', to: 'Alice M.', date: 'Today, 10:23 AM', amount: '-$50.00', isPlus: false },
    { id: 2, type: 'Add Money', to: 'Bank Transfer', date: 'Yesterday', amount: '+$500.00', isPlus: true },
    { id: 3, type: 'Recharge', to: '01712...', date: 'Jan 26', amount: '-$10.00', isPlus: false },
    { id: 4, type: 'Cash Out', to: 'Agent Store', date: 'Jan 25', amount: '-$100.00', isPlus: false },
];

function toggleBalance() {
    const el = document.getElementById('balanceDisplay');
    isBalanceVisible = !isBalanceVisible;
    if (isBalanceVisible) {
        el.classList.add('visible');
    } else {
        el.classList.remove('visible');
    }
}

function renderTransactions() {
    const list = document.getElementById('transactionList');
    list.innerHTML = ''; // Clear

    transactions.forEach(t => {
        const item = document.createElement('div');
        item.className = 'transaction-item fade-in';

        // Icon logic based on type
        let icon = 'ri-exchange-dollar-line';
        if (t.type === 'Add Money') icon = 'ri-add-line';
        if (t.type === 'Recharge') icon = 'ri-smartphone-line';
        if (t.type === 'Cash Out') icon = 'ri-upload-2-line';

        item.innerHTML = `
            <div class="t-icon"><i class="${icon}"></i></div>
            <div class="t-info">
                <div class="t-title">${t.type}</div>
                <div class="t-date">${t.date}</div>
            </div>
            <div class="t-amount ${t.isPlus ? 'plus' : 'minus'}">${t.amount}</div>
        `;
        list.appendChild(item);
    });
}

function handleAction(actionName) {
    if (actionName === 'Send Money') {
        showView('sendMoneyView');
    } else if (actionName === 'Cash Out') {
        showView('cashOutView');
    } else if (actionName === 'Recharge') {
        showView('rechargeView');
    } else if (actionName === 'Add Money') {
        showView('addMoneyView');
    } else {
        alert(`${actionName} feature coming soon!`);
    }
}

function showView(viewId) {
    // Hide Dashboard components
    document.querySelector('.balance-card').classList.add('hidden');
    document.querySelector('.actions-grid').classList.add('hidden');
    document.getElementById('dashboardView').classList.add('hidden');

    // Hide all feature views
    document.querySelectorAll('.feature-view').forEach(el => el.classList.add('hidden'));

    // Show target view
    document.getElementById(viewId).classList.remove('hidden');
}

function showDashboard() {
    // Show Dashboard components
    document.querySelector('.balance-card').classList.remove('hidden');
    document.querySelector('.actions-grid').classList.remove('hidden');
    document.getElementById('dashboardView').classList.remove('hidden');

    // Hide all feature views
    document.querySelectorAll('.feature-view').forEach(el => el.classList.add('hidden'));
}

function processTransaction(type) {
    // Simulate processing
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = 'Processing...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerText = 'Success!';

        // Add to transaction list
        const amount = type === 'Recharge' ? '$10.00' : '$50.00'; // Mock amounts
        transactions.unshift({
            id: Date.now(),
            type: type,
            to: 'New Transaction',
            date: 'Just Now',
            amount: `-${amount}`,
            isPlus: false
        });
        renderTransactions();

        setTimeout(() => {
            btn.innerText = originalText;
            btn.disabled = false;
            showDashboard();
            alert(`${type} Successful!`);
        }, 1000);
    }, 1500);
}

// Navigation Logic
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // Active State
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');

        // View Logic
        if (index === 0) { // Home
            showDashboard();
            // For this iteration, let's just cycle back to dashboard if they click Home, 
            // and show a simple placeholder alert or toast for others to prove connection.

            const titles = ['Home', 'Scan QR', 'Inbox', 'Profile'];
            if (index !== 0) {
                // Simple temporary feedback
                // Ideally we'd have a <div id="genericView"></div>
                alert(`Switched to ${titles[index]} tab (Design Work in Progress)`);
            }
        }
    });
});

