#!/bin/bash

focused_workspace=$(aerospace list-workspaces --focused | awk -F '|' '{print $1}' | tr -d ' ')
app_windows=$(aerospace list-windows --all | awk -F '|' "{if (\$2 ~ /$1/) print \$1}" | tr -d ' ')

for app_window in $app_windows; do
    # echo "######### focus $app_window move $focused_workspace #########"
    # aerospace list-windows --all
    aerospace focus --window-id $app_window
    aerospace move-node-to-workspace $focused_workspace
    aerospace focus --window-id $app_window
done
