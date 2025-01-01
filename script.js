// Configuración de los meses
const months = [
    { name: "Diciembre", days: 31, key: "diciembre1" },
    { name: "Enero", days: 31, key: "enero" },
    { name: "Febrero", days: 28, key: "febrero" },
    { name: "Marzo", days: 31, key: "marzo" },
    { name: "Abril", days: 30, key: "abril" },
    { name: "Mayo", days: 31, key: "mayo" },
    { name: "Junio", days: 30, key: "junio" },
    { name: "Julio", days: 31, key: "julio" },
    { name: "Agosto", days: 31, key: "agosto" },
    { name: "Septiembre", days: 30, key: "septiembre" },
    { name: "Octubre", days: 31, key: "octubre" },
    { name: "Noviembre", days: 30, key: "noviembre" },
    { name: "Diciembre", days: 31, key: "diciembre2" }
];

// Crear la estructura de los meses
function createMonths() {
    const container = document.getElementById('months-container');
    container.innerHTML = ''; // Limpiar el contenedor
    
    months.forEach(month => {
        const monthElement = document.createElement('div');
        monthElement.className = 'month';
        
        const title = document.createElement('h2');
        title.textContent = month.name;
        monthElement.appendChild(title);
        
        const grid = document.createElement('div');
        grid.className = 'days-grid';
        
        createDays(month.key, month.days, grid);
        
        monthElement.appendChild(grid);
        container.appendChild(monthElement);
    });
}

function createDays(monthKey, totalDays, grid) {
    for (let day = 1; day <= totalDays; day++) {
        // Para diciembre1, solo mostrar el día 31
        if (monthKey === "diciembre1" && day !== 31) {
            continue;
        }

        const envelope = document.createElement('div');
        envelope.className = 'envelope unlocked'; // Todos desbloqueados
        envelope.innerHTML = `<span>${day}</span>`;

        envelope.onclick = () => {
            if (messages[monthKey] && messages[monthKey][day]) {
                showMessage(monthKey, day);
            } else {
                showMessage(monthKey, day, true);
            }
        };

        grid.appendChild(envelope);
    }
}

function showMessage(monthKey, day, empty = false) {
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('modal-overlay');
    const dayNumber = document.getElementById('day-number');
    const messageElement = document.getElementById('message');
    
    dayNumber.textContent = day;
    
    if (empty) {
        messageElement.textContent = 'No hay mensaje para este día';
    } else {
        messageElement.textContent = messages[monthKey][day];
    }
    
    modal.style.display = 'block';
    overlay.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('modal-overlay');
    modal.style.display = 'none';
    overlay.style.display = 'none';
}

// Inicializar cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    createMonths();
    
    // Agregar evento para cerrar el modal con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});
