const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "29d4da8facmsh2127697d318b220p1337a1jsn04c53f3e26d1",
    "x-rapidapi-host": "shazam.p.rapidapi.com",
  },
};
export class API {
  // Popüler şarkıları almak için:

  async getPopular() {
    //  -const url = 'https://shazam.p.rapidapi.com/search?term=Amy%20Winehouse';

    //const data = await fetch(url,options);
    //   console.log(data);
    // Api'a istek attık :
    // const response = await fetch(url,options);

    //Api'den gelen veiyi JS nesnesine Çevirmek için:
    // const data =await response.json();
    // console.log(data);

    // const formattedData = data.tracks.hits.map((item)=>item.track);
    // console.log(formattedData);
    // return formattedData;
    // !birleştirmek için denedik:
    // const data = await this.searchMusic("neffex");
    // const data1 = await this.searchMusic("eminem");
    // const data2 =data1.concat(data);
    // return data2;
    // Todo: SPREAD OPERATÖRÜ İLE YAPTIK:!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Eldeki değeri tutup yeni değerleri de kaydedip yeni güncel bir data veriyor:
    const data = await this.searchMusic("Amy Winehouse");
    const data1 = await this.searchMusic("Queen");
    const data2 = await this.searchMusic("tupac");
    console.log(data);

    // Todo: Üç noktayla bunu yaptık..
    return [...data, ...data1, ...data2];
  }

  // Aratılan şarkı verisini alan fonksiyon yazdık:

  async searchMusic(query) {
    const url = `https://shazam.p.rapidapi.com/search?term=${query}`;

    // Aratılan değer ile api'a istek atmak için:
    const res = await fetch(url, options);
    // Gelen veriyi js nesnesine çevirmek için:
    const data = await res.json();
    // console.log(data);
    // Veriyi projeye uygun şekilde dönüştürmek için:
    const formattedData = data.tracks.hits.map((item) => item.track);

    return formattedData;
    // console.log(formattedData);
  }
}
