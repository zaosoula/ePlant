const zlib = require('zlib');

const blynk = ({

  $axios,
}) => {
  return {
    history(token) {
      console.log(token);
      return new Promise((resolve, reject) => {

        const getHistoryUrl = async () => {
          let res;
          try {
            res = await $axios.get(`/api/${token}/data/V0`, {
              // maxRedirects:0
            });
          } catch (error) {
            return '/api/' + error.response.request.responseURL.replace(window.location.href, '');
          }
          return;
        }
        getHistoryUrl()
          .then(url => {
            return $axios({
              method: 'get',
              url,
              // url: '/api/contact@zaosoula.fr_1701772591_0_v0_1623918623329.csv.gz',
              responseType: 'arraybuffer'
            })
          })
          .then(res => {

            var binData = new Uint8Array(res.data);

            zlib.gunzip(binData, (err, buffer) => {
              if (err) {
                reject(err);
                return;
              }

              const csv = buffer.toString();
              const lines = csv.split('\n');
              const arr = lines.map((line) => {
                const cols = line.split(',');
                return {
                  date: new Date(parseInt(cols[1])),
                  humidity: parseInt(cols[0])
                }
              })
              resolve(arr);
            });
          })
          .catch(reject);
      });
    }
  }
}
export default (ctx, inject) => {
  inject('blynk', blynk(ctx));
}
