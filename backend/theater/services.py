from django.contrib.gis.geos import Point
from theater.models import Theater


def theater_create(
    *,
    name: str,
    location: Point,
) -> Theater:
    theater = Theater(
        name=name,
        location=location,
    )
    theater.save()
    return theater