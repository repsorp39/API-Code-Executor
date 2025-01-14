
import signal
import time

def handler(signum, frame):
    raise Exception("Temps d'exécution dépassé")

signal.signal(signal.SIGALRM, handler)
signal.alarm(3)
    
print('hey')