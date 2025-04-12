# e-commerce-website-grocery-go
This project was writing in react (JavaScript library) and express.js (JavaScript library)

1. Clone the project create .env reference below and follow the below setup 

DB_HOST="localhost"
DB_USER="root"
DB_NAME="grozadb"
DB_PASSWORD="123456789@gg"
ACCOUNT_SID="AC3dea21d38858ee9816e6e0df13a1bb8a"
AUTH_TOKEN="2f77045ba8649e2935f7e34d66b30cfc"
SECRET_KEY="sk_live_45fb1e52L1GpKzP093f4ede95efd"
REACT_APP_PUBLIC_KEY="pk_test_d241ce27M43Rk1o2faa4"

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

## History below is the hostory on the vm incase I missged anything.

    1  exit
    2  cd .ssh
    3  ls
    4  cd
    5  echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQClHDqaHaQqBfCbJ+RrNJ24pxPbauPJmA1mFurwRj770oF+8kEOX/mffyawKOy7wlMii2d/NSX0VdFP0p/neAu/s67CQu3mSnTEBVePpVvFE+kMA4QitEE2VoyreZ2kjgZgIrx1AFTRdRuxIxNP/fCAsD6WLAw9n1E72X0unfZXPaqPXtTTFS+ThHDPRO+MTCkyYuZGZ3XsQb5eNU2woErIJ98554E7i3Qn/xRFzdk9wJkI5OZC5phW94qNVqr73OJ3shBp5kWlZ2vdhD2PpWmJuxhGUHgT90W4gFvi83vYS90xiTwM3xRRIjSzijqF6TH6hpQtRUOvgPHSR+8zfRQLNGZuMxFIUjwfPmHhMgFS5aWnl3fN4gF6fyZIykX1d/uXFYIdvgIglf3MXr0lSj0eAafoKPxDQPvFyvvQOryajGrbtsovuSiqUePWeHSbq7LiMCmcSSO1xzQZYBTfyzcr0uhPpfuy71WnThEoalOuAeZ0+CSnISdT9TEaJzV7djZtJG/uTcDZWxfHvqUydMJ/j6le8Yrk7ztJ4YrZKSnCO1epHdOGEEIdEHT11SESTy3394Ukhe31U8ninMXkYTvOMIcl/3Ltto6fClchgF9ROXqH4BWqm9rFN2W01k8NHWSnpeYwyKswVBrZjX2FvZnVgZ80xAE+XG3irqm1TzdIXQ== debeilahr@icloud.com" >> .ssh/authorized_keys
    6  cd
    7  ls
    8  cd ssh
    9  ls
   10  sudo certbot --nginx -d grocerygo.co.za -d www.grocerygo.co.za
   11  cd server
   12  ls
   13  node index.js
   14  npm install express
   15  node index.js
   16  npm install dotenv
   17  node index.js
   18  cd
   19  sudo apt install nginx -y
   20  sudo systemctl start nginx
   21  sudo systemctl enable nginx
   22  cd /etc
   23  ls
   24  cd n
   25  cd nginx
   26  ls
   27  cd sites-available/
   28  ls
   29  sudo vim grocerygo
   30  sudo ln -s /etc/nginx/sites-available/grocerygo /etc/nginx/sites-enabled/
   31  cd
   32  mkdir ssh
   33  ls
   34  cd ssh
   35  ls
   36  sudo apt install certbot python3-certbot-nginx -y
   37  ls
   38  sudo certbot --nginx -d grocerygo.co.za -d www.grocerygo.co.za
   39  ls
   40  cd
   41  cd /etc/nginx/sites-available
   42  ls
   43  sudo vim grocerygo 
   44  sudo nginx -t
   45  sudo systemctl reload nginx
   46  sudo nginx -t
   47  sudo vim grocerygo 
   48  sudo nginx -t
   49  sudo systemctl reload nginx
   50  ls
   51  cd client
   52  ls
   53  npm run dev
   54  npm install
   55  sudo npm i
   56  sudo apt install npm
   57  npm run dev
   58  npm start
   59  node
   60  node.js -v
   61  npm start
   62  npm install
   63  npm start
   64  ls
   65  mkdir ggweb
   66  ls
   67  cd ggweb
   68  git clone git@github.com:ramalau0/e-commerce-website-grocery-go.git
   69  sudo apt update
   70  sudo apt install git
   71  git clone git@github.com:ramalau0/e-commerce-website-grocery-go.git
   72  cd
   73  cd ggweb/
   74  git clone https://github.com/ramalau0/e-commerce-website-grocery-go.git
   75  ls
   76  cd e-commerce-website-grocery-go/
   77  ls
   78  code .
   79  cd .ssh
   80  ls
   81  cat authorized_keys 
   82  cd
   83  echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQClHDqaHaQqBfCbJ+RrNJ24pxPbauPJmA1mFurwRj770oF+8kEOX/mffyawKOy7wlMii2d/NSX0VdFP0p/neAu/s67CQu3mSnTEBVePpVvFE+kMA4QitEE2VoyreZ2kjgZgIrx1AFTRdRuxIxNP/fCAsD6WLAw9n1E72X0unfZXPaqPXtTTFS+ThHDPRO+MTCkyYuZGZ3XsQb5eNU2woErIJ98554E7i3Qn/xRFzdk9wJkI5OZC5phW94qNVqr73OJ3shBp5kWlZ2vdhD2PpWmJuxhGUHgT90W4gFvi83vYS90xiTwM3xRRIjSzijqF6TH6hpQtRUOvgPHSR+8zfRQLNGZuMxFIUjwfPmHhMgFS5aWnl3fN4gF6fyZIykX1d/uXFYIdvgIglf3MXr0lSj0eAafoKPxDQPvFyvvQOryajGrbtsovuSiqUePWeHSbq7LiMCmcSSO1xzQZYBTfyzcr0uhPpfuy71WnThEoalOuAeZ0+CSnISdT9TEaJzV7djZtJG/uTcDZWxfHvqUydMJ/j6le8Yrk7ztJ4YrZKSnCO1epHdOGEEIdEHT11SESTy3394Ukhe31U8ninMXkYTvOMIcl/3Ltto6fClchgF9ROXqH4BWqm9rFN2W01k8NHWSnpeYwyKswVBrZjX2FvZnVgZ80xAE+XG3irqm1TzdIXQ== debeilahr@icloud.com" >> .ssh/authorized_keys
   84  cd
   85  ls
   86  cd /etc/nginx
   87  ls
   88  cd sites-available/
   89  ls
   90  code grocerygo 
   91  sudo vim grocerygo 
   92  sudo systemctl nginx reload
   93  sudo systemctl reload nginx
   94  sudo vim grocerygo 
   95  sudo systemctl reload nginx
   96  sudo vim grocerygo 
   97  sudo systemctl status nginx
   98  sudo systemctl reload nginx
   99  journalctl -xeu nginx.service
  100  sudo nginx -t
  101  sudo vim grocerygo
  102  sudo systemctl reload nginx
  103  sudo nginx -t
  104  sudo vim grocerygo
  105  sudo systemctl reload nginx
  106  sudo nginx -t
  107  sudo vim grocerygo
  108  sudo nginx -t
  109  sudo systemctl reload nginx
  110  cd
  111  ls
  112  cd ssh
  113  ls
  114  sudo certbot --nginx -d rocerygo.co.za -d www.grocerygo.co.za
  115  sudo certbot --nginx -d grocerygo.co.za -d www.grocerygo.co.za
  116  certbot install --cert-name grocerygo.co.za
  117  sudo certbot --nginx -d grocerygo.co.za -d www.grocerygo.co.za
  118  npm run dev
  119  npm start
  120  cd client
  121  npm start
  122  echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQClHDqaHaQqBfCbJ+RrNJ24pxPbauPJmA1mFurwRj770oF+8kEOX/mffyawKOy7wlMii2d/NSX0VdFP0p/neAu/s67CQu3mSnTEBVePpVvFE+kMA4QitEE2VoyreZ2kjgZgIrx1AFTRdRuxIxNP/fCAsD6WLAw9n1E72X0unfZXPaqPXtTTFS+ThHDPRO+MTCkyYuZGZ3XsQb5eNU2woErIJ98554E7i3Qn/xRFzdk9wJkI5OZC5phW94qNVqr73OJ3shBp5kWlZ2vdhD2PpWmJuxhGUHgT90W4gFvi83vYS90xiTwM3xRRIjSzijqF6TH6hpQtRUOvgPHSR+8zfRQLNGZuMxFIUjwfPmHhMgFS5aWnl3fN4gF6fyZIykX1d/uXFYIdvgIglf3MXr0lSj0eAafoKPxDQPvFyvvQOryajGrbtsovuSiqUePWeHSbq7LiMCmcSSO1xzQZYBTfyzcr0uhPpfuy71WnThEoalOuAeZ0+CSnISdT9TEaJzV7djZtJG/uTcDZWxfHvqUydMJ/j6le8Yrk7ztJ4YrZKSnCO1epHdOGEEIdEHT11SESTy3394Ukhe31U8ninMXkYTvOMIcl/3Ltto6fClchgF9ROXqH4BWqm9rFN2W01k8NHWSnpeYwyKswVBrZjX2FvZnVgZ80xAE+XG3irqm1TzdIXQ== debeilahr@icloud.com" >> .ssh/authorized_keys
  123  cd
  124  ls
  125  cd /etc
  126  ls
  127  cd nginx/
  128  ls
  129  cd sites-available/
  130  ls
  131  sudo vim grocerygo
  132  sudo systemctl reload nginx
  133  cd
  134  ls
  135  cd .ssh
  136  ls
  137  cd
  138  cd ggweb/e-commerce-website-grocery-go
  139  ls
  140  cd client 
  141  npm start
  142  npm run build
  143  npx update-browserslist-db@latest
  144  npm run build
  145  npm start
  146  ls -a
  147  cd build
  148  ls
  149  ls -a
  150  cd ../
  151  ls -a
  152  cd build
  153  ls -a
  154  cd static
  155  ls
  156  ls -a
  157  cd ../../
  158  ls
  159  npm start build
  160  npm run build
  161  npm install -g serve
  162  sudo npm install -g serve
  163  sudo serve -s build
  164  cd
  165  sudo nano /etc/systemd/system/grocery-go-client.service
  166  sudo systemctl daemon-reload
  167  sudo systemctl enable grocery-go-client.service
  168  sudo systemctl start grocery-go-client.service
  169  sudo nano /etc/systemd/system/grocery-go-client.service
  170  sudo systemctl status grocery-go-client.service
  171  which serve
  172  sudo nano /etc/systemd/system/grocery-go-client.service
  173  sudo systemctl start grocery-go-client.service
  174  sudo systemctl daemon-reload
  175  sudo systemctl start grocery-go-client.service
  176  sudo systemctl status grocery-go-client.service
  177  echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQClHDqaHaQqBfCbJ+RrNJ24pxPbauPJmA1mFurwRj770oF+8kEOX/mffyawKOy7wlMii2d/NSX0VdFP0p/neAu/s67CQu3mSnTEBVePpVvFE+kMA4QitEE2VoyreZ2kjgZgIrx1AFTRdRuxIxNP/fCAsD6WLAw9n1E72X0unfZXPaqPXtTTFS+ThHDPRO+MTCkyYuZGZ3XsQb5eNU2woErIJ98554E7i3Qn/xRFzdk9wJkI5OZC5phW94qNVqr73OJ3shBp5kWlZ2vdhD2PpWmJuxhGUHgT90W4gFvi83vYS90xiTwM3xRRIjSzijqF6TH6hpQtRUOvgPHSR+8zfRQLNGZuMxFIUjwfPmHhMgFS5aWnl3fN4gF6fyZIykX1d/uXFYIdvgIglf3MXr0lSj0eAafoKPxDQPvFyvvQOryajGrbtsovuSiqUePWeHSbq7LiMCmcSSO1xzQZYBTfyzcr0uhPpfuy71WnThEoalOuAeZ0+CSnISdT9TEaJzV7djZtJG/uTcDZWxfHvqUydMJ/j6le8Yrk7ztJ4YrZKSnCO1epHdOGEEIdEHT11SESTy3394Ukhe31U8ninMXkYTvOMIcl/3Ltto6fClchgF9ROXqH4BWqm9rFN2W01k8NHWSnpeYwyKswVBrZjX2FvZnVgZ80xAE+XG3irqm1TzdIXQ== debeilahr@icloud.com" >> .ssh/authorized_keys
  178  ls
  179  cd .ssh
  180  ls
  181  cat authorized_keys
  182  cd
  183  echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQClHDqaHaQqBfCbJ+RrNJ24pxPbauPJmA1mFurwRj770oF+8kEOX/mffyawKOy7wlMii2d/NSX0VdFP0p/neAu/s67CQu3mSnTEBVePpVvFE+kMA4QitEE2VoyreZ2kjgZgIrx1AFTRdRuxIxNP/fCAsD6WLAw9n1E72X0unfZXPaqPXtTTFS+ThHDPRO+MTCkyYuZGZ3XsQb5eNU2woErIJ98554E7i3Qn/xRFzdk9wJkI5OZC5phW94qNVqr73OJ3shBp5kWlZ2vdhD2PpWmJuxhGUHgT90W4gFvi83vYS90xiTwM3xRRIjSzijqF6TH6hpQtRUOvgPHSR+8zfRQLNGZuMxFIUjwfPmHhMgFS5aWnl3fN4gF6fyZIykX1d/uXFYIdvgIglf3MXr0lSj0eAafoKPxDQPvFyvvQOryajGrbtsovuSiqUePWeHSbq7LiMCmcSSO1xzQZYBTfyzcr0uhPpfuy71WnThEoalOuAeZ0+CSnISdT9TEaJzV7djZtJG/uTcDZWxfHvqUydMJ/j6le8Yrk7ztJ4YrZKSnCO1epHdOGEEIdEHT11SESTy3394Ukhe31U8ninMXkYTvOMIcl/3Ltto6fClchgF9ROXqH4BWqm9rFN2W01k8NHWSnpeYwyKswVBrZjX2FvZnVgZ80xAE+XG3irqm1TzdIXQ== debeilahr@icloud.com" >> .ssh/authorized_keys
  184  cd
  185  sudo systemctl start nginx 
  186  sudo systemctl status nginx 
  187  cd
  188  sudo apt update && sudo apt upgrade -y
  189  sudo apt install apache2 -y
  190  sudo systemctl start apache2
  191  sudo systemctl enable apache2
  192  wget https://www.apachefriends.org/xampp-files/8.2.4/xampp-linux-x64-8.2.4-0-installer.run
  193  which wget
  194  wget https://www.apachefriends.org/xampp-files/8.2.4/xampp-linux-x64-8.2.4-0-installer.run
  195  wget https://downloadsapachefriends.global.ssl.fastly.net/xampp-files/8.2.5/xampp-linux-x64-8.2.5-0-installer.run
  196  wget https://downloadsapachefriends.global.ssl.fastly.net/xampp-files/8.1.25/xampp-linux-x64-8.2.5-0-installer.run
  197  sudo wget https://downloadsapachefriends.global.ssl.fastly.net/xampp-files/8.2.5/xampp-linux-x64-8.2.5-0-installer.run
  198  wget https://www.apachefriends.org/xampp-files/8.2.5/xampp-linux-x64-8.2.5-installer.run
  199  ls
  200  sudo wget https://www.apachefriends.org/xampp-files/8.2.4/xampp-linux-x64-8.2.4-0-installer.run
  201  ls
  202  cd ../
  203  ls
  204  cd ../
  205  ls
  206  cd
  207  ls
  208  sudo chmod +x xampp-linux-x64-8.2.12-0-installer.run
  209  sudo ./xampp-linux-x64-8.2.12-0-installer.run
  210  sudo /opt/lampp/lampp start
  211  which Apache
  212  sudo systemctl stop apache2
  213  sudo /opt/lampp/lampp start
  214  cd /opt/lampp/
  215  ls
  216  cd lampp
  217  cd etc/httpd
  218  sudo vim /opt/lampp/etc/httpd.conf
  219  sudo /opt/lampp/lampp restart
  220  sudo lsof -i :80
  221  sudo systemctl stop apache2
  222  sudo /opt/lampp/lampp restart
  223  cd
  224  sudo vim /opt/lampp/etc/httpd.conf
  225  sudo /opt/lampp/lampp restart
  226  sudo systemctl stop apache
  227  sudo systemctl status apache2
  228  sudo systemctl disable apache2
  229  sudo systemctl status apache2
  230  sudo /opt/lampp/lampp restart
  231  sudo systemctl status apache2
  232  sudo /opt/lampp/lampp restart
  233  sudo vim /opt/lampp/etc/httpd.conf
  234  sudo /opt/lampp/lampp restart
  235  sudo netstat -tuln | grep ':80'
  236  sudo nano /etc/apache2/ports.conf
  237  sudo /opt/lampp/lampp restart
  238  sudo systemctl stop nginx
  239  sudo /opt/lampp/lampp restart
  240  sudo systemctl start nginx
  241  sudo nano /etc/apache2/sites-available/000-default.conf
  242  sudo ufw allow 8001
  243  sudo systemctl start nginx
  244  sudo /opt/lampp/lampp restart
  245  sudo systemctl start nginx
  246  sudo /opt/lampp/lampp stop
  247  sudo systemctl start nginx
  248  sudo /opt/lampp/lampp start
  249  cd /etc/apache2/sites-available/
  250  ls
  251  code default-ssl.conf
  252  sudo 000-default.conf
  253  sudo vim 000-default.conf
  254  code vim default-ssl.conf
  255  sudo vim default-ssl.conf
  256  sudo /opt/lampp/lampp restart
  257  cd
  258  ls
  259  sudo /opt/lampp/lampp start
  260  sudo netstat -tuln | grep ':443'
  261  cd /etc/nginx
  262  ls
  263  cd sites-
  264  cd sites-available/
  265  ls
  266  code grocerygo 
  267  cd ../../
  268  ls
  269  cd apache2/
  270  ls
  271  cd sites-available/
  272  sudo vim grocerygo 
  273  cd
  274  cat /var/log/apache2/grocerygo-error.log
  275  cd /etc/apache2/sites-available
  276  ls
  277  sudo rm grocerygo
  278  code default-ssl.conf 
  279  code 000-default.conf
  280  sudo systemctl reload apache2
  281  cd
  282  sudo /opt/lampp/lampp start
  283  cd /opt/lammpp
  284  cd /opt/lampp
  285  ls
  286  cd apache2/
  287  ls
  288  cd conf/
  289  ls
  290  code httpd.conf 
  291  cd ../
  292  ls
  293  cd htdocs/
  294  ls
  295  cd ../
  296  cd scripts/
  297  ls
  298  code ctl.sh 
  299  cd ../
  300  ls
  301  cd ../
  302  ls
  303  cd mysql/
  304  ls
  305  cd scripts/
  306  ls
  307  cd .././
  308  cd ../
  309  cd
  310  cd  xampp/apache/conf
  311  cd xampp/apache/conf
  312  sudo /opt/lampp/lampp start
  313  sudo nano /etc/apache2/ports.conf
  314  sudo systemctl reload apache2
  315  sudo /opt/lampp/lampp start
  316  sudo /opt/lampp/lampp restart
  317  cd /etc/apache2/
  318  ls
  319  code apache2.conf 
  320  cd sites-
  321  cd sites-available/
  322  ls
  323  code 000-default.conf 
  324  cd
  325  sudo /opt/lampp/lampp start
  326  sudo nano /opt/lampp/etc/httpd.conf
  327  sudo nano /opt/lampp/etc/extra/httpd-ssl.conf
  328  sudo /opt/lampp/lampp start
  329  sudo /opt/lampp/lampp restart
  330  sudo nano /opt/lampp/etc/extra/httpd-ssl.conf
  331  sudo /opt/lampp/lampp restart
  332  ps aux | grep apache
  333  sudo systemctl stop apache2
  334  sudo /opt/lampp/lampp restart
  335  sudo systemctl status apache2
  336  ps aux | grep apache
  337  sudo tail -n 50 /opt/lampp/logs/error_log
  338  sudo nano /opt/lampp/etc/extra/httpd-ssl.conf
  339  sudo /opt/lampp/lampp restart
  340  sudo nano /opt/lampp/etc/httpd.conf
  341  sudo systemctl stop nginx
  342  sudo /opt/lampp/lampp restart
  343  sudo /opt/lampp/bin/mysql -u root
  344  sudo /opt/lampp/bin/mysql -u root -p
  345  sudo nano /opt/lampp/phpmyadmin/config.inc.php
  346  sudo /opt/lampp/lampp restart
  347  sudo nano /opt/lampp/phpmyadmin/config.inc.php
  348  sudo /opt/lampp/lampp restart
  349  ls
  350  cd ggweb
  351  ls
  352  cd e-commerce-website-grocery-go/
  353  ls
  354  cd serser
  355  cd server
  356  ls
  357  node index.js
  358  cd .ssh
  359  ls
  360  cat authorized_keys 
  361  cd
  362  sudo echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQClHDqaHaQqBfCbJ+RrNJ24pxPbauPJmA1mFurwRj770oF+8kEOX/mffyawKOy7wlMii2d/NSX0VdFP0p/neAu/s67CQu3mSnTEBVePpVvFE+kMA4QitEE2VoyreZ2kjgZgIrx1AFTRdRuxIxNP/fCAsD6WLAw9n1E72X0unfZXPaqPXtTTFS+ThHDPRO+MTCkyYuZGZ3XsQb5eNU2woErIJ98554E7i3Qn/xRFzdk9wJkI5OZC5phW94qNVqr73OJ3shBp5kWlZ2vdhD2PpWmJuxhGUHgT90W4gFvi83vYS90xiTwM3xRRIjSzijqF6TH6hpQtRUOvgPHSR+8zfRQLNGZuMxFIUjwfPmHhMgFS5aWnl3fN4gF6fyZIykX1d/uXFYIdvgIglf3MXr0lSj0eAafoKPxDQPvFyvvQOryajGrbtsovuSiqUePWeHSbq7LiMCmcSSO1xzQZYBTfyzcr0uhPpfuy71WnThEoalOuAeZ0+CSnISdT9TEaJzV7djZtJG/uTcDZWxfHvqUydMJ/j6le8Yrk7ztJ4YrZKSnCO1epHdOGEEIdEHT11SESTy3394Ukhe31U8ninMXkYTvOMIcl/3Ltto6fClchgF9ROXqH4BWqm9rFN2W01k8NHWSnpeYwyKswVBrZjX2FvZnVgZ80xAE+XG3irqm1TzdIXQ== debeilahr@icloud.com" >> .ssh/authorized_keys
  363  cd .ssh
  364  ls
  365  cat authorized_keys
  366  cd
  367  history
  368  ls
  369  cd .ssh
  370  ls
  371  cat authorized_keys
  372  cd
  373  history
  374  echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQClHDqaHaQqBfCbJ+RrNJ24pxPbauPJmA1mFurwRj770oF+8kEOX/mffyawKOy7wlMii2d/NSX0VdFP0p/neAu/s67CQu3mSnTEBVePpVvFE+kMA4QitEE2VoyreZ2kjgZgIrx1AFTRdRuxIxNP/fCAsD6WLAw9n1E72X0unfZXPaqPXtTTFS+ThHDPRO+MTCkyYuZGZ3XsQb5eNU2woErIJ98554E7i3Qn/xRFzdk9wJkI5OZC5phW94qNVqr73OJ3shBp5kWlZ2vdhD2PpWmJuxhGUHgT90W4gFvi83vYS90xiTwM3xRRIjSzijqF6TH6hpQtRUOvgPHSR+8zfRQLNGZuMxFIUjwfPmHhMgFS5aWnl3fN4gF6fyZIykX1d/uXFYIdvgIglf3MXr0lSj0eAafoKPxDQPvFyvvQOryajGrbtsovuSiqUePWeHSbq7LiMCmcSSO1xzQZYBTfyzcr0uhPpfuy71WnThEoalOuAeZ0+CSnISdT9TEaJzV7djZtJG/uTcDZWxfHvqUydMJ/j6le8Yrk7ztJ4YrZKSnCO1epHdOGEEIdEHT11SESTy3394Ukhe31U8ninMXkYTvOMIcl/3Ltto6fClchgF9ROXqH4BWqm9rFN2W01k8NHWSnpeYwyKswVBrZjX2FvZnVgZ80xAE+XG3irqm1TzdIXQ== debeilahr@icloud.com" >> .ssh/authorized_keys
  375  ls
  376  cd ssh
  377  ls
  378  cd
  379  cd .ssh
  380  ls
  381  cat authorized_keys
  382  cd
  383  cd .ssh
  384  ls
  385  ls 
  386  cd .ssh
  387  ls
  388  cat authorized_keys
  389  history
  390  cd
  391  echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQClHDqaHaQqBfCbJ+RrNJ24pxPbauPJmA1mFurwRj770oF+8kEOX/mffyawKOy7wlMii2d/NSX0VdFP0p/neAu/s67CQu3mSnTEBVePpVvFE+kMA4QitEE2VoyreZ2kjgZgIrx1AFTRdRuxIxNP/fCAsD6WLAw9n1E72X0unfZXPaqPXtTTFS+ThHDPRO+MTCkyYuZGZ3XsQb5eNU2woErIJ98554E7i3Qn/xRFzdk9wJkI5OZC5phW94qNVqr73OJ3shBp5kWlZ2vdhD2PpWmJuxhGUHgT90W4gFvi83vYS90xiTwM3xRRIjSzijqF6TH6hpQtRUOvgPHSR+8zfRQLNGZuMxFIUjwfPmHhMgFS5aWnl3fN4gF6fyZIykX1d/uXFYIdvgIglf3MXr0lSj0eAafoKPxDQPvFyvvQOryajGrbtsovuSiqUePWeHSbq7LiMCmcSSO1xzQZYBTfyzcr0uhPpfuy71WnThEoalOuAeZ0+CSnISdT9TEaJzV7djZtJG/uTcDZWxfHvqUydMJ/j6le8Yrk7ztJ4YrZKSnCO1epHdOGEEIdEHT11SESTy3394Ukhe31U8ninMXkYTvOMIcl/3Ltto6fClchgF9ROXqH4BWqm9rFN2W01k8NHWSnpeYwyKswVBrZjX2FvZnVgZ80xAE+XG3irqm1TzdIXQ== debeilahr@icloud.com" >> .ssh/authorized_keys
  392  cd .ssh
  393  ls
  394  cat authorized_keys
  395  cd
  396  ls
  397  clear
  398  ls
  399  cd ssh
  400  ls
  401  cd
  402  cd .ssh
  403  ls
  404  cat authorized_keys 
  405  cd
  406  echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCk0hup1fe270vocX1AWKXUYveHRG/bBE844crr3q9IBSnWEdP83m8PZy7qzPYkZARNtkYktbP/IvE6p5cEOF6dducoqcVmD3O2QtAGe786WHcU8jMHluJJtjIPvnL++XoJ1AoaAmMFebJLDdqhEA73dXUoOdWSkV5bQvnWH+/Ai4YdZmeWHLx6n3H/FRwXNBHL/VRG9p2aA7PiBFD2+SmlH0YVlVF1/cniR26N/wX+Pma5gyGKhl+vAnYLMWAGlV0azT4Fa7COKL85Gmxy+U6zJLZEpHjIPjpGeRzx9kk0cEEBtUhd40iLTExpv9P9Ip0i8cJfiCS39TGTnvz0SmjjptICQIGQ0dgqD80j5M4ZvIBt03YOe/GZ60o7T3Gvh6RwvqsVml1UBvJjyjqnacPN7H+5bRkxEdCJxeOpB+9WJemIyCHM17e43KAioaeAmfoakyWNHmvBbOghIDw/+kgZeBWv0taFn7MWqrV1mj1JSkE76O2FW1v9fRgz7m9G1bU= justjames@justjames-MacBook-Air.local" >> .ssh/authorized_keys
  407  chmod 600 ~/.ssh/authorized_keys
  408  chmod 700 ~/.ssh
  409  pwd
  410  ls
  411  cd ssh
  412  ls
  413  cd
  414  cd .ssh
  415  cat au
  416  ls
  417  history
  418  sudo /opt/lampp/lampp status
  419  cat /opt/lampp/etc/httpd.conf
  420  netstat -tulnp | grep apache
  421  lsof -i :8001
  422  ss -tulnp | grep apache
  423  sudo apt install lsof
  424  lsof -i :8001
  425  sudo /opt/lampp/lampp status
  426  mysql --host=localhost --user=root --password
  427  which mysql
  428  which postgress
  429  which postgres
  430  mysql -u your_username -p grozadb
  431  mysql -u root -p
  432  code .
  433  cd ggweb/
  434  ls
  435  cd e-commerce-website-grocery-go/
  436  ls
  437  cd server/
  438  ls
  439  cd
  440  cd /etc
  441  ls
  442  cd systemd/
  443  cd system/
  444  ls
  445  cat grocery-go-client.service 
  446  cd
  447  ls
  448  cd ggweb/
  449  ls
  450  cd e-commerce-website-grocery-go/
  451  ls
  452  cd server/
  453  ls
  454  cat index.js 
  455  ls
  456  ls -a
  457  cat .env
  458  ls
  459  cat index.js 
  460  sudo vim index.js 
  461  sudo vim .env
  462  npm start
  463  sudo vim index.js 
  464  sudo vim .env
  465  npm start
  466  sudo vim index.js 
  467  sudo vim .env
  468  sudo npm run dev
  469  npm start
  470  ls
  471  cat index.js 
  472  cd ../
  473  ls
  474  cd client/
  475  ls
  476  cd src
  477  ls
  478  cd co
  479  cd 
  480  cd ggweb/e-commerce-website-grocery-go/client/src
  481  cd components/
  482  ls
  483  cd pages/
  484  ls
  485  cd ../
  486  cd home/
  487  ls
  488  cd ../
  489  cd my/
  490  ls
  491  cd ../
  492  cd home/
  493  ls
  494  cd pr
  495  cd product/
  496  ls
  497  cat Product.jsx
  498  cat ProductItems.jsx 
  499  cd ../../
  500  cd
  501  ls
  502  cd ssh
  503  cd
  504  cd .ssh
  505  ls
  506  cat authorized_keys 
  507  cd
  508  sudo systemctl restart ssh
  509  ls
  510  cd ssh
  511  cd
  512  cd .ssh
  513  ls
  514  cat authorized_keys 
  515  ls -l
  516  cd
  517  ls -l
  518  ssh-add -l
  519  sudo vim /etc/ssh/sshd_config
  520  sudo systemctl restart ssh
  521  sudo systemctl restart sshd
  522  sudo vim /etc/ssh/sshd_config
  523  sudo systemctl restart sshd
  524  sudo systemctl restart ssh
  525  sudo vim /etc/ssh/sshd_config
  526  sudo systemctl restart sshd
  527  sudo systemctl restart ssh
  528  ls
  529  echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCk0hup1fe270vocX1AWKXUYveHRG/bBE844crr3q9IBSnWEdP83m8PZy7qzPYkZARNtkYktbP/IvE6p5cEOF6dducoqcVmD3O2QtAGe786WHcU8jMHluJJtjIPvnL++XoJ1AoaAmMFebJLDdqhEA73dXUoOdWSkV5bQvnWH+/Ai4YdZmeWHLx6n3H/FRwXNBHL/VRG9p2aA7PiBFD2+SmlH0YVlVF1/cniR26N/wX+Pma5gyGKhl+vAnYLMWAGlV0azT4Fa7COKL85Gmxy+U6zJLZEpHjIPjpGeRzx9kk0cEEBtUhd40iLTExpv9P9Ip0i8cJfiCS39TGTnvz0SmjjptICQIGQ0dgqD80j5M4ZvIBt03YOe/GZ60o7T3Gvh6RwvqsVml1UBvJjyjqnacPN7H+5bRkxEdCJxeOpB+9WJemIyCHM17e43KAioaeAmfoakyWNHmvBbOghIDw/+kgZeBWv0taFn7MWqrV1mj1JSkE76O2FW1v9fRgz7m9G1bU= justjames@justjames-MacBook-Air.local" >> .ssh/authorized_keys
  530  ls
  531  cd .ssh
  532  ls
  533  cat authorized_keys 
  534  cd
  535  sudo vim /etc/ssh/sshd_config
  536  sudo systemctl restart sshd
  537  sudo systemctl restart ssh
  538  sudo systemctl restart sshd
  539  sudo vim /etc/ssh/sshd_config
  540  sudo systemctl restart sshd
  541  sudo systemctl restart ssh
  542  sudo systemctl restart sshd
  543  sudo vim /etc/ssh/sshd_config
  544  sudo passwd ramalaudebeila
  545  sudo netstat -tulnp
  546  sudo netstat -tulnp | grep mysql
  547  lsof -i :8001
  548  sudo systemctl status apache2
  549  cd
  550  history
  551  cd /opt/lampp/
  552  ls
  553  cd lampp
  554  cd etc
  555  ls
  556  cat httpd.conf
  557  ls
  558  cd ggweb/
  559  ls
  560  cd ggweb/
  561  ls
  562  cd e-commerce-website-grocery-go/
  563  ls
  564  clear
  565  ls
  566  cd client
  567  ls
  568  npm run dev
  569  npm run start
  570  history
  571  sudo systemctl status grocerygo-client
  572  sudo systemctl status grocery-go-client.service
  573  sudo systemctl restart grocery-go-client.service
  574  clear
  575  sudo systemctl stop grocery-go-client.service
  576  npm run start
  577  cd /etc
  578  ls
  579  cd systemd
  580  cd system/
  581  clear
  582  ls
  583  cd e-commerce-website-grocery-go/
  584  ls
  585  cd client
  586  npm run start
  587  sudo systemctl status grocery-go-client.service
  588  sudo systemctl start grocery-go-client.service
  589  sudo systemctl stop grocery-go-client.service
  590  clear
  591  ls
  592  suod npm run dev
  593  suod npm run start
  594  npm run start
  595  npm run dev
  596  npm run start
  597  clear
  598  npm run build
  599  sudo systemctl start grocery-go-client.service
  600  sudo systemctl status grocery-go-client.service
  601  npm run start
  602  sudo systemctl stop grocery-go-client.service
  603  sudo systemctl status grocery-go-client.service
  604  sudo systemctl stop grocery-go-client.service
  605  sudo systemctl status grocery-go-client.service
  606  npm run start
  607  cd ../
  608  ls
  609  git branch
  610  git add .
  611  git commit -m "test"
  612  git config --global user.email "debeilahr@icloud.com"
  613  git config --global user.name "ramalau)"
  614  git config --global user.name "ramalau0"
  615  git add .
  616  git commit -m "test"
  617  git branch
  618  git push origin main
  619  git config --global user.email "debeilahr@icloud.com"
  620  git config --global user.name "ramalau"
  621  git push origin main
  622  ls
  623  cd client/
  624  ls
  625  sudo systemctl status grocery-go-client.service
  626  curl -v  "http://34.70.10.82:3002/api/gro
  627  :q
  628  q
  629  q!
  630  curl -v http://34.70.10.82:3002/api/gro
  631  npm run start
  632  history
  633  sudo /opt/lampp/lampp status
  634  sudo /opt/lampp/lampp start
  635  sudo systemctl stop nginx
  636  sudo /opt/lampp/lampp start
  637  sudo systemctl start nginx
  638  sudo /opt/lampp/lampp status
  639  curl -v http://localhost:3002/api/shops
  640  sudo /opt/lampp/lampp status
  641  curl -X POST http://34.70.10.82:3002/api/shops
  642  curl -X POST https://34.70.10.82:3002/api/shops
  643  curl -X POST http://34.70.10.82:3002/api/shops
  644  curl -X POST https://34.70.10.82:3002/api/shops
  645  curl -X POST http://34.70.10.82:3002/api/shops
  646  cd
  647  ls
  648  cd shh
  649  cd ssh
  650  ls
  651  curl -X POST http://34.70.10.82:3002/api/shops
  652  cd
  653  cd/etc
  654  cd /etc
  655  ls
  656  cd systemd/
  657  cd system/
  658  ls
  659  sudo vim grocery-go-client.service
  660  cd
  661  ls
  662  cd /etc/
  663  ls
  664  cd systemd/
  665  cd system/
  666  ls
  667  sudo vim grocery-go-service.service
  668  sudo systemctl daemon-reload
  669  sudo systemctl restart grocery-go-service
  670  sudo systemctl status grocery-go-service
  671  sudo vim grocery-go-service.service
  672  sudo systemctl restart grocery-go-service
  673  sudo systemctl daemon-reload
  674  sudo systemctl restart grocery-go-service
  675  sudo systemctl status grocery-go-service
  676  sudo vim grocery-go-service.service
  677  ls
  678  sudo rm grocery-go-service.service
  679  sudo vim grocery-go-server.service
  680  sudo systemctl daemon-reload
  681  sudo systemctl restart grocery-go-server.service
  682  sudo systemctl status grocery-go-server.service
  683  sudo systemctl restart grocery-go-server.service
  684  sudo systemctl status grocery-go-server.service
  685  sudo systemctl status grocery-go-service
  686  sudo systemctl stop grocery-go-server.service
  687  sudo systemctl status grocery-go-server
  688  sudo systemctl status grocery-go-server.service
  689  ls
  690  sudo vim grocery-go-server.service
  691  sudo systemctl status grocery-go-server
  692  sudo systemctl start grocery-go-server
  693  sudo systemctl status grocery-go-server
  694  sudo systemctl stop grocery-go-server
  695  cd e-commerce-website-grocery-go/
  696  ls
  697  cd server
  698  ls
  699  npm start
  700  sudo systemctl status nginx
  701  sudo systemctl status grocery-go-service.service
  702  clear
  703  npm run dev
  704  npm start
  705  clear
  706  npm start
  707  ls
  708  cd e-commerce-website-grocery-go/
  709  ls
  710  cd server/
  711  npm start
  712  sudo systemctl start grocery-go-service.service
  713  sudo systemctl start grocery-go-server.service
  714  sudo systemctl restart grocery-go-server.service
  715  sudo systemctl restart grocery-go-client.service
  716  sudo /opt/lampp/lampp status
  717  sudo systemctl stop nginx
  718  sudo /opt/lampp/lampp start
  719  sudo systemctl start nginx
  720  ls
  721  cd e-commerce-website-grocery-go/
  722  cd client/
  723  npm run start
  724  sudo systemctl status grocery-go-client
  725  sudo systemctl stop grocery-go-client
  726  npm run start
  727  npm start
  728  npm run start
  729  sudo systemctl status grocery-go-client
  730  npm run build
  731  npm run start
  732  npm run build
  733  ls
  734  cd ggweb/
  735  ls
  736  cd e-commerce-website-grocery-go/
  737  ls
  738  git branch
  739  cd
  740  .ssh
  741  cd .ssh
  742  ls
  743  ssh-keygen -t rsa -b 4096
  744  ls
  745  cat id_rsa.pub
  746  cd
  747  ls
  748  cd ggweb
  749  ls
  750  cd e-commerce-website-grocery-go/
  751  ls 
  752  git checkout -b develop
  753  git add .
  754  git commit -m "new branch"
  755  git push origin develop
  756  history
  757  git push origin develop
  758  git remote set-url origin git@github.com:ramalau0/e-commerce-website-grocery-go.git
  759  git push origin develop
  760  ls
  761  cd e-commerce-website-grocery-go/
  762  git branch
  763  code .gitignore
  764  git push origin develop
  765  git add .
  766  git commit -m "ignore"
  767  git push origin develop
  768  git add .
  769  git commit -m "ignore"
  770  git push origin develop
  771  git add .
  772  git commit -m "ignore"
  773  git push origin develop
  774  git add .
  775  git commit -m "ignore"
  776  git push origin develop
  777  git rm -r --cached client/node_modules/.cache
  778  git add .gitignore
  779  git commit -m "Removed large cache files and updated .gitignore"
  780  git push origin develop
  781  git rm -r --cached client/node_modules/.cache
  782  java -jar bfg.jar --delete-files client/node_modules/.cache
  783  git reflog expire --expire=now --all
  784  git gc --prune=now --aggressive
  785  git add .
  786  git commit -m "Removed large files and updated .gitignore"
  787  git push origin --force --all
  788  git filter-branch --force --index-filter "git rm --cached -r --ignore-unmatch client/node_modules/.cache" --prune-empty --tag-name-filter cat -- --all
  789  git reflog expire --expire=now --all
  790  git gc --prune=now --aggressive
  791  git push origin --force --all
  792  git rm -r --cached client/node_modules
  793  git commit -m "Removed node_modules from history"
  794  git push origin develop --force
  795  git add .
  796  git commit -m "test"
  797  git push origin develop --force
  798  git filter-branch --force --index-filter "git rm --cached --ignore-unmatch <file-containing-secret>" --prune-empty --tag-name-filter cat -- --all
  799  git commit -m "Removed sensitive data"
  800  git push origin develop --force
  801  git commit -m "Removed sensitive data"
  802  git push origin develop --force
  803  git rev-list --objects --all | grep 060fc8172b2e4398d30ef5934ff79c2caa86450a
  804  git rev-list --objects --all | grep 1bb9ad2e679e4917b4c9e1916b00c836d2b5ade8
  805  git filter-branch --force --index-filter "git rm --cached --ignore-unmatch <file-containing-secret>" --prune-empty --tag-name-filter cat -- --all
  806  git commit -m "Removed sensitive data"
  807  git push origin develop --force
  808  ls
  809  cd ggweb/
  810  ls
  811  cd e-commerce-website-grocery-go/
  812  ls
  813  cd client/
  814  history
  815  sudo systemctl stop grocery-go-service.service
  816  sudo systemctl stop grocery-go-client.service
  817  npm run start
  818  ls
  819  cd ggweb/
  820  ls
  821  cd e-commerce-website-grocery-go/
  822  ls
  823  cd client/
  824  npm run start
  825  ls
  826  npm run start
  827  history
  828  sudo systemctl stop nginx
  829  sudo /opt/lampp/lampp start
  830  sudo systemctl start nginx
  831  ls
  832  cd ggweb/
  833  ls
  834  cd e-commerce-website-grocery-go/
  835  ls
  836  cd client/
  837  ls
  838  npm run start
  839  ls
  840  cd ggweb/
  841  ls
  842  cd e-commerce-website-grocery-go/
  843  ls
  844  cd server/
  845  npm start
  846  ls
  847  cd ggweb/
  848  ls
  849  cd e-commerce-website-grocery-go/
  850  ls
  851  cd server/
  852  ls
  853  npm start
  854  ls
  855  cd ggweb/
  856  sudo systemctl stop grocery-go-client.service
  857  sudo systemctl stop grocery-go-server.service
  858  lsof -i :3000
  859  lsof -i :3002
  860  ls
  861  cd e-commerce-website-grocery-go/
  862  ls
  863  cd client/
  864  clear
  865  npm run dev
  866  npm run start
  867  ls
  868  cd ggweb/
  869  ls
  870  sudo systemctl stop nginx
  871  sudo /opt/lampp/lampp start
  872  sudo systemctl start nginx
  873  sudo systemctl start grocery-go-server.service
  874  ls
  875  cd e-commerce-website-grocery-go/
  876  ls
  877  cd client/
  878  npm run start
  879  sudo systemctl stop grocery-go-client.service
  880  npm run start
  881  npm run build
  882  sudo systemctl start grocery-go-client.service
  883  sudo systemctl status grocery-go-server.service
  884  sudo systemctl stop grocery-go-server.service
  885  sudo systemctl start grocery-go-server.service
  886  ls
  887  cd ggweb/
  888  ls
  889  cd e-commerce-website-grocery-go/
  890  ls
  891  cd client/
  892  clear
  893  npm run build
  894  sudo systemctl restart grocery-go-client.service
  895  npm run build
  896  sudo systemctl restart grocery-go-client.service
  897  npm run build
  898  sudo systemctl restart grocery-go-client.service
  899  npm run build
  900  sudo systemctl restart grocery-go-client.service
  901  npm run build
  902  sudo systemctl restart grocery-go-client.service
  903  npm run build
  904  sudo systemctl restart grocery-go-client.service
  905  npm run build
  906  npm i
  907  npm i date-fns
  908  npm run build
  909  sudo systemctl restart grocery-go-client.service
  910  npm run build
  911  sudo systemctl restart grocery-go-client.service
  912  npm run build
  913  sudo systemctl restart grocery-go-client.service
  914  sudo systemctl restart grocery-go-server.service
  915  sudo systemctl status grocery-go-server.service
  916  sudo systemctl stop grocery-go-server.service
  917  ls
  918  cd ggweb/
  919  ls
  920  cd e-commerce-website-grocery-go/
  921  ls
  922  cd server
  923  npm start
  924  ls
  925  cd ggweb/
  926  ls
  927  cd e-commerce-website-grocery-go/
  928  ls
  929  cd server
  930  ls
  931  history
  932  sudo journalctl -u grocery-go-server.service
  933  sudo systemctl restart grocery-go-server.service
  934  cd syetem
  935  cd /etc/systemd
  936  cd syestem
  937  ls
  938  cd system
  939  ls
  940  sudo nano grocery-go-client.service 
  941  nano grocery-go-server.service 
  942  ls
  943  cd ../../
  944  cd nginx
  945  cd sites-
  946  cd sites-available/
  947  ls
  948  nano grocerygo 
  949  cd
  950  history
  951  history >> history.txt





