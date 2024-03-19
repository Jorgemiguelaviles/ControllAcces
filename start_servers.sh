#!/bin/bash

# Inicia o servidor React
nohup npm run dev -- --host 162.240.102.146 --port 8005 > react_server.log 2>&1 &

# Aguarda um curto período para garantir que o servidor React tenha tempo de iniciar
sleep 10

# Inicia o servidor Laravel
nohup php artisan serve --host 0.0.0.0 --port 5174 > laravel_server.log 2>&1 &

