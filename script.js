document.addEventListener('DOMContentLoaded', () => {
    const addMedicineForm = document.getElementById('add-medicine-form');
    const medicineNameInput = document.getElementById('medicine-name');
    const medicineQuantityInput = document.getElementById('medicine-quantity');
    const medicineList = document.getElementById('medicine-list');

    let medicines = JSON.parse(localStorage.getItem('medicines')) || [];

    const renderMedicines = () => {
        medicineList.innerHTML = '';
        medicines.forEach((medicine, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${medicine.name} - الكمية: ${medicine.quantity}</span>
                <button class="delete-btn" data-index="${index}">حذف</button>
            `;
            medicineList.appendChild(li);
        });
    };

    const addMedicine = (name, quantity) => {
        medicines.push({ name, quantity });
        localStorage.setItem('medicines', JSON.stringify(medicines));
        renderMedicines();
    };

    const deleteMedicine = (index) => {
        medicines.splice(index, 1);
        localStorage.setItem('medicines', JSON.stringify(medicines));
        renderMedicines();
    };

    addMedicineForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = medicineNameInput.value.trim();
        const quantity = parseInt(medicineQuantityInput.value.trim(), 10);
        if (name && quantity) {
            addMedicine(name, quantity);
            medicineNameInput.value = '';
            medicineQuantityInput.value = '';
        }
    });

    medicineList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-index');
            deleteMedicine(index);
        }
    });

    renderMedicines();
});
