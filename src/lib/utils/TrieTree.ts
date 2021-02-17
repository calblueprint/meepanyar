const TrieSearch = require('trie-search');

export interface TrieTreeInterface<T> {
    addAll: (objectsToAdd: T[]) => void;
    get: (prefix: string) => T[];
}

// Trie-search doesn't have a defined type to pull from.
// To remedy this, we define our own makeshift Trie class with interface
export default class TrieTree<T> implements TrieTreeInterface<T> {
    private trie: any;

    constructor(prefixField: string) {
        this.trie = new TrieSearch(prefixField);
    }

    public addAll(objectsToAdd: T[]) {
        this.trie.addAll(objectsToAdd)
    }

    public get(prefix: string) {
        return this.trie.get(prefix);
    }

}