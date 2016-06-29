'use strict';

const expect = require('expect');
const createTimelane = require('../');

describe('timelane', () => {

    it('should have duration=0 if start not called', () => {
        const timelane = createTimelane();
        timelane.finish();
        expect(JSON.stringify(timelane)).toInclude('"duration":null');
    });

    it('should allow treat timeout as special case', () => {
        const timelane = createTimelane();
        timelane.timeout();
        expect(JSON.stringify(timelane)).toInclude('"duration":null');
    });

    it('should have duration=null when not finished and not timed out', () => {
        const timelane = createTimelane();
        expect(JSON.stringify(timelane)).toInclude('"duration":null');
    });

    it('should have duration=null when started but not finished and not timed out', () => {
        const timelane = createTimelane();
        timelane.start();
        timelane._evalDuration();
        expect(JSON.stringify(timelane)).toInclude('"duration":null');
    });

});

