const { spawnSync } = require("node:child_process");
const path = require("node:path");

const mode = process.argv[2];

if (!["dev", "build", "start"].includes(mode)) {
  console.error("Usage: node scripts/next.js <dev|build|start>");
  process.exit(1);
}

if (process.platform === "win32") {
  const result = spawnSync(
    "powershell.exe",
    [
      "-NoProfile",
      "-ExecutionPolicy",
      "Bypass",
      "-File",
      path.join(__dirname, "next.ps1"),
      "-Mode",
      mode,
    ],
    { stdio: "inherit", cwd: path.resolve(__dirname, "..") }
  );

  process.exit(result.status ?? 1);
}

const nextCli = path.resolve(
  __dirname,
  "..",
  "node_modules",
  "next",
  "dist",
  "bin",
  "next"
);
const args = [nextCli, mode];

if (mode === "dev" || mode === "build") {
  args.push("--webpack");
}

const result = spawnSync(process.execPath, args, {
  stdio: "inherit",
  cwd: path.resolve(__dirname, ".."),
});

process.exit(result.status ?? 1);
