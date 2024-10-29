{ pkgs, lib, config, inputs, ... }:

{
  env.GREET = "LE-dev";

  packages = [ 
    pkgs.git
    pkgs.nodejs_20
    pkgs.figlet
  ];

  processes = {} // lib.optionalAttrs (!config.devenv.isTesting) {
    backend_start.exec = "cd service && npm install && npm run build && npm run start:dev";
    frontend_start.exec = "cd ui && npm install && npm run dev";
  };

  enterShell = ''
    figlet $GREET
  '';

  enterTest = ''
  '';
}
