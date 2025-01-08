const { spawn } = require('child_process');

    const viteProcess = spawn('npm', ['run', 'vite']);

    viteProcess.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    viteProcess.stderr.on('data', (data) => {
      console.error(data.toString());
    });

    viteProcess.on('close', (code) => {
      console.log(`Vite process exited with code ${code}`);
    });
