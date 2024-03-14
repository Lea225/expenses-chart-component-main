// Charger les données depuis data.json
fetch('data.json')
.then(response => response.json())
.then(jsonData => {
  const labels = jsonData.map(entry => entry.day);
  const amounts = jsonData.map(entry => entry.amount);

  const backgroundColors = labels.map(day => {
    if (day === 'wed') {
      return 'hsla(186, 34%, 60%, 1)';
    } else {
      return 'hsla(10, 79%, 65%, 1)';
    }
  });

  const hoverBackgroundColors = labels.map(day => {
    if (day === 'wed') {
      return 'hsla(186, 34%, 60%, 0.7)';
    } else {
      return 'hsla(10, 79%, 65%, 0.7)';
    }
  });

  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '', // Laisser le label vide
        data: amounts,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: hoverBackgroundColors,
        borderWidth: 1,
        borderRadius: 5
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false // Masquer complètement la légende
        },
        tooltip: {
          enabled: true, // Activer les tooltips
          displayColors: false, // Ne pas afficher les couleurs
          callbacks: {
            label: function(tooltipItem) {
              return '$' + tooltipItem.formattedValue; // Afficher uniquement le prix
            }
          }
        }
      },
      scales: {
        x: {
          display: true, // Afficher l'axe des abscisses
          grid: {
            display: false // Masquer la grille de l'axe des abscisses
          }
        },
        y: {
          display: false
        }
      }
    }
  });

  // Modifier le style du curseur au survol des colonnes
  const canvas = document.getElementById('myChart');

  canvas.addEventListener('mouseover', function() {
    canvas.style.cursor = 'pointer';
  });

  // Réinitialiser le style du curseur lorsque le survol se termine
  canvas.addEventListener('mouseout', function() {
    canvas.style.cursor = 'default';
  });
})
.catch(error => {
  console.error('Error fetching data:', error);
});
