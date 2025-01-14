const  fetchError = (err) => {
    let startIndex = err.indexOf(", ");
    let error = err.slice(startIndex+2,-1);
    return error;
}

const pythonLimiter = {
    limiter:`
import signal
import time

def handler(signum, frame):
    raise Exception("Temps d'exécution dépassé")

signal.signal(signal.SIGALRM, handler)
signal.alarm(3)
    `
}

module.exports = { fetchError,pythonLimiter };