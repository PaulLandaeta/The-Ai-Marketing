import structlog
from app.application.ports.logger import LoggerPort


logger = structlog.get_logger()


class StructLogger(LoggerPort):
    def info(self, event: str, **kwargs):
        logger.info(event, **kwargs)

    def error(self, event: str, **kwargs):
        logger.error(event, **kwargs)