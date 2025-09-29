from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    GEMINI_API_KEY: str

    GEMINI_MODEL: str = "gemini-2.5-flash"
    
    model_config = SettingsConfigDict(env_file=".env")

# Instância única  para ser usada em todo o projeto
settings = Settings()