import os
from dotenv import load_dotenv

load_dotenv()

class Config():
    URL: str = os.getenv('SUPABASE_URL')
    API_KEY: str = os.getenv('SUPABASE_API_KEY')
