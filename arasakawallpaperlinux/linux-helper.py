#!/usr/bin/env python3
import json
import os
import subprocess
import time
from http.server import SimpleHTTPRequestHandler, HTTPServer
from socketserver import ThreadingMixIn
import psutil

PORT = 5511
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

last_net = psutil.net_io_counters()
last_time = time.time()

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def log_message(self, format, *args):
        pass

    def do_GET(self):
        path = self.path.split("?", 1)[0]
        if path == "/state":
            self.send_media_state()
        elif path == "/sys":
            self.send_sys_info()
        elif path in ("/prev", "/playpause", "/next"):
            self.send_media_cmd(path)
        else:
            super().do_GET()

    def send_media_state(self):
        try:
            status = subprocess.check_output(["playerctl", "status"], text=True, stderr=subprocess.DEVNULL).strip()
            title = subprocess.check_output(["playerctl", "metadata", "title"], text=True, stderr=subprocess.DEVNULL).strip()
            artist = subprocess.check_output(["playerctl", "metadata", "artist"], text=True, stderr=subprocess.DEVNULL).strip()
            album = subprocess.check_output(["playerctl", "metadata", "album"], text=True, stderr=subprocess.DEVNULL).strip()
            try:
                pos = int(float(subprocess.check_output(["playerctl", "position"], text=True, stderr=subprocess.DEVNULL).strip()) * 1000)
            except Exception:
                pos = 0
            try:
                dur_str = subprocess.check_output(["playerctl", "metadata", "mpris:length"], text=True, stderr=subprocess.DEVNULL).strip()
                dur = int(dur_str) // 1000 if dur_str else 0
            except Exception:
                dur = 0
            data = {
                "title": title or "",
                "artist": artist or "",
                "album": album or "",
                "status": "Playing" if status.lower() == "playing" else "Paused",
                "pos": pos,
                "dur": dur,
                "canSeek": True
            }
        except Exception:
            data = {}
        self.respond(data)

    def send_media_cmd(self, path):
        cmd_map = {
            "/prev": ["playerctl", "previous"],
            "/playpause": ["playerctl", "play-pause"],
            "/next": ["playerctl", "next"]
        }
        if path in cmd_map:
            try:
                subprocess.run(cmd_map[path], check=False, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            except Exception:
                pass
        self.send_response(204)
        self.end_headers()

    def send_sys_info(self):
        global last_net, last_time
        cpu = psutil.cpu_percent(interval=0.1)
        mem = psutil.virtual_memory()
        now = time.time()
        net = psutil.net_io_counters()
        dt = max(0.1, now - last_time)
        down_speed = (net.bytes_recv - last_net.bytes_recv) / dt
        up_speed = (net.bytes_sent - last_net.bytes_sent) / dt
        last_net, last_time = net, now

        data = {
            "CurrentCpu": round(cpu, 1),
            "CurrentGpu3D": 0,
            "CurrentRamAvail": mem.available,
            "TotalRam": mem.total,
            "CurrentNetDown": max(0, down_speed),
            "CurrentNetUp": max(0, up_speed)
        }
        self.respond(data)

    def respond(self, data):
        body = json.dumps(data).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

if __name__ == "__main__":
    server = ThreadedHTTPServer(("127.0.0.1", PORT), Handler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
