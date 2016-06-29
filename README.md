Use it to track time of asynchronous events using explicit `start`, `finish`
and `timeout` markers.

## Usage

```es6
import createTimeline from 'timelane';

const timelines = {
    sleep: createTimeline(),
    awake: createTimeline()
};

Promise.resolve()
    .then(() => timelines.sleep.start())
    .then(() => ...)
    .then(() => timelines.sleep.finish({ metadata: 'moon was full' }))
    .then(() => timelines.awake.start())
    ...
    .then(() => timelines.awake.finish());
```

Each timeline will contain `startedAt`, `finishedAt`, `timeoutAt` and
auto-evaluated `duration`.

That's it :)
