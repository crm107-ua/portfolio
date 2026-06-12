module.exports = {
  apps: [
    {
      name: "portfolio",
      script: "npm",
      args: "start",
      cwd: "/var/www/html/portfolio/portfolio",
      env: {
        NODE_ENV: "production",
        PORT: 4944,
      },
    },
  ],
};
