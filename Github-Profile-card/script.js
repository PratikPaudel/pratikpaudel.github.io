const APIURL = 'https://api.github.com/users/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const find = document.getElementById('find')

async function fetchUser(username) {

         const { data } = await axios.get(APIURL + username) 
        generateUserBlock(data)
        getRepos(username)
 
}

async function getRepos(username) {
         const { data } = await axios(APIURL + username + '/repos?sort=created') 
        addReposToBlock(data)
}

function generateUserBlock(user) {
    const generateBlockHTML = `
        <div class="block">
            <div> 
                <img src="${user.avatar_url}" alt="" class="avatar">
        </div>
        
        <div class="user-data">
            <h2> ${user.name} </h2>
            <p> ${user.bio} </p>
                <ul> 
                    <li> ${user.followers} <strong> Followers </strong></li>
                    <li> ${user.following} <strong> Following </strong></li>
            <li> ${user.public_repos} <strong> Repos </strong></li>
        </ul>

        <div id="repos"> </div> 
        </div>
        </div>
        
        `
    main.innerHTML= generateBlockHTML
}

function addReposToBlock(repos) {
    const reposEl = document.getElementById ('repos')
    repos
        .slice(0,7)
        .forEach(repo => {
            const repoEl = document.
            createElement('a')
            repoEl.classList.add('repo')
            repoEl.href = repo.html_url
            repoEl.target = '_blank'
            repoEl.innerText = repo.name

            reposEl.appendChild(repoEl)
        })
}

form.addEventListener('submit', (e) => {
    e.preventDefault ()
    const user = find.value

    if (user) {
            fetchUser(user)
            find.value =''
    }
})