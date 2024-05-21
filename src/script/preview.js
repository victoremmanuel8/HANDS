const inputFile = document.querySelector('#picture__input');
const pictureImage = document.querySelector('.picture__image');


inputFile.addEventListener('change', function(e) {
    const inputTarget = e.target;
    console.log(inputTarget);
    const file = inputTarget.files[0];

    if(file) {
        pictureImage.innerHTML = 'image selected';
    } else {
        alert = "asdasdasdads";
    }
});