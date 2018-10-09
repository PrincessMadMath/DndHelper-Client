export default class MaskMap {
    constructor(maskSize) {
        this._maskSize = maskSize;
        this._fullMask = new Array(maskSize).fill(true);
    }

    _maskMap = new Map();
    _maskSize = 0;
    _fullMask;
    evaluateFullMask = () => {
        this._fullMask = new Array(this._maskSize);
        let allMasks = [...this._maskMap.values()];

        for (let i = 0; i < this._maskSize; i++) {
            this._fullMask[i] = allMasks.every(m => m[i]);
        }
    };

    setMask = (maskName, mask) => {
        this._maskMap.set(maskName, mask);
        this.evaluateFullMask();
    };

    filter = (array) => {
        let that = this;
        return array.filter((_, i) => {
            return that._fullMask[i];
        });
    };

}
