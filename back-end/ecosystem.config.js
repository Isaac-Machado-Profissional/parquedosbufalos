module.exports = {
    apps: [
        {
            name: 'bufalos-backend',
            script: 'server.js',
            env: {
                NODE_ENV: 'production',
            },
            out_file: './logs/out.log',
            error_file: './logs/error.log',
            log_date_format: 'DD/MM/YYYY HH:mm:ss',

            watch: ['server.js', 'src/'],
            watch_delay: 10000, // 10 segundos de delay pro save do arquivo
            max_memory_restart: '300M', // Definir o limite de memória para reinício automático (exemplo 300 MB)
            autorestart: true,
            max_restarts: 10,
            wait_ready: false,
            restart_delay: 5000,
            listen_timeout: 8000,
            ignore_watch: ['node_modules', 'logs'], // evita reinício por mudança em node_modules e logs
        },
    ],
};
