{ lib
, pkgs
, buildPythonApplication
, buildPythonPackage
, fetchFromGitHub 
, pyproj
, numpy
, requests
, misaka
, flask
, python-forecastio
, dvb-source
, flask-misaka-source
}:
let

dvb = buildPythonPackage rec {
  pname = "dvb";
  version = "1.2.0";

  src = dvb-source;

  doCheck = false;
  propagatedBuildInputs = [ pyproj numpy requests ];
};

flask-misaka = buildPythonPackage rec {
  pname = "flask-misaka";
  version = "1.0.0";

  src = flask-misaka-source;

  doCheck = false;
  propagatedBuildInputs = [ flask misaka ];
};

in buildPythonApplication rec {
  pname = "fsr-infoscreen";
  version = "2.1.0";
  
  src = ./.;

  propagatedBuildInputs = [ flask python-forecastio flask-misaka dvb ];
  
  installPhase = ''
    mkdir -p $out/build/middleware
    install -Dm755 middleware/infoscreen.py $out/build/middleware
    mkdir -p $out/share/infoscreen
    wrapPythonPrograms
  '';

  makeWrapperArgs = [
    "--prefix PYTHONPATH : $out/share/fsr-infoscreen"
  ];

  meta = with lib; {
    description = "A minimal python server which supplies the fsr infoscreen with information.";
    homepage = "https://github.com/fsr/infoscreen";
    license = licenses.mit;
    maintainers = with maintainers; [ revol-xut ];
  };
}
