from django.db import models
from django.contrib.auth.models import User

class Employee(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.PROTECT,
        blank=True,
        null=True,
        related_name='employees',
        verbose_name='Funcionário'
    )
    name = models.CharField(
        max_length=100,
        verbose_name='Nome'
        )
    cpf = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        unique=True,
        verbose_name='CPF'
        )
    position = models.CharField(
        max_length=100,
        verbose_name='Cargo'
        )
    wage = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name='Salário'
        )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Data de Contratação'
        )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Ultima Alteração'
        )
    exit_time = models.DateTimeField(
        blank=True,
        null=True,
        verbose_name='Data de Saída'
        )

    class Meta:
        verbose_name = 'Funcionário'
        verbose_name_plural = 'Funcionários'

    def __str__(self):
        return self.name