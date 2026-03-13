from django.db import models


class Application(models.Model):
    CONTACT_METHOD_CHOICES = [
        ("telegram", "Telegram"),
        ("max", "Max"),
        ("call", "Звонок"),
    ]

    name = models.CharField(max_length=100, verbose_name="Имя")
    phone = models.CharField(max_length=20, verbose_name="Телефон")
    contact_method = models.CharField(
        max_length=10,
        choices=CONTACT_METHOD_CHOICES,
        default="phone",
        verbose_name="Предпочтительный способ связи",
    )
    message = models.TextField(verbose_name="Описание проекта")
    privacy_agreement = models.BooleanField(
        default=False,
        verbose_name="Согласие с политикой конфиденциальности",
        blank=False,
        null=False,
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")

    def __str__(self):
        return f"Заявка от {self.name} ({self.created_at})"

    class Meta:
        verbose_name = "Заявка"
        verbose_name_plural = "Заявки"


class Project(models.Model):
    name = models.CharField(
        max_length=100, help_text="Название проекта", default="Без названия"
    )
    link = models.URLField(
        blank=True, null=True, help_text="Ссылка на проект", default=""
    )

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Проект"
        verbose_name_plural = "Проекты"


class ProjectPhoto(models.Model):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="photos"
    )
    image = models.ImageField(upload_to="project_photos/")
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Photo {self.id} for Project {self.project.name}"

    class Meta:
        ordering = ["order"]
        verbose_name = "Фотография проекта"
        verbose_name_plural = "Фотографии проектов"


class AboutCarousel(models.Model):
    image_desktop = models.ImageField(
        upload_to="carousel_images/desktop",
        help_text="Изображение для слайда на десктопе",
        blank=True,
        null=True,
    )
    image_mobile = models.ImageField(
        upload_to="carousel_images/mobile",
        help_text="Изображение для слайда на мобильных устройствах",
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name_plural = "Слайды в карусели"


class Service(models.Model):
    name = models.CharField(max_length=200, verbose_name="Название услуги")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Услуга"
        verbose_name_plural = "Услуги"


class SubService(models.Model):
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name="subservices",
        verbose_name="Услуга",
    )
    name = models.CharField(max_length=200, verbose_name="Название подуслуги")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена")

    def __str__(self):
        return f"{self.service.name} - {self.name}"

    class Meta:
        verbose_name = "Подуслуга"
        verbose_name_plural = "Подуслуги"
