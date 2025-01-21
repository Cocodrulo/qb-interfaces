fx_version "cerulean"
game "gta5"

author "Cocodrulo"
version "0.0.1"
description "QBCore Interface script"

ui_page "html/index.html"

shared_scripts {
    "Config.lua"
}

client_scripts {
    "client/main.lua"
}

files {
    "html/index.html",
    "html/main.js",
    "modules/**/app.js",
    "modules/**/style.css",
}