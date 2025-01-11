from datetime import datetime


def format_date(timestamp: str) -> str:
    """
    Format a timestamp string to return only the date in 'YYYY-MM-DD' format.
    """
    try:
        return datetime.fromisoformat(timestamp.replace("Z", "")).date().isoformat()
    except ValueError:
        return timestamp
