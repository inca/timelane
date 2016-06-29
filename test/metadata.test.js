'use strict';

const expect = require('expect');
const createTimelane = require('../');

describe('metadata', () => {

    let timelane = null;

    beforeEach(() => {
        timelane = createTimelane();
        timelane.start();
    });

    it('should allow any string to be added as metadata', () => {
        expect(() => {
            timelane.finish({ metadata: 'moon was full' });
        }).toNotThrow();

        expect(JSON.stringify(timelane)).toInclude('metadata');
    });

    it('should not allow non-string metadata', () => {
        expect(() => {
            timelane.finish({ metadata: { timelane }});
        }).toThrow();

        expect(JSON.stringify(timelane)).toNotInclude('metadata');
    });

    it('should allow falsy metadata', () => {
        expect(() => {
            timelane.finish({ metadata: null });
            timelane.finish({ metadata: 0 });
            timelane.finish({ metadata: false });
            timelane.finish({ metadata: undefined });
        }).toNotThrow();
         
        expect(JSON.stringify(timelane)).toNotInclude('metadata');
    });

});

