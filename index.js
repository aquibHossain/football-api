const  search=()=>{
    const searchText=document.getElementById("searchText")
    const url=`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchText.value}`
    if(searchText.value=='')
    {
      const club=document.getElementById("single")
      club.innerHTML='<p class="text-center fs-1 fw-bold col">Please Enter Something</p>'
      const clubs=document.getElementById("clubs")
      clubs.textContent=''
    }
    else{
      searchText.value=''
    
      fetch(url)
      .then(response=>response.json())
      .then(data=>displayClub(data))
    }
    
}

const displayClub=data=>{
  const club=document.getElementById("single")
  club.textContent=''
    const clubs=document.getElementById("clubs")
    clubs.textContent=''
    data.teams.forEach(element => {
        const div=document.createElement("div")
        
        div.innerHTML=`
              <div onclick="club(${element.idTeam})" class="card h-100">
                <img src="${element.strTeamBadge}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${element.strTeam}</h5>
                  <p class="card-text">${element.strDescriptionEN.slice(0,200)}.</p>
                </div>
              </div>
        `
        div.className="col"
        clubs.appendChild(div)
    });
}

const club =async id=>{
  const url=`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${id}`
  const response=await fetch(url)
  const data=await response.json()
  displayTeam(data);
}

const displayTeam=data=>{
  const club=document.getElementById("single")
  club.textContent=''
  data.teams.forEach(element=>{
    const div=document.createElement("div")
    div.innerHTML=`
    <div style="background-image:linear-gradient(blue,skyblue,white);"  class="card h-100 w-50 mx-auto">
      <img src="${element.strTeamBadge}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${element.strTeam}</h5>
        <p class="card-text">${element.strDescriptionEN.slice(0,200)}.</p>
      </div>
    </div>
  `
  club.appendChild(div)
  })


  console.log(data);
}