#!/bin/bash

printf "Setting up necessary resources"

printf "docker"
docker pull postgres
docker run --name watchtower -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -p 5432:5432 -v /data:/var/lib/postgresql/data -d postgres

printf "android"
ANDROID_DEVICES=$(adb devices)
DEVICE_COUNT=$(grep -c "emulator-" "${ANDROID_DEVICES}")
if [$DEVICE_COUNT -ge 1]
    then adb reverse tcp:3000 tcp:3000
else
    printf "Couldn't find android device"
fi

printf "setup complete"
