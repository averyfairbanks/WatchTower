#!/bin/bash

if [ $# -gt 1 || $1 -ne "android" ]
then
    printf "You must provide one argument, the mobile platform you are targeting"
    exit
fi

printf "Setting up necessary resources"

printf "docker"
docker pull postgres
cd /server
docker compose up

if [$0 === 'android']
then
    printf "android"
    ANDROID_DEVICES=$(adb devices)
    if [[$ANDROID_DEVICES =~ "emulator-"]]
        then adb reverse tcp:3000 tcp:3000
    else
        printf "Couldn't find android device"
    fi
fi

printf "setup complete"
