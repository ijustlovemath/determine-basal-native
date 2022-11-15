import sys
import json
import time
from pprint import pprint


path = sys.argv[1]
with open(path, 'r') as f:
    contents = f.read()
    pprint(contents)
    glucose = json.loads(contents)
    glucose["date"] = time.time() * 1000.0
    pprint(glucose)

with open(path, 'w') as f:
    json.dump(glucose, f)