from supabase import create_client, Client
from configs import Config

supabase: Client = create_client(Config.URL, Config.API_KEY)
