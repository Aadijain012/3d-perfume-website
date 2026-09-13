import re
import urllib.request
import urllib.parse
import os

file_id = "1hbXIkUImbBzi3786utLbtWTqL3siJC1B"
destination = "public/velora-video.mp4"

def get_confirm_token(response):
    for key, value in response.headers.items():
        if key.lower() == 'set-cookie':
            match = re.search(r'download_warning=([^;]+)', value)
            if match:
                return match.group(1)
    return None

def download_file_from_google_drive(id, dest):
    URL = f"https://drive.usercontent.google.com/download?id={id}&export=download&authuser=0&confirm=t"
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    
    req = urllib.request.Request(URL, headers=headers)
    try:
        with urllib.request.urlopen(req) as response, open(dest, 'wb') as out_file:
            print(f"Content-Type: {response.headers.get('Content-Type')}")
            print(f"Content-Length: {response.headers.get('Content-Length')}")
            chunk_size = 32768
            total = 0
            while True:
                chunk = response.read(chunk_size)
                if not chunk:
                    break
                out_file.write(chunk)
                total += len(chunk)
                if total % (1024 * 1024) < chunk_size:
                    print(f"Downloaded: {total / (1024 * 1024):.2f} MB")
            print(f"Finished downloading {dest}, total bytes: {total}")
    except Exception as e:
        print(f"Error direct: {e}")
        # fallback to standard uc url
        url2 = f"https://docs.google.com/uc?export=download&id={id}"
        req2 = urllib.request.Request(url2, headers=headers)
        with urllib.request.urlopen(req2) as response, open(dest, 'wb') as out_file:
            out_file.write(response.read())
            print(f"Fallback finished, size: {os.path.getsize(dest)}")

if __name__ == "__main__":
    download_file_from_google_drive(file_id, destination)
