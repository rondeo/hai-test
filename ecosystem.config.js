module.exports = {
  apps: [{
    name: 'Bilagsky API',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {
      user: 'root',
      host: '172.104.48.209',
      ref: 'origin/master',
      repo: 'git@gitlab.com:orytonas/sso.git',
      path: '/var/www/accounts',
      "post-setup": "npm install; pm2 start server.js -n Accounts; systemctl restart nginx",
      "post-deploy": "npm install; pm2 reload Accounts; systemctl restart nginx",
      "ssh_options": [
        "StrictHostKeyChecking=no",
        "PasswordAuthentication=no"
      ]
    }
  }
};