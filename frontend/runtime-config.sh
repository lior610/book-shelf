#!/bin/sh
# Configuration file to be created
  file=./runtime-config.js
# Destination folder to copy generated runtime-config.js file
  destfile=/usr/share/nginx/html/
# Remove file on exists
  [-f $file ] && rm $file
# Append data to the file
  echo "window['runtime'] = $config" >> $file
# Default value is taken when environment variable not found.
# ${service_url     :-  "http://localhost:3000"} 
#  [Env variable]            [Default value]
# Any no. of env variables can be added with predefined syntax  
echo "$(cat <<EOM
         window['runtime'] =
          {
          "REACT_APP_DATA_API": "${REACT_APP_DATA_API:-"http://localhost:5002"}",
          "REACT_APP_LOGIN_API": "${REACT_APP_LOGIN_API:-"http://localhost:8000"}"          
}
EOM
)" > $file
# Move generated file to build folder
mv $file $destfile