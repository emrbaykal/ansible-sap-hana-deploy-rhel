[Unit]
Description=Check Network Service
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/sbin/check_network
Restart=on-abort

[Install]
WantedBy=multi-user.target
