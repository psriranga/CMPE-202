from django.contrib.gis.geos import Point
from theater.models import Theater

def theater_create(
    *,
    name: str,
    location: Point,
    zip_code: str,
    technologies: list,  # New parameter
    seatingCategories: list,  # New parameter
    cuisines: list,  # New parameter
    shows: list,  # New parameter
    no_of_rows: int,
    no_of_cols: int
) -> Theater:
    theater = Theater(
        name=name,
        location=location,
        zip_code=zip_code,
        technologies=technologies,
        seatingCategories=seatingCategories,
        cuisines=cuisines,
        shows=shows,
        no_of_rows=no_of_rows,
        no_of_cols=no_of_cols
    )
    theater.save()
    return theater
