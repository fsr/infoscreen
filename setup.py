from setuptools import setup

setup(
   name='fsr-infoscreen',
   version='2.1',
   description='monitor inside the fsr office',
   author='revol-xut',
   author_email='tassilo.tanneberger@ifsr.de',
   packages=['middleware'],  #same as name
   install_requires = [ 'dvb', 'Flask', 'Flask-Misaka', 'forecastiopy' ]
)

