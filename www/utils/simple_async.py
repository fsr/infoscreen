import threading
import time


EMIT_NOTIFICATIONS = False


def ct():
    return time.strftime('%H:%M:%S')


class AsyncExec:
    def __init__(self, f, args=(), kwargs={}, name='unnamed'):
        assert callable(f)
        self._name = name
        self._function = f
        self._args = args
        self._kwargs = kwargs
        self._thread = threading.Thread(target=self._wrapper)
        self._is_running = False

    @property
    def is_running(self):
        return self._is_running

    def _wrapper(self):
        res = self._function(*self._args, **self._kwargs)
        self._result = res
        if EMIT_NOTIFICATIONS:
            print(ct(), 'Thread', self._name, 'finished')

    def start(self):
        if EMIT_NOTIFICATIONS:
            print(ct(), 'Thread', self._name, 'has started')
        if self.has_result():
            delattr(self, '_result')
        if not self.is_running:
            self._is_running = True
            self._thread.start()
        return self

    def has_result(self):
        return hasattr(self, '_result')

    def result(self):
        assert self.has_result()
        return self._result

    @classmethod
    def create_and_start(cls, *args, **kwargs):
        return cls(*args, **kwargs).start()

    def wait(self):
        if self.is_running:
            self._thread.join()
            self._is_running = False
            return self._result
        else:
            raise Exception('You have to start the Thread first.')
