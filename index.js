const express = require ('express');
const Jimp = require ('jimp');
const app = express ();
const port = process.env.PORT || 8080;


const randomBetween = (a, b) => a < b ? Math.floor(Math.random() * b) + a : Math.floor(Math.random() * a) + b  
const quotes = require ('./quotes');

const images = [
  {filename: 'adolf-hitler.jpg', label: 'Adolf Hitler'},
  {filename: 'albert-einstein.jpg', label: 'Albert Einstein'},
  {filename: 'alexander-great.jpg', label: 'Alexander Great'},
  {filename: 'aristotle.jpg', label: 'Aristotle'},
  {filename: 'chairman-mao.jpg', label: 'Chairman Mao'},
  {filename: 'charles-darwin.jpg', label: 'Charles Darwin'},
  {
    filename: 'christopher-columbus.jpg',
    label: 'Christopher Columbus',
  },
  {filename: 'cleopatra.jpg', label: 'Cleopatra'},
  {filename: 'dalai-lama.jpg', label: 'Dalai Lama'},
  {filename: 'galileo.jpg', label: 'Galileo'},
  {filename: 'gandhi.jpg', label: 'Gandhi'},
  {filename: 'genghis-khan.jpg', label: 'Genghis Khan'},
  {filename: 'george-washington.jpg', label: 'George Washington'},
  {filename: 'johannes-gutenberg.jpg', label: 'Johannes Gutenberg'},
  {filename: 'john-f.-kennedy.jpg', label: 'John F. Kennedy'},
  {filename: 'karl-marx.jpg', label: 'Karl Marx'},
  {filename: 'leonardo-da-vinci.jpg', label: 'Leonardo Da Vinci'},
  {filename: 'marcus-aurelius.jpg', label: 'Marcus Aurelius'},
  {filename: 'martin-luther-king.jpg', label: 'Martin Luther King'},
  {filename: 'mother-teresa.jpg', label: 'Mother Teresa'},
  {filename: 'mozart.jpg', label: 'Mozart'},
  {filename: 'muhammad-ali.jpg', label: 'Muhammad Ali'},
  {filename: 'napoleon.jpg', label: 'Napoleon'},
  {filename: 'nelson-mandela.jpg', label: 'Nelson Mandela'},
  {filename: 'plato.jpg', label: 'Plato'},
  {filename: 'queen-victoria.jpg', label: 'Queen Victoria'},
  {filename: 'rene-descartes.jpg', label: 'Rene Descartes'},
  {filename: 'shakespeare.jpg', label: 'Shakespeare'},
  {filename: 'simon-bolivar.jpg', label: 'Simon Bolivar'},
  {filename: 'sir-isaac-newton.jpg', label: 'Sir Isaac Newton'},
  {filename: 'socrates.jpg', label: 'Socrates'},
  {filename: 'thomas-edison.jpg', label: 'Thomas Edison'},
  {filename: 'voltaire.jpg', label: 'Voltaire'},
  {filename: 'winston-churchill.jpg', label: 'Winston Churchill'},
];

app.use (express.static ('public'));

app.get ('/', (req, res) => {
  //   console.log (JSON.stringify (quotes, null, 2));
  let imageIdx = randomBetween(0, images.length - 1)
  let nameIdx = randomBetween(0, images.length - 1)
  let quoteIdx = randomBetween(0, quotes.length - 1)
  let path = './public/images/';
  let filename = images[imageIdx].filename
  let name = images[nameIdx].label
  let quote = quotes[quoteIdx]
  console.log('quote', quote)
  let background = './public/black.jpg';
  Jimp.read (background)
    .then (bg => {
      Jimp.read (path + filename).then (fg => {
        fg.scaleToFit (500, 261);
        bg.composite (fg, 0, 0).quality (100)
        Jimp.loadFont (Jimp.FONT_SANS_16_WHITE).then (font => {
          bg
            .print (
              font,
              fg.getWidth() + 10,
              0,
              {
                text: quote,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
              },
              500 - fg.getWidth () - 20,
              261
            )
            .print (
              font,
              fg.getWidth(),
              0,
              {
                text: name,
                alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT,
                alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM,
              },
              500 - fg.getWidth () - 10,
              261 - 10
            )
            .writeAsync ('img.jpg')
            .then (_ => {
              console.log (_);
              res.sendFile ('img.jpg', {root: __dirname});
            });
        });
      });
    })
    .catch (err => {
      console.error (err);
      res.send ('error');
    });

  // res.json (quotes);
});

app.listen (port, () => console.log (`Ness Bekri listening on port ${port}!`));

// const clearLinks = _ => document.querySelectorAll('div > div:nth-child(3) > table > tbody > tr:nth-child(2) > td:nth-child(2) > div > a').forEach(x => {
//     let _x = x.previousElementSibling
//     let x_ = x.nextElementSibling
//     let _x_ = document.createElement('span')
//     _x_.innerText = _x.innerText + ' ' + x.innerText + ' ' + x_.innerText
//     _x.replaceWith(_x_)
//     x.parentElement.removeChild(x)
//     x_.parentElement.removeChild(x_)
// })
// const getProverbsFromPage = _ => $$('div > div:nth-child(3) > table > tbody > tr:nth-child(2) > td:nth-child(2) > div > span:nth-child(n+4)').map(_=>_.innerText.trim()).filter(_=>_!=="")
// clearLinks()
// JSON.stringify(getProverbsFromPage())

// const getQuotes = _ => document.querySelectorAll('#stylesheet_body > div:nth-child(3) > table > tbody > tr > td:nth-child(2) ol > li').map(x => {
//     x.removeChild(x.querySelector('font'))
//     return x.innerText
// })
// JSON.stringify(getQuotes())

// 500 x 261
