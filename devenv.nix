{ pkgs, lib, config, inputs, ... }:

{
  env.GREET = "LE-dev";

  packages = [ 
    pkgs.git
    pkgs.nodejs_20
  ];

  enterShell = ''
  '';
}
