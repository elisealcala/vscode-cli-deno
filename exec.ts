const response = Deno.run({
  cmd: [
    "deno",
    "install",
    "--allow-read",
    "--allow-env",
    "--allow-run",
    "--unstable",
    "-f",
    "app.ts",
  ],
});

await response.status();
