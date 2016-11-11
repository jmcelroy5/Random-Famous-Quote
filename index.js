(function () {
	var COLORS = ['#54dbc2', '#ff3b52', '#5d4484', '#ffbd0d']
	var colorIdx = -1
	var quoteEl
	var quoteContainerEl
	var bgColorChangeEls
	var tweetButton

	var changeColors = function () {
		colorIdx++
		if (colorIdx === COLORS.length) colorIdx = 0
		const newColor = COLORS[colorIdx]
		bgColorChangeEls.forEach(function (el) {
			el.style.backgroundColor = newColor
		})
		quoteContainerEl.style.color = newColor
	}

	var getRandomQuote = function () {
		var quoteRequest = new XMLHttpRequest()
		quoteRequest.open('POST', 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous', true)
		quoteRequest.setRequestHeader('X-Mashape-Key', '2dajc94buymshGH0xvDAFf7FyJ3hp1qtXZ4jsntirQtp8sW5mF')
		quoteRequest.onreadystatechange = function () {
			if (quoteRequest.readyState === 4 && quoteRequest.status === 200) {
				const resp = JSON.parse(quoteRequest.responseText)
				updateQuoteInDOM({quote: resp.quote, author: resp.author})
			}
		}
		quoteRequest.send()
	}

	var updateQuoteInDOM = function ({quote, author}) {
		quoteEl.innerHTML = `${quote} <div class="author">&mdash;${author}</div>`
		const tweet = `"${quote}" - ${author}`
		tweetLink.href = 'https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent(tweet)
		changeColors()
	}

	document.addEventListener('DOMContentLoaded', function (){
		quoteContainerEl = document.getElementById('quote-container')
		quoteEl = document.getElementById('quote')
		tweetLink = document.getElementById('tweet-link')
		bgColorChangeEls = Array.prototype.slice.call(document.getElementsByClassName('change-bg-color'))
		// initialize first quote
		getRandomQuote()
		// add button event listener
		document.getElementById('quote-me-button').addEventListener('click', getRandomQuote)
	})
})()
