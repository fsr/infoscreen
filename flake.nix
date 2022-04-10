{
  description = "FSR Fruitbasket Flake";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-21.11";
    utils.url = "github:numtide/flake-utils";

    dvb-source = {
      url = "github:revol-xut/dvbpy";
      flake = false;
    };

    flask-misaka-source = {
      url = "github:singingwolfboy/flask-misaka";
      flake = false;
    };

  };
  outputs = { self, nixpkgs, utils, dvb-source, flask-misaka-source}: 
  utils.lib.eachDefaultSystem (system: let
    pkgs = nixpkgs.legacyPackages.${system};
    infoboard = pkgs.python39Packages.callPackage ./fsr-infoscreen.nix {
      pkgs = pkgs;
      dvb-source = dvb-source;
      flask-misaka-source = flask-misaka-source;
    };
    in rec {
      checks = packages;
      packages.fsr-infoscreen = infoboard;
      overlay = (final: prev: {
        fsr-infoscreen = infoboard;
      });
    }
   );
}
