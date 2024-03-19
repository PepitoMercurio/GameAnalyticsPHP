#!/bin/bash

# Ouvrir le premier terminal et se rendre dans le dossier Node.js
start "/Node" /D "/Node" cmd /k "cd /Node"

# Ouvrir le deuxième terminal et se rendre dans le dossier PHP
start "/back" /D "/back" cmd /k "cd /back"

# Ouvrir le troisième terminal et se rendre dans le dossier React
start "/front" /D "/front" cmd /k "cd /front"
