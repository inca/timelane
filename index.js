'use strict';

module.exports = createTimeline;

function createTimeline() {
    const timeline = Object.create(Timeline);
    Object.assign(timeline, {
        startedAt: null,
        finishedAt: null,
        timeoutAt: null,
        duration: null
    });
    return timeline;
}

const Timeline = Object.freeze({

    start() {
        this.startedAt = Date.now();
    },

    finish() {
        this.finishedAt = Date.now();
        this._evalDuration();
    },

    timeout() {
        this.timeoutAt = Date.now();
        this._evalDuration();
    },

    _evalDuration() {
        if (!this.startedAt) {
            this.duration = null;
            return;
        }
        const endTimestamp = this.timeoutAt || this.finishedAt || 0;
        if (!endTimestamp) {
            this.duration = null;
            return;
        }
        this.duration = Math.max(endTimestamp - this.startedAt, 0);
    },

    toJSON() {
        return [
            'startedAt',
            'finishedAt',
            'timeoutAt',
            'duration'
        ].reduce((obj, key) => {
            obj[key] = this[key]
            return obj;
        }, {});
    }

});
