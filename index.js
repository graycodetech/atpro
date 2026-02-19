const primaryColor = '#6366f1'
const warningColor = '#f59e0b'
const successColor = '#22c55e'
const dangerColor = '#ef4444'

const themeCookieName = 'theme'
const themeDark = 'dark'
const themeLight = 'light'

const body = document.getElementsByTagName('body')[0]

function setCookie(cname, cvalue, exdays) {
  var d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = "expires="+d.toUTCString()
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

function getCookie(cname) {
  var name = cname + "="
  var ca = document.cookie.split(';')
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ""
}

loadTheme()

function loadTheme() {
	var theme = getCookie(themeCookieName)
	body.classList.add(theme === "" ? themeLight : theme)
}

function switchTheme() {
	if (body.classList.contains(themeLight)) {
		body.classList.remove(themeLight)
		body.classList.add(themeDark)
		setCookie(themeCookieName, themeDark)
	} else {
		body.classList.remove(themeDark)
		body.classList.add(themeLight)
		setCookie(themeCookieName, themeLight)
	}
}

function collapseSidebar() {
	body.classList.toggle('sidebar-expand')
}

function toggleSubMenu(el) {
	el.classList.toggle('open')
	let subMenu = el.nextElementSibling
	if (subMenu) {
		subMenu.classList.toggle('open')
	}
}

window.onclick = function(event) {
	openCloseDropdown(event)
}

function closeAllDropdown() {
	var dropdowns = document.getElementsByClassName('dropdown-expand')
	for (var i = 0; i < dropdowns.length; i++) {
		dropdowns[i].classList.remove('dropdown-expand')
	}
}

function openCloseDropdown(event) {
	if (!event.target.matches('.dropdown-toggle')) {
		closeAllDropdown()
	} else {
		var toggle = event.target.dataset.toggle
		var content = document.getElementById(toggle)
		if (content.classList.contains('dropdown-expand')) {
			closeAllDropdown()
		} else {
			closeAllDropdown()
			content.classList.add('dropdown-expand')
		}
	}
}

// Charts
function initDashboardChart() {
	var ctx = document.getElementById('myChart')
	if (!ctx) return

	ctx.height = 500
	ctx.width = 500
	var data = {
		labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
		datasets: [{
			fill: false,
			label: 'Production (m³)',
			borderColor: primaryColor,
			data: [1500, 1450, 1600, 1550, 1700, 1650],
			borderWidth: 3,
			lineTension: 0.4,
			pointRadius: 4,
		}, {
			fill: false,
			label: 'Consumption (m³)',
			borderColor: successColor,
			data: [1100, 1080, 1200, 1150, 1300, 1250],
			borderWidth: 3,
			lineTension: 0.4,
			pointRadius: 4,
		}]
	}

	new Chart(ctx, {
		type: 'line',
		data: data,
		options: {
			maintainAspectRatio: false,
		}
	})
}

function initNRWCharts() {
	var pieCtx = document.getElementById('nrwPieChart')
	if (pieCtx) {
		new Chart(pieCtx, {
			type: 'pie',
			data: {
				labels: ['Billed Auth. Consumption', 'Unbilled Auth. Consumption', 'Apparent Losses', 'Real Losses'],
				datasets: [{
					data: [76, 4, 5, 15],
					backgroundColor: [successColor, primaryColor, warningColor, dangerColor]
				}]
			}
		})
	}

	var barCtx = document.getElementById('nrwBarChart')
	if (barCtx) {
		new Chart(barCtx, {
			type: 'bar',
			data: {
				labels: ['DMA-01', 'DMA-02', 'DMA-03', 'DMA-04'],
				datasets: [{
					label: 'NRW %',
					backgroundColor: warningColor,
					data: [18, 24, 32, 15]
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true,
							max: 100
						}
					}]
				}
			}
		})
	}
}

initDashboardChart()
initNRWCharts()
