import sys
import applescript
import subprocess

usage = "Usage: aerospace-cmd-app.py (focus|pull) [app]"

def focus_window(wid):
    subprocess.call(f"aerospace focus --window-id {wid}", shell=True)

def move_window_to_focused_workspace(wid):
    f = str(subprocess.check_output("aerospace list-workspaces --focused | awk -F '|' '{print $1}' | tr -d ' '", shell=True), "utf-8")
    subprocess.call(f"aerospace focus --window-id {wid}", shell=True)
    subprocess.call(f"aerospace move-node-to-workspace {f}", shell=True)
    subprocess.call(f"aerospace workspace {f}", shell=True)
    subprocess.call(f"aerospace focus --window-id {wid}", shell=True)

if len(sys.argv) == 3:
    query = f"""aerospace list-windows --all | awk -F '|' "{{if (\\$2 ~ /{sys.argv[2]}/) print}}" """
elif len(sys.argv) == 2:
    query = "aerospace list-windows --all"
else:
    print(usage)
    sys.exit(1)

op = sys.argv[1]
if op not in ["focus", "pull"]:
    print(usage)
    sys.exit(1)

windows = str(subprocess.check_output(query, shell=True), "utf-8")
windows = windows.split("\n")
windows = [w.split("|") for w in windows if w]
windows = [[i.strip() for i in w] for w in windows]
print(windows)

if len(windows) == 1:
    if op == "focus":
        focus_window(windows[0][0])
    elif op == "pull":
        move_window_to_focused_workspace(windows[0][0])
    sys.exit(0)
elif len(windows) >= 2:
    indicators = [f"{w[0]}|{w[1]}|{w[2]}" for w in windows]
    choices = ",".join([f"\"{i}\"" for i in indicators])
    r = applescript.run(f'choose from list {{{choices}}} with prompt "Please select" without multiple selections allowed and empty selection allowed')
    wid = r.out.split("|")[0]
    if op == "focus":
        focus_window(wid)
    elif op == "pull":
        move_window_to_focused_workspace(wid)
