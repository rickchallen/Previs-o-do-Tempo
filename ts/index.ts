const form =  document.querySelector("#search-form > form");
const input: HTMLInputElement | null = document.querySelector("#input-localizacao");
const sectionInfos = document.querySelector("#tempo-info")

form?.addEventListener("submit",async (event)=>{
  event.preventDefault()
  
  if(!input || !sectionInfos) return
  const localizacao = input.value

   if(localizacao.length < 3){
    alert("O local Precisa ter ,pelo menos,3 letras")
    return

  }

const resposta= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&lang=pt&appid=f6fbf6fd7def663bd50311de7d9d2c93&units=metric`)

const dados = await resposta.json()

const infos = {
  temperatura: Math.round(dados.main.temp),
  local: dados.name,
  icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png` 
}
  sectionInfos.innerHTML =`
  <div class="tempo-dados">
        <h2>${infos.local}</h2>
        <span>${infos.temperatura}</span>
      </div>
      
       <img src=${infos.icone}  alt="">`
  console.log(dados)
})