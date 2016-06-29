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

    finish(params) {
        this.finishedAt = Date.now();
        this._evalDuration();

        if (params && typeof params.metadata === 'string') {
            this.metadata = params.metadata;
        } else if (params && params.metadata) {
            throw new Error('Only string allowed as metadata');
        }
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
            'duration',
            'metadata'
        ].reduce((obj, key) => {
            const val = this[key];
            if (typeof val !== 'undefined') {
                obj[key] = val;
            }
            return obj;
        }, {});
    }

});
