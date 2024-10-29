{ pkgs, lib, config, ... }:

{
  env.GREET = "LE-dev";

  packages = [
    pkgs.git
    pkgs.nodejs_20
    pkgs.figlet
  ];

  processes = { } // lib.optionalAttrs (!config.devenv.isTesting) {
    backend_start.exec = "cd service && npm install && npm run build && npm run start:dev";
    frontend_start.exec = "cd ui && npm install && npm run dev";
  };

  enterShell = ''
    figlet $GREET
  '';

  enterTest = ''
  '';

  pre-commit.hooks = {
    run-tests = {
      enable = true;
      name = "Application tests.";
      description = "Starts application tests such as linter checks, unit tests and so on.";
      entry = "sh .test.sh";
    };
    shellcheck.enable = true;
    nixpkgs-fmt.enable = true;
    actionlint.enable = true;
    beautysh.enable = true;
    deadnix.enable = true;
    detect-private-keys.enable = true;
    eslint.enable = true;
  };
}
