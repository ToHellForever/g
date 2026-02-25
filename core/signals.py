from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Application
from .tg_bot import send_telegram_message
from django.conf import settings
import asyncio

api_key = settings.TELEGRAM_BOT_API_KEY
user_id = settings.TELEGRAM_USER_ID


def send_telegram_notification(instance):
    try:
        # Формируем сообщение для формы заявки
        contact_method_mapping = {
            "telegram": "Telegram",
            "max": "Max",
            "call": "Звонок",
        }
        contact_method_display = contact_method_mapping.get(
            instance.contact_method, instance.contact_method
        )
        tg_markdown_message = f"""
📩 *Новая заявка!* 📩
👤 **Имя:** {instance.name}
📞 **Телефон:** {instance.phone}

📱 **Предпочтительный способ связи:** {contact_method_display}

📝 **Описание проекта:**
{instance.message}

🔗 **Подробнее:** [Ссылка на заявку](http://127.0.0.1:8000/admin/core/application/{instance.id}/change/)
        """

        # Отправляем сообщение в Telegram
        asyncio.run(send_telegram_message(api_key, user_id, tg_markdown_message))
    except Exception as e:
        print(f"Ошибка отправки сообщения в Telegram: {e}")


@receiver(post_save, sender=Application)
def notify_telegram_on_application_created(sender, instance, created, **kwargs):
    if created:
        print("Application created, sending notification...")
        send_telegram_notification(instance)
