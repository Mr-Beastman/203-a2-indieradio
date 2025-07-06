from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

# take date and return the start and end of the week.
def getWeek(date: datetime, timezoneStr: str = 'Pacific/Auckland'):

    timezone = ZoneInfo(timezoneStr)
    
    # adding in timezone awareness
    if date.tzinfo is None:
        date = date.replace(tzinfo=timezone)
    else:
        date = date.astimezone(timezone)

    startWeek = date - timedelta(days=date.weekday())
    startWeek = startWeek.replace(hour=0, minute=0, second=0, microsecond=0)

    endWeek = startWeek + timedelta(days=7)

    return startWeek, endWeek