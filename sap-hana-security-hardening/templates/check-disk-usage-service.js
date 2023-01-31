[Unit]
Description=Cpu Usage & Reporting Service
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/sbin/check_disk_usage
Restart=on-abort

[Install]
WantedBy=multi-user.target
