from django.urls import path
from .views import CreateShowsView, GetShowByIdView

urlpatterns = [
    path('create/shows', CreateShowsView.as_view(), name='create-shows'),
    path('get-show-by-id/<int:id>/', GetShowByIdView.as_view(), name='get-show-by-id'),
]
