function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    })
  }

async function updatePercentage()
{
    let count = 0
    let loader = document.querySelector("#loader")
    let percentage = document.querySelector("#percentage")
    let loadingContent = document.querySelector("#description")
    let profilePanel = document.querySelector("#profile")

    let loadingText = document.querySelector("#description")
    let loadingTextUpdater = setInterval(() =>
    {
        loadingText.textContent += "."
        if (loadingText.textContent.length > 18)
        {
            loadingText.textContent = "Loading Content"
        }
    }, 200)

    let percentageUpdater = setInterval(async () =>
    {
        count++
        percentage.textContent = `${count}%`

        if (count == 100)
        {
            clearInterval(percentageUpdater)
            clearInterval(loadingTextUpdater)
            loader.classList.add("fadeout")
            loadingContent.textContent = "DONE!"
            await sleep(1000)
            loader.remove()
            profilePanel.classList.add("grow")
        }
    }, 21)
}

updatePercentage()