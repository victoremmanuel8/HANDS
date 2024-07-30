function keys(e) {
  let charCode = e.charCode ? e.charCode : e.keyCode;
  // Se for letra maiúscula ou minúscula permite a entrada
  if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || (charCode == 32)) {
    return true;
  } 
  else {
    return false;
  }
}
