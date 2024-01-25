/**
 * The options to create an event iterator.
 */
export interface EventIteratorOptions {
  /**
   * At how many events in the queue should "high water mark" events be published?
   */
  highWaterMark?: number | undefined;

  /**
   * At how many events in the queue should "low water mark" events be published?
   */
  lowWaterMark: number | undefined;
}

interface EventQueueEventHandlers {
  highWater(): void;
  lowWater(): void;
}
type EventQueueEvent = keyof EventQueueEventHandlers;

interface Queue<TEvent> {
  push(this: void, value: TEvent): void;
  stop(this: void): void;
  fail(this: void, error: Error): void;

  on<TEventQueueEvent extends EventQueueEvent>(
    this: void,
    event: TEventQueueEvent,
    fn: EventQueueEventHandlers[TEventQueueEvent],
  ): void;
}
type ListenHandler<TEvent> = (queue: Queue<TEvent>) => (() => void) | undefined;

interface AsyncResolver<TEvent> {
  resolve: (response: IteratorResult<TEvent>) => void;
  reject: (error: Error) => void;
}

class EventQueue<TEvent> {
  highWaterMark: number | undefined;
  lowWaterMark: number | undefined;

  readonly pullQueue: Array<AsyncResolver<TEvent>> = [];
  readonly pushQueue: Array<Promise<IteratorResult<TEvent>>> = [];
  readonly eventHandlers: Partial<EventQueueEventHandlers> = {};

  isPaused = false;
  isStopped = false;
  removeCallback?: () => void;

  push(value: TEvent): void {
    if (this.isStopped) return;

    const resolution = { value, done: false };
    if (this.pullQueue.length) {
      const placeholder = this.pullQueue.shift();
      if (placeholder) placeholder.resolve(resolution);
    } else {
      this.pushQueue.push(Promise.resolve(resolution));
      if (
        this.highWaterMark !== undefined &&
        this.pushQueue.length >= this.highWaterMark &&
        !this.isPaused
      ) {
        this.isPaused = true;
        if (this.eventHandlers.highWater) {
          this.eventHandlers.highWater();
        }
      }
    }
  }

  stop(): void {
    if (this.isStopped) return;
    this.isStopped = true;
    this.remove();

    for (const placeholder of this.pullQueue) {
      placeholder.resolve({ value: undefined, done: true });
    }

    this.pullQueue.length = 0;
  }

  fail(error: Error): void {
    if (this.isStopped) return;
    this.isStopped = true;
    this.remove();

    if (this.pullQueue.length) {
      for (const placeholder of this.pullQueue) {
        placeholder.reject(error);
      }

      this.pullQueue.length = 0;
      return;
    }

    const rejection = Promise.reject(error);

    // Attach error handler to avoid leaking an unhandled promise rejection.
    rejection.catch(() => {
      return;
    });
    this.pushQueue.push(rejection);
  }

  remove() {
    void Promise.resolve().then(() => {
      if (this.removeCallback) {
        this.removeCallback();
      }
    });
  }

  [Symbol.asyncIterator](): AsyncIterator<TEvent> {
    return {
      next: (value?: unknown) => {
        const result = this.pushQueue.shift();
        if (result) {
          if (
            this.lowWaterMark !== undefined &&
            this.pushQueue.length <= this.lowWaterMark &&
            this.isPaused
          ) {
            this.isPaused = false;
            if (this.eventHandlers.lowWater) {
              this.eventHandlers.lowWater();
            }
          }

          return result;
        } else if (this.isStopped) {
          return Promise.resolve({ value: undefined, done: true });
        }

        return new Promise((resolve, reject) => {
          this.pullQueue.push({ resolve, reject });
        });
      },

      return: () => {
        this.isStopped = true;
        this.pushQueue.length = 0;
        this.remove();
        return Promise.resolve({ value: undefined, done: true });
      },
    };
  }
}

export class EventIterator<TEvent> implements AsyncIterable<TEvent> {
  private queue: EventQueue<TEvent>;
  /**
   * Returns the default asynchronous iterator interface for this object.
   */
  // @ts-expect-error Somehow TS doesn't understand the assignment in the constructor.
  [Symbol.asyncIterator]: () => AsyncIterator<TEvent>;

  /**
   * Constructs a new event iterator.
   * @param listen - unknown
   * @param options - anonymous options
   */
  constructor(
    listen: ListenHandler<TEvent>,
    options: Partial<EventIteratorOptions> = { highWaterMark: 100, lowWaterMark: 1 },
  ) {
    this.queue = new EventQueue<TEvent>();
    this.queue.highWaterMark = options.highWaterMark ?? 100;
    this.queue.lowWaterMark = options.lowWaterMark ?? 1;

    this.queue.removeCallback =
      listen({
        push: value => {
          this.queue.push(value);
        },
        stop: () => {
          this.queue.stop();
        },
        fail: error => {
          this.queue.fail(error);
        },
        on: (event, fn) => {
          this.queue.eventHandlers[event] = fn;
        },
      }) ??
      (() => {
        return;
      });

    this[Symbol.asyncIterator] = this.queue[Symbol.asyncIterator];
  }
}

export function subscribe(
  this: EventTarget,
  event: string,
  listenerOptions?: AddEventListenerOptions,
  iteratorOptions?: EventIteratorOptions,
): EventIterator<Event> {
  return new EventIterator<Event>(({ push }) => {
    this.addEventListener(event, push, listenerOptions);
    return () => {
      this.removeEventListener(event, push, listenerOptions);
    };
  }, iteratorOptions);
}
