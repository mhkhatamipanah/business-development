const enableBtn = (idBtn)=>{
    if(document.getElementById(idBtn)){
        document.getElementById(idBtn).disabled = false
        if( document.getElementById(idBtn).classList.contains("disableBtn")){
            document.getElementById(idBtn).classList.remove("disableBtn")
        }
    }
}

export default enableBtn