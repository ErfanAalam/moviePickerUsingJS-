const wrapper = document.querySelector(".wrapper")
const btn = document.querySelector("button")
const input = document.querySelector("input")

const imgsrc = "emptyimage.jpg"

let query = "";

input.addEventListener("change", () => {
    query = input.value;
});

btn.addEventListener("click", () => {
    fetchData();
})


function fetchData() {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=d2c3e4f129f33f3a39481dee98fbdd6e`
    fetch(url).then(async (response) => {
        let data = await response.json()
        displayResult(data.results)
    })
}

function displayResult(results) {
    wrapper.innerHTML = ""
    results.length == 0 ?
        wrapper.innerHTML = "No Movie Found" :
        results.map((result) => {
            let box = document.createElement("div")
            let image = document.createElement("img")
            let title = document.createElement("h3")
            box.classList.add("box")
            wrapper.appendChild(box)
            box.appendChild(image)
            box.appendChild(title)
            image.src = result.poster_path ? "https://image.tmdb.org/t/p/original" + result.poster_path : imgsrc;
            title.innerText = result.title
            fetchTrailer(result.id, box)
        })
}

function fetchTrailer(id, box) {
    const videourl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=d2c3e4f129f33f3a39481dee98fbdd6e&append_to_response=videos`

    fetch(videourl).then(async (response) => {
        let videodata = await response.json()
        
            const anchor = document.createElement("a")
            box.appendChild(anchor)
            const href = "https://www.youtube.com/watch?v="
            anchor.innerText = "watch trial"
            anchor.href = href + videodata.results[0].key
    })
}