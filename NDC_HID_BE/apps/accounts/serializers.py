from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.authtoken.models import Token

class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        exclude = ('password',)

class UserAddSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    class Meta:
        model = get_user_model()
        fields = '__all__'
        extra_kwargs = {
            'password': {
                'write_only': True,
                'min_length': 5,
            },
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        if self.context.get('created_by'):
            validated_data['created_by'] = self.context['created_by']
            validated_data['updated_by'] = self.context['updated_by']
        user = get_user_model().objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def get_token(self, user):
        token, _ = Token.objects.get_or_create(user=user)
        return token.key

class UpdateUserDetailsByAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = '__all__'
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'password': {
                'required': False,
                'write_only': True,
                'min_length': 4,
            },
        }

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)

        for (key, value) in validated_data.items():
            setattr(instance, key, value)

        if password is not None:
            instance.set_password(password)

        instance.save()
        return instance

class PasswordResetSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('password',)
        extra_kwargs = {
            'password': {'write_only': True},
        }
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)

        if password is not None:
            instance.set_password(password)

        instance.save()
        return instance

class UserAddSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = '__all__'
        extra_kwargs = {
            'password': {
                'write_only': True,
                'min_length': 4,
            },
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        if self.context.get('created_by'):
            validated_data['created_by'] = self.context['created_by']
            validated_data['updated_by'] = self.context['updated_by']
        user = get_user_model().objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def get_token(self, user):
        token, _ = Token.objects.get_or_create(user=user)
        return token.key



