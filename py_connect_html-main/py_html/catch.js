const damageCounter = document.getElementById('damageCounter');
const feedCounter = document.getElementById('feedCounter');
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

// 更新當前日期，僅保留一個函數定義
function updateCurrentDate() {
    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        const now = new Date();
        const dateString = now.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' });
        currentDateElement.textContent = dateString;
        console.log('當前日期已更新:', dateString); // 調試日志
    } else {
        console.error('無法找到顯示當前日期的元素');
    }
}

// 當頁面加載時更新日期
document.addEventListener('DOMContentLoaded', updateCurrentDate);

// 其他功能省略... 保持不變


// 定時更新損壞統計數據
setInterval(updateDamageData, updateInterval);

// 更新進料統計數據
async function updateFeedData() {
    try {
        const response = await fetch('path/to/your/feedData.json');
        const data = await response.json();
        feedCounter.textContent = data.feedCount;
    } catch (error) {
        console.error('更新進料數據時發生錯誤：', error);
    }
}

// 重置計數器
resetButton.addEventListener('click', () => {
    damageData = [];
    damageChart.data.labels = [];
    damageChart.data.datasets[0].data = [];
    damageChart.update();
});

// 下載報告
downloadReport.addEventListener('click', async () => {
    try {
        const response = await fetch('path/to/your/report.json');
        if (!response.ok) {
            throw new Error(`無法抓取報告文件`);
        }
        const data = await response.json();
        const reportBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const downloadUrl = URL.createObjectURL(reportBlob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'report.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error('下載報告時發生錯誤：', error.message);
    }
});
