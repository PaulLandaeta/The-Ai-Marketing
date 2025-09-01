import structlog
from structlog.processors import JSONRenderer

from app.application.ports.logger import LoggerPort


structlog.configure(
    processors=[
        structlog.contextvars.merge_contextvars,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.add_log_level,
        JSONRenderer(),
    ]
)


logger = structlog.get_logger()


class StructLogger(LoggerPort):
    def info(self, event: str, **kwargs):
        logger.bind(**kwargs).info(event)

    def error(self, event: str, **kwargs):
        logger.bind(**kwargs).error(event)