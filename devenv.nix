{ pkgs, lib, config, ... }:

{
  env.GREET = "LE-dev";

  packages = [
    pkgs.git
    pkgs.figlet
  ];

  languages.typescript.enable = true;

  processes = { } // lib.optionalAttrs (!config.devenv.isTesting) {
    backend_start.exec = "cd service && npm install && npm run build && npm run start:dev";
    frontend_start.exec = "cd ui && npm install && npm run dev";
  };

  enterShell = ''
    figlet $GREET
  '';

  enterTest = ''
  '';

  tasks = {
    "ui:install" = {
      exec = "cd ui && npm install";
      before = [ "devenv:enterTest" ];
    };
    "service:install" = {
      exec = "cd service && npm install";
      before = [ "devenv:enterTest" ];
    };
  };

  pre-commit.hooks = {
    shellcheck.enable = true;
    nixpkgs-fmt.enable = true;
    actionlint.enable = true;
    beautysh.enable = true;
    deadnix.enable = true;
    detect-private-keys.enable = true;
  };
}
