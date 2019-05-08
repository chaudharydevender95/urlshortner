module.exports.initializeCharToIndexTable = function(){
    charToIndexTable = new Map();
    var i;
    for (i = 0; i < 26; ++i) {
        var c = 'a';
        c = c.charCodeAt(0) + i;
        charToIndexTable.set(String.fromCharCode(c), i);
    }
    for (i = 26; i < 52; ++i) {
        var c = 'A';
        c = c.charCodeAt(0) + (i-26);
        charToIndexTable.set(String.fromCharCode(c), i);
    }
    for (i = 52; i < 62; ++i) {
        var c = '0';
        c = c.charCodeAt(0) + (i - 52);
        charToIndexTable.set(String.fromCharCode(c), i);
    }

    return charToIndexTable;
}

module.exports.initializeIndexToCharTable = function() {
    // 0->a, 1->b, ..., 25->z, ..., 52->0, 61->9
    indexToCharTable = [];
    var i;
    for (i = 0; i < 26; ++i) {
        var c = 'a';
        c = c.charCodeAt(0) + i;
        indexToCharTable.push(String.fromCharCode(c));
    }
    for (var i = 26; i < 52; ++i) {
        var c = 'A';
        c = c.charCodeAt(0) + (i-26);
        indexToCharTable.push(String.fromCharCode(c));
    }
    for (var i = 52; i < 62; ++i) {
        var c = '0';
        c = c.charCodeAt(0) + (i - 52);
        indexToCharTable.push(String.fromCharCode(c));
   }

   return indexToCharTable;
}

module.exports.createUniqueID = function(id) {
    var base62ID = convertBase10ToBase62ID(id);
    var uniqueURLID = '';
    for (var i=0;i<base62ID.length;i++) {
        uniqueURLID += (indexToCharTable[base62ID[i]]);
    }
    return uniqueURLID.toString();
}
function convertBase10ToBase62ID(id) {
    console.log('id'+id);
    var digits = [];
    while(id > 0) {
        var remainder = (id % 62);
        digits.unshift(remainder);
        // ((LinkedList<Integer>) digits).addFirst(remainder);
        id = id/62;
        id = Math.floor(id);
    }
    return digits;
}

module.exports.getDictionaryKeyFromUniqueID = function(uniqueID) {
    var base62Number = [];
    for (var i = 0; i < uniqueID.length; ++i) {
        base62Number.push(uniqueID.charAt(i));
    }
    
    var dictionaryKey = convertBase62ToBase10ID(base62Number);
    return dictionaryKey;
}

function convertBase62ToBase10ID(ids) {
    var id = 0;
    var exp = ids.length - 1;
    for (var i = 0; i < ids.length; i++, --exp) {
        var base10 = charToIndexTable.get(ids[i]);
        id += (base10 * Math.pow(62.0, exp));
    }
    return id;
}