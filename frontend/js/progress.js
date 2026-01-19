const logDate = document.getElementById('log-date');
const weight = document.getElementById('weight');
const chest = document.getElementById('chest');
const waist = document.getElementById('waist');
const addLogBtn = document.getElementById('add-log');
const historyList = document.getElementById('history-list');

let logs = JSON.parse(localStorage.getItem('fitfusionLogs')) || [];

const chartCtx = document.getElementById('progressChart').getContext('2d');
let progressChart = new Chart(chartCtx, {
    type: 'line',
    data: {
        labels: logs.map(log => log.date),
        datasets: [{
            label: 'Weight (kg)',
            data: logs.map(log => log.weight),
            borderColor: '#ff4c60',
            fill: false
        }]
    }
});

function updateHistory() {
    historyList.innerHTML = '';
    logs.forEach(log => {
        const li = document.createElement('li');
        li.textContent = `${log.date} - ${log.weight} kg | Chest: ${log.chest} cm | Waist: ${log.waist} cm`;
        historyList.appendChild(li);
    });
}

function updateChart() {
    progressChart.data.labels = logs.map(log => log.date);
    progressChart.data.datasets[0].data = logs.map(log => log.weight);
    progressChart.update();
}

addLogBtn.addEventListener('click', () => {
    if (!logDate.value || !weight.value) return alert('Please enter date and weight.');

    const logEntry = {
        date: logDate.value,
        weight: parseFloat(weight.value),
        chest: chest.value || '-',
        waist: waist.value || '-'
    };
    
    logs.push(logEntry);
    localStorage.setItem('fitfusionLogs', JSON.stringify(logs));
    updateHistory();
    updateChart();

    logDate.value = '';
    weight.value = '';
    chest.value = '';
    waist.value = '';
});

document.getElementById('save-notes').addEventListener('click', () => {
    localStorage.setItem('fitfusionNotes', document.getElementById('notes').value);
    alert('Notes saved!');
});

document.getElementById('notes').value = localStorage.getItem('fitfusionNotes') || '';

updateHistory();
updateChart();
