[Unit]
Description=Cpu Usage & Reporting Service
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/sbin/check_hana_{{ sid }}
Restart=on-abort

[Install]
WantedBy=multi-user.target
