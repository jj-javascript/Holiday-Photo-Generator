// alert('You are not the father')

// Gus Prevas helped me design the function below which in a future version I will use to get dates with holidays embedded into a calendar.

addEventListener('load', getAllDates)
document.getElementById('country').addEventListener('change', getAllDates)

function getAllDates () {
    const countryText = document.getElementById('country').value
    const api_url = "https://holidayapi.com/v1/holidays"
    const apiKeyParam = '?key='
    const myKey = `8280133f-761d-4c81-b63e-8e115fbe7aa0`
    const countryParam = `&country=`
    const countryValue = countryText
    const prettyParam = '&pretty='
    const pretty = true
    const yearParam = `&year=`
    const yearValue = "2025"

    fetch(`https://holidayapi.com/v1/holidays?key=${myKey}&country=${countryValue}&year=${yearValue}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.holidays)
        })
}

/*
On-Load Function
- Event Listener for Afgh. that takes in all of the holidays/holiday list
Dynamically integrate them into calendar
2nd Event Listener for changing of the country
Dynamically integrate selected country holiday list into calendar
Function can cover both instances at once



*/


document.querySelector('button').addEventListener('click', getHolidays)




// This reload page on second click function was found through Google


// https://holidayapi.com/v1/holidays?country=US&year=2024&month=12&pretty=true&key=
// THIS IS WHAT WORKS: https://holidayapi.com/v1/holidays?key=8280133f-761d-4c81-b63e-8e115fbe7aa0&country=US&year=2024&month=10&day=15
// THIS WORKS V2: https://holidayapi.com/v1/holidays?key=8280133f-761d-4c81-b63e-8e115fbe7aa0&country=${countryText}&year=2024&month=09
// &day=4 - what I took out from Day = 
/*
 if (data === null || data === undefined || (Array.isArray(data) && data.length === 0) || (typeof data === 'object' && Object.keys(data).length === 0)) {
      console.log("No data returned from the server."); - GET THIS TO WORK
*/

// Here I was trying to figure out what to do to get a random photo each time

// Michael Kazin helped me debug the getPhotos function here.
function getPhotos (holiday) {
    const clientID = `yFREYlIwVmbzWttWfptvltsVEVSyq2i3xDqcbe-PWyM`
    const query = holiday.name + ' ' + document.querySelector('option:checked').textContent.split(' ')[0] 

    // document.querySelector('p').innerHTML = ''

    fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${clientID}&count=3`)
    .then(res => res.json())
    .then(data => {
            data.results.forEach (result => {
                const img = document.createElement('img')
                img.src = result.urls.regular
                document.querySelector('p').appendChild(img)
                // document.createElement('img').src += data.results[i].urls.regular
                // document.querySelector('div').appendChild('img')
    // document.querySelector('img').src = data.results[1].urls.regular + data.results[1].urls.regular + data.results[2].urls.regular   
    // document.querySelector('img').src = data.results[1].urls.regular 
    // document.querySelector('img').src = data.results[2].urls.regular  
    })
    // Sarah Yu helped me debug the function above.

})
    }

function getHolidays() {
    const countryText = document.getElementById('country').value
    const holyMonth = document.getElementById('monyear').value
    const api_url = "https://holidayapi.com/v1/holidays"
    const apiKeyParam = '?key='
    const myKey = `8280133f-761d-4c81-b63e-8e115fbe7aa0`
    const countryParam = `&country=`
    const countryValue = countryText
    const prettyParam = '&pretty='
    const pretty = true
    const yearParam = `&year=`
    const yearValue = "2025"
    const monthParam = `&month=`
    const monthValue = String(holyMonth).substring(5, 7)
    const dayParam = `&day=`
    const dayValue = String(holyMonth).substring(8, 10)
    const url = api_url +  apiKeyParam + myKey + countryParam + countryValue + yearParam + yearValue + monthParam + monthValue
    const proxxyURL = 'https://api.allorigins.win/raw?url='; + encodeURIComponent(url) 
    // Shawn Holmes showed me how to use the encodeURIcomponent

    document.querySelector('p').innerHTML = ''
// Gus Prevas also helped me debug a couple small issues in this function including making it so that you can enter search items consistently without manually having to refresh.

    fetch(`https://holidayapi.com/v1/holidays?key=${myKey}&country=${countryValue}&year=${yearValue}&month=${monthValue}&day=${dayValue}`)
    // Justin Joshi helped me fix my fetch from the original structure I had in const url above. Justin also helped me set up the forEach function below.
        .then(res => res.json())
        .then(data => {
            console.log(data.holidays)
            data.holidays.forEach((x, i) => {
                document.getElementById('holidayname').innerHTML = data.holidays[i].name
                getPhotos (data.holidays[i])
            }) 
            if (data.holidays.length === 0) {
                console.log("No data returned from the server.");
                document.getElementById('holidayname').innerHTML = 'No Holiday On This Date'
            }

        })
        // .catch(error => {
        //     // console.log(`error ${error}`);
        // })

}


