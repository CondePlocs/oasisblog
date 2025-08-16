module.exports = {
  apps: [{
    name: 'oasis-blog',
    script: 'npm',
    args: 'start',
    cwd: '/home/ubuntu/oasisblog',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/home/ubuntu/.pm2/logs/oasis-blog-error.log',
    out_file: '/home/ubuntu/.pm2/logs/oasis-blog-out.log',
    log_file: '/home/ubuntu/.pm2/logs/oasis-blog-combined.log'
  }]
};
