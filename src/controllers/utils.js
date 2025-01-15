
const  fetchError = (err, lang) => {

   if(lang === "py"){
      let startIndex = err.indexOf(", ");
      let error = err.slice(startIndex+2,-1);
      return error;
   }

   else if(lang === "js"){
      const regex = /\^\n\n(.+?)\n/;
      const match = err.match(regex);
      return (!match || !match[0]) ? "": match[0];
   }

   else {
      let startIndex = err.indexOf("c_area\n");
      let endIndex = err.indexOf("\nat ");
      let out = err.slice(startIndex+7,endIndex);
      out  = out.replace(/\/codesource/g, " file \t")
      return  out;
   }

  
}


module.exports = { fetchError};