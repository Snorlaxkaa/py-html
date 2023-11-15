const damageCounter = document.getElementById('damageCounter');
const resetButton = document.getElementById('resetButton');
const downloadReport = document.getElementById('downloadReport');
const damageChartCtx = document.getElementById('damageChart').getContext('2d');

let damageData = [];
let updateInterval = 5000; // 更新間隔（毫秒）

// 初始化圖表
let damageChart = new Chart(damageChartCtx, {
    type: 'line',
    data: {
        labels: [], // 時間標籤
        datasets: [{
            label: '損壞次數',
            data: [], // 數據
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// 更新數據
function updateData() {
    fetch('path/to/your/folder/file.json')
        .then(response => response.json())
        .then(data => {
            damageCounter.textContent = data.num;
            // 更新圖表數據
            damageData.push(data.num);
            damageChart.data.labels.push(new Date().toLocaleTimeString());
            damageChart.data.datasets[0].data = damageData;
            damageChart.update();
        })
        .catch(error => console.error('Error:', error));
}
const feedCounter = document.getElementById('feedCounter');

// 更新進料統計數據
function updateFeedData() {
    fetch('path/to/your/folder/feedData.json') // 這裡的路徑應該指向存儲進料次數的JSON檔案
        .then(response => response.json())
        .then(data => {
            feedCounter.textContent = data.feedCount; // 假設JSON檔案中有一個feedCount屬性
        })
        .catch(error => console.error('Error:', error));
}

// 定時更新數據
setInterval(updateData, updateInterval);

// 重置計數器
resetButton.addEventListener('click', () => {
    // 實現重置邏輯
});

// 下載報告
downloadReport.addEventListener('click', () => {
    // 實現下載報告邏輯
});
