from typing import Protocol


class ClockPort(Protocol):
    def now_ts(self) -> float: ...