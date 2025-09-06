# e-commerce-website-grocery-go
This project was writing in react (JavaScript library) and express.js (JavaScript library)

1. Clone the project create .env reference below and follow the below setup 

DB_HOST=""
DB_USER=""
DB_NAME=""
DB_PASSWORD=""
ACCOUNT_SID=""
AUTH_TOKEN=""
SECRET_KEY=""
REACT_APP_PUBLIC_KEY=""

## Setup
1.1.1 Create the below systemctl file for frontend (might want to change the usernames and dir)  grocery-go-client.service 

[Unit]
Description=Grocery Go Client Serve
After=network.target

[Service]
Type=simple
User=ramalaudebeila
WorkingDirectory=/home/ramalaudebeila/ggweb/e-commerce-website-grocery-go/client
ExecStart=/usr/local/bin/serve -s build
Restart=always
Environment=PORT=3000

[Install]
WantedBy=multi-user.target

1.1.2 Create the below backend file () grocery-go-server.service 

                                                                                               
[Unit]
Description=Grocery Go Node.js Server
After=network.target

[Service]
User=ramalaudebeila
WorkingDirectory=/home/ramalaudebeila/ggweb/e-commerce-website-grocery-go/server
ExecStart=/usr/bin/npm start
Restart=always
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target

1.2.1 Create a database ad nginx server will need to install ssl certs 

Install nginx and past the below in sites avaialable, enbale the server (so thata its uin sisted enabled)

# Redirect HTTP traffic to HTTPS
server {
    if ($host = www.grocerygo.co.za) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = grocerygo.co.za) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name grocerygo.co.za www.grocerygo.co.za;

    # Redirect all HTTP traffic to HTTPS
    return 301 https://$host$request_uri;




}

# HTTPS configuration
server {
    listen 443 ssl http2;
    server_name grocerygo.co.za www.grocerygo.co.za;

    # SSL certificate configuration
    ssl_certificate /etc/letsencrypt/live/grocerygo.co.za/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/grocerygo.co.za/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # SSL settings for enhanced security
    # ssl_protocols TLSv1.2 TLSv1.3;
    #ssl_prefer_server_ciphers on;
    # ssl_ciphers HIGH:!aNULL:!MD5;

    # Location for the Next.js application
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Location for Django backend
    location /api/ {
        client_max_body_size 250M;
        proxy_pass http://127.0.0.1:3002;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    # Additional security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Frame-Options SAMEORIGIN;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;


}

1.2.2 Setup database install xampp for teh database (UI management) make sure you backed your database and save. (use can try other alternatives like postgress in the future since you might need to change the port for apache to port 8080)






