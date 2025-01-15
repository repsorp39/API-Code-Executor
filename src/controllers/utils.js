const  fetchError = (err, lang) => {
   if(lang === "py"){
        let startIndex = err.indexOf(", ");
        let error = err.slice(startIndex+2,-1);
        return error;
   }else if(lang === "js"){
    const regex = /\^\n\n(.+?)\n/;
    const match = err.match(regex);
    return (!match || !match[0]) ? "": match[0];
   }
}


module.exports = { fetchError};