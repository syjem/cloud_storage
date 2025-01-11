def format_size(size: int) -> str:
    """
    Convert the size from bytes to (KB or MB).
    """
    if size < 1024:
        return f"{size} B"
    elif size < 1024 ** 2:
        return f"{size / 1024:.2f} KB"
    else:
        return f"{size / (1024 ** 2):.2f} MB"
