from rest_framework import serializers
from .models import  Movie

class MovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = ['id', 'name', 'runtime', 'genre', 'rating', 'show_timings', 'description']

    def create(self, validated_data):
        movie = Movie.objects.create(**validated_data)
        # for cast_member_data in cast_data:
        #     cast_member, created = CastMember.objects.get_or_create(**cast_member_data)
        #     movie.cast.add(cast_member)
        return movie
