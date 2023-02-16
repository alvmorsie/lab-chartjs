const getApiData = () => {
  // const colors = {
  //   solids: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
  //   alphas: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)']
  // }

  axios
    .get('https://multiapi-app.fly.dev/coasters/allCoasters')
    .then(({ data }) => {
      drawFirstChart(data)
      drawSecondChart(data)
      drawThirdChart(data)
    })
    .catch(err => console.log(err))
}

//Comparador de velocidad:
function drawFirstChart(coasters) {
  const fastestCoasters = coasters.sort((a, b) => b.speed - a.speed).slice(0, 5)
  console.log(fastestCoasters)
  const data = {
    labels: fastestCoasters.map(({ name }) => name),
    datasets: [{
      data: fastestCoasters.map(({ speed }) => speed),
      backgroundColor: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)'],
      borderColor: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
      borderWidth: 2
    }]
  }

  const options = {
    plugins: {
      legend: {
        display: true
      }
    }
  }

  new Chart('chart1', {
    type: 'bar',
    data,
    options
  })
}

//COMPARADOR DE LONGITUDES:
function drawSecondChart(coasters) {
  const data = {
    labels: ['<1000m', '1000m-1500m', '>1500m'],
    datasets: [{
      data: [
        coasters.filter(coaster => coaster.length <= 1000).length,
        coasters.filter(coaster => coaster.length < 1500 && coaster.length > 1000).length,
        coasters.filter(coaster => coaster.length >= 1500).length,

      ],
      backgroundColor: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)'],
      borderColor: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
      borderWidth: 2
    }]
  }

  const options = {
    plugins: {
      legend: {
        display: true
      }
    }
  }

  new Chart('chart2', {
    type: 'doughnut',
    data,
    options
  })
}


function drawThirdChart(coasters) {
  const data = {
    labels: ['EEUU', 'Spain', 'Japan', 'China'],
    datasets: [{
      data: [
        coasters.filter(coaster => coaster.country === 'United States').length,
        coasters.filter(coaster => coaster.country === 'Spain').length,
        coasters.filter(coaster => coaster.country === 'Japan').length,
        coasters.filter(coaster => coaster.country === 'China').length,
      ],
      backgroundColor: ['rgba(116, 72, 194, 0.4)', 'rgba(33, 192, 215, 0.4)', 'rgba(217, 158, 43, 0.4)', 'rgba(205, 58, 129, 0.4)', 'rgba(156, 153, 204, 0.4)', 'rgba(225, 78, 202, 0.4)'],
      borderColor: ['rgba(116, 72, 194, 1)', 'rgba(33, 192, 215, 1)', 'rgba(217, 158, 43, 1)', 'rgba(205, 58, 129, 1)', 'rgba(156, 153, 204, 1)', 'rgba(225, 78, 202, 1)'],
      borderWidth: 2
    }]
  }

  const options = {
    plugins: {
      legend: {
        display: true
      }
    }
  }

  new Chart('chart3', {
    type: 'polarArea',
    data,
    options
  })
}


getApiData()