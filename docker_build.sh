#!/bin/bash

for file in $(ls)
do
    if [[ -d $file ]]
    then
        docker build -t $file $file
    fi
done