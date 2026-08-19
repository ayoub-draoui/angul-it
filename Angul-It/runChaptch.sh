#!/bin/bash
pkill -f "ng serve"

gnome-terminal -- bash -c "
npm install
npx ng serve
exec bash "