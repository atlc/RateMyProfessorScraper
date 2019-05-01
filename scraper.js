// Clears ad containers from within document, if present
let ads = [...document.getElementsByClassName('ad-placement-container')];
ads.forEach(ad => ad.parentNode.removeChild(ad))

let reviewDates = [];
let reviewCourses = [];
let scores = [];
let reviews = [];
let reviewComments = [];
let reviewInstructor = `${document.getElementsByClassName('pfname')[0].innerText} ${document.getElementsByClassName('plname')[0].innerText}`

let keepScrollingToBottom = setInterval(function () {
    window.scrollTo(0, document.body.scrollHeight);
    document.getElementById('loadMore') === null ? stopScroll() 
        : !document.getElementById('loadMore').getAttribute('style') ? document.getElementById('loadMore').click() : stopScroll()
}, 1250);

let stopScroll = function () {
    clearInterval(keepScrollingToBottom)
    parseData()
}

function parseData() {
    [...document.getElementsByClassName('date')].forEach(rv => reviewDates.push(rv.innerText));
    [...document.getElementsByClassName('name')].forEach(rv => reviewCourses.push(rv.innerText));
    [...document.getElementsByClassName('score')].forEach(rv => scores.push(parseInt(rv.innerText)));

    let reviewOverallQuality = scores.filter((e, i, a) => i % 2 == 0);
    let reviewLevelDifficulty = scores.filter((e, i, a) => i % 2);
    [...document.querySelectorAll('.comments > p')].forEach(rv => reviewComments.push(rv.innerText))

    for (i = 0; i < reviewDates.length; i++) {
        reviews.push({
            date: reviewDates[i],
            instructor: reviewInstructor,
            course: reviewCourses[i],
            quality: reviewOverallQuality[i],
            difficulty: reviewLevelDifficulty[i],
            comment: reviewComments[i]
        });
    }
    copy(reviews)
}

