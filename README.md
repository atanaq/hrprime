<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HH.ru Parser - Панель управления</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .header {
            background: white;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 32px;
        }

        .subtitle {
            color: #666;
            font-size: 16px;
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }

        .stat-card {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .stat-value {
            font-size: 36px;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 5px;
        }

        .stat-label {
            color: #666;
            font-size: 14px;
        }

        .actions {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }

        .btn {
            background: white;
            border: none;
            border-radius: 12px;
            padding: 20px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .btn:active {
            transform: translateY(0);
        }

        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }

        .btn-success {
            background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
            color: #333;
        }

        .btn-info {
            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
            color: #333;
        }

        .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .icon {
            font-size: 24px;
        }

        .content {
            background: white;
            border-radius: 16px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            margin-bottom: 20px;
        }

        .table-container {
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #eee;
        }

        th {
            background: #f8f9fa;
            font-weight: 600;
            color: #333;
        }

        tr:hover {
            background: #f8f9fa;
        }

        .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
            background: #667eea;
            color: white;
        }

        .loading {
            text-align: center;
            padding: 40px;
            color: #666;
        }

        .spinner {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #667eea;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .alert {
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }

        .alert-success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .alert-info {
            background: #d1ecf1;
            color: #0c5460;
            border: 1px solid #bee5eb;
        }

        .alert-warning {
            background: #fff3cd;
            color: #856404;
            border: 1px solid #ffeaa7;
        }

        a {
            color: #667eea;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1> HH.ru Parser</h1>
            <p class="subtitle">Панель управления парсером вакансий и компаний</p>
        </div>

        <div class="stats">
            <div class="stat-card">
                <div class="stat-value" id="companiesCount">0</div>
                <div class="stat-label">Компаний в базе</div>
            </div>
            <div class="stat-card">
                <div class="stat-value" id="vacanciesCount">0</div>
                <div class="stat-label">Вакансий в базе</div>
            </div>
        </div>

        <div id="alerts"></div>

        <div class="actions">
            <button class="btn btn-primary" onclick="startParsing()">
                <span class="icon">🔍</span>
                <span>Запустить парсинг</span>
            </button>
            <button class="btn btn-success" onclick="exportExcel()">
                <span class="icon">📊</span>
                <span>Экспорт в Excel</span>
            </button>
            <button class="btn btn-info" onclick="loadTopCompanies()">
                <span class="icon">🏆</span>
                <span>Показать топ-20</span>
            </button>
        </div>

        <div class="content">
            <h2 id="contentTitle">Топ-20 компаний</h2>
            <div id="contentArea">
                <div class="loading">
                    <p>Нажмите "Показать топ-20" для загрузки данных</p>
                </div>
            </div>
        </div>
    </div>

    <script>
        const API_URL = window.location.origin;

        // Загрузка статистики при загрузке страницы
        async function loadStats() {
            try {
                const response = await fetch(`${API_URL}/api/stats`);
                const data = await response.json();
                
                document.getElementById('companiesCount').textContent = data.companies;
                document.getElementById('vacanciesCount').textContent = data.vacancies;
            } catch (error) {
                console.error('Ошибка загрузки статистики:', error);
            }
        }

        // Запуск парсинга
        async function startParsing() {
            if (!confirm('Запустить парсинг? Это может занять 10-30 минут.')) {
                return;
            }

            showAlert('Парсинг запущен в фоновом режиме. Это займет 10-30 минут. Следите за прогрессом в консоли сервера.', 'info');

            try {
                const response = await fetch(`${API_URL}/api/parse`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ area: '113' })
                });

                const data = await response.json();
                showAlert(data.message, 'success');

                // Обновляем статистику каждые 10 секунд
                const interval = setInterval(loadStats, 10000);
                
                // Останавливаем через 30 минут
                setTimeout(() => clearInterval(interval), 30 * 60 * 1000);
            } catch (error) {
                showAlert('Ошибка запуска парсинга: ' + error.message, 'warning');
            }
        }

        // Экспорт в Excel
        async function exportExcel() {
            try {
                showAlert('Генерация Excel файла...', 'info');
                
                window.location.href = `${API_URL}/api/export/excel`;
                
                setTimeout(() => {
                    showAlert('Excel файл загружен!', 'success');
                }, 1000);
            } catch (error) {
                showAlert('Ошибка экспорта: ' + error.message, 'warning');
            }
        }

        // Загрузка топ-20 компаний
        async function loadTopCompanies() {
            const contentArea = document.getElementById('contentArea');
            contentArea.innerHTML = '<div class="loading"><div class="spinner"></div><p>Загрузка данных...</p></div>';

            try {
                const response = await fetch(`${API_URL}/api/companies/top`);
                const data = await response.json();

                if (data.companies.length === 0) {
                    contentArea.innerHTML = '<div class="loading"><p>Нет данных. Запустите парсинг.</p></div>';
                    return;
                }

                let html = '<div class="table-container"><table>';
                html += '<thead><tr>';
                html += '<th>#</th>';
                html += '<th>Компания</th>';
                html += '<th>Вакансий</th>';
                html += '<th>Город</th>';
                html += '<th>Ссылка</th>';
                html += '</tr></thead><tbody>';

                data.companies.forEach((company, index) => {
                    html += '<tr>';
                    html += `<td>${index + 1}</td>`;
                    html += `<td><strong>${company.name}</strong></td>`;
                    html += `<td><span class="badge">${company.vacanciesCount}</span></td>`;
                    html += `<td>${company.area || '-'}</td>`;
                    html += `<td><a href="${company.url}" target="_blank">Открыть на HH.ru</a></td>`;
                    html += '</tr>';
                });

                html += '</tbody></table></div>';
                contentArea.innerHTML = html;

                showAlert(`Загружено ${data.companies.length} компаний`, 'success');
            } catch (error) {
                contentArea.innerHTML = '<div class="loading"><p>Ошибка загрузки данных</p></div>';
                showAlert('Ошибка: ' + error.message, 'warning');
            }
        }

        // Показать уведомление
        function showAlert(message, type = 'info') {
            const alertsContainer = document.getElementById('alerts');
            const alert = document.createElement('div');
            alert.className = `alert alert-${type}`;
            alert.textContent = message;
            
            alertsContainer.innerHTML = '';
            alertsContainer.appendChild(alert);

            setTimeout(() => {
                alert.remove();
            }, 5000);
        }

        // Инициализация
        loadStats();
        setInterval(loadStats, 30000); // Обновляем статистику каждые 30 секунд
    </script>
</body>
</html>
#   h r p r i m e  
 