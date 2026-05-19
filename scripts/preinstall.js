const fs = require('fs');

for (const file of ['package-lock.json', 'yarn.lock']) {
  try {
    fs.rmSync(file, { force: true });
  } catch (error) {
    // ignore missing files or permission errors during cleanup
  }
}

if (!/^pnpm\//.test(process.env.npm_config_user_agent || '')) {
  console.error('Use pnpm instead');
  process.exit(1);
}
