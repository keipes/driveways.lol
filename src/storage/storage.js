
export default class Storage {
    constructor(key, version) {
        this.prefixKey = `${key}.${version}`;
    }
}