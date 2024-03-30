const { sendData, fetchData } = require('./interact');

(async () => {
  await sendData('23');

  
  var k = await fetchData();
  console.log(k);
})();