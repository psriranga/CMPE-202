from django.urls import path
from .views import CreateShowsView, ShowGetDeleteAPI

urlpatterns = [
    path('create/shows', CreateShowsView.as_view(), name='create-shows'),
    path('show/<int:id>', ShowGetDeleteAPI.as_view(), name='show-get-delete-api')
]
