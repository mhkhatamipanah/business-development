const disableBtn = (idBtn)=>{
    if(document.getElementById(idBtn)){
        document.getElementById(idBtn).disabled = true
        document.getElementById(idBtn).classList.add("disableBtn")
       
    }
}

export default disableBtn