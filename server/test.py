import requests

url = "https://syjem-solid-halibut-564pj9p6g9r27p7x-8000.app.github.dev/api/images/screen_shots"

email = 'jemuel.work@gmail.com'
password = 'admin:jemuel'

data = {
    "email": email,
    "password": password
}

headers = {
    "Content-Type": "application/json"
}

response = requests.get(url)

if not response.ok:
    print("Failed to Sign in..")
    print(f"Status Code: {response.status_code}")

    try:
        error_data = response.json()
        print("Error Response:", error_data)

    except ValueError:
        print("Error Response (raw):", response.text)

else:
    print("Sign in successful...")
    print("Response:", response)
