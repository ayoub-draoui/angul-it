#!/bin/bash


gnome-terminal -- bash -c "
npm install
npx ng serve
exec bash "