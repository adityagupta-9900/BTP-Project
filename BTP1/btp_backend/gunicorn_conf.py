"""gunicorn WSGI server configuration."""
from multiprocessing import cpu_count
from os import environ

TIMEOUT=120

def max_workers():
    return cpu_count() * 2 + 1

max_requests = 1000
worker_class = 'sync'
workers = max_workers()

bind = "127.0.0.1:8008"

