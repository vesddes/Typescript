"use strict";
function sortArray(arr, keyOrCompareFn) {
    if (typeof keyOrCompareFn === "function") {
        return [...arr].sort(keyOrCompareFn);
    }
    else {
        return [...arr].sort((a, b) => {
            if (a[keyOrCompareFn] < b[keyOrCompareFn])
                return -1;
            if (a[keyOrCompareFn] > b[keyOrCompareFn])
                return 1;
            return 0;
        });
    }
}
