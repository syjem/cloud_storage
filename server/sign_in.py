import os
from storage import supabase

email = os.environ.get('EMAIL')
password = os.environ.get('PASSWORD')

session = supabase.auth.sign_in_with_password({
    "email": email,
    "password": password
    })

print(session)
