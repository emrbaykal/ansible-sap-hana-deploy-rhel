[Unit]
Description=Check Server Network Availibility
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/sbin/check_server_availbility
Restart=on-abort

[Install]
WantedBy=multi-user.target
