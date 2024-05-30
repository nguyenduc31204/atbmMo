const chuyen = document.querySelector(".chuyen");
const taokhoa = document.querySelector("#taokhoa");
const ky = document.querySelector("#btnky");
const ktra = document.querySelector("#btnktra");
const fileInput = document.getElementById('file1');
// const textArea = document.getElementById('inpk');
const textArea = document.getElementById('inputky');
const fileInput2 = document.getElementById('file2');
const textArea2 = document.getElementById('inputktra');
const fileInput3 = document.getElementById('fileck');
const textArea3 = document.getElementById('vanbanky');
const textArea4 = document.getElementById('vanbanktra');
const textArea5 = document.getElementById('anktra');
const downloadButton = document.querySelector('.download');



 fileInput.addEventListener('change', function(event) {
    console.log(fileInput.type);
            const reader = new FileReader();
            reader.onload = function(e) {
                const arrayBuffer = e.target.result;
                mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
                    .then(function(result) {
                        document.getElementById('inputky').value = result.value.replace(/<\/?[^>]+(>|$)/g, "");
                    })
                    .catch(function(err) {
                        console.error('Error reading DOCX file:', err);
                        document.getElementById('inputky').value = 'Error reading DOCX file.';
                    });
            };
            reader.readAsArrayBuffer(event.target.files[0]);
    
});

fileInput2.addEventListener('change', function(event) {
    console.log(fileInput.type);
            const reader = new FileReader();
            reader.onload = function(e) {
                const arrayBuffer = e.target.result;
                mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
                    .then(function(result) {
                        document.getElementById('inputktra').value = result.value.replace(/<\/?[^>]+(>|$)/g, "");
                    })
                    .catch(function(err) {
                        console.error('Error reading DOCX file:', err);
                        document.getElementById('inputktra').value = 'Error reading DOCX file.';
                    });
            };
            reader.readAsArrayBuffer(event.target.files[0]);
    
});


//download
downloadButton.addEventListener('click', async () => {
    const fileType = 'txt'; // Loại tệp bạn muốn lưu, ví dụ: 'docx' hoặc 'txt'

const content = document.getElementById('anky').innerHTML;

try {
    // Tạo một Blob từ nội dung
    const blob = new Blob([content], {
        type: fileType === 'docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'text/plain;charset=utf-8'
    });

    // Mở hộp thoại lưu file với options chọn kiểu file
    const handle = await window.showSaveFilePicker({
        suggestedName: `chuky.${fileType}`,
        types: [
            {
                description: 'Text Files',
                accept: {
                    'text/plain': ['.txt']
                }
            },
            {
                description: 'Word Documents',
                accept: {
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
                }
            }
        ]
    });

    // Tạo một file stream để ghi dữ liệu
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
} catch (err) {
    console.error('Lỗi khi lưu file:', err);
}

});



function isTxtFile(file) {
    return file.name.toLowerCase().endsWith('.txt');
}
  
fileInput.addEventListener('change', (event) => {
    if(isTxtFile(event.target.files[0])){
        const reader = new FileReader();
  
        reader.onload = (e) => {
          textArea.value = e.target.result;
        };
      
        reader.readAsText(event.target.files[0]);
    }
    
  });
  
  
  
  
  fileInput2.addEventListener('change', (event) => {
    if(isTxtFile(event.target.files[0])){
        const reader = new FileReader();
  
        reader.onload = (e) => {
          textArea2.value = e.target.result;
        };
      
        reader.readAsText(event.target.files[0]);
    }
    
  });
  
  function getValueAfterColon(input, key) {
    // Tạo biểu thức chính quy để tìm cặp key: value
    const regex = new RegExp(`${key}:\\s*([^\\s]+)`);
    const match = input.match(regex);
    return match ? match[1] : null;
  }

  fileInput3.addEventListener('change', (event) => {
      const reader = new FileReader();
      reader.onload = (e) => {
            textArea5.innerHTML = e.target.result;
            const valueGama = getValueAfterColon(e.target.result, 'gama');
            const valueXicma = getValueAfterColon(e.target.result, 'xicma');
            textArea4.value = valueXicma;
            console.log(textArea4.value);
      };
      reader.readAsText(event.target.files[0]);
    });
  


//KIỂM TRA PRIME
function checkPri(num){
    if(num < 2) return false;
    for(let i = 2; i <= Math.sqrt(num); i++){
        if(num % i == 0){
            return false;
        }
    }
    return true;
};

chuyen.addEventListener('click', function () {  
console.log(document.querySelector("#anky").innerHTML);
    document.querySelector("#anktra").innerHTML = document.querySelector("#anky").innerHTML;
    document.querySelector("#vanbanktra").value = document.querySelector("#xicma").value;
    document.querySelector("#inputktra").value = document.querySelector("#inputky").value;
    console.log
});


//KIỂM TRA GCD
function gCD(p, k) {  
    let du = 1;
    while(du != 0){
        du = p % k;
        p = k;
        k = du;
    }
    return p;
};

// RANDOM KHÓA K
taokhoa.addEventListener("click", function(){
    let alpha = Math.floor(Math.random() * 100000000);
    document.querySelector("#anpha").value = alpha;
    var sp = Math.floor(Math.random() * 100000000);
    var sk = Math.floor(Math.random() * 100000000);
    while(!checkPri(sp)){
        sp = Math.floor(Math.random() * 100000000);
    }
    document.querySelector("#p").value = sp;
    while(gCD(sk, (sp - 1)) != 1){
        sk = Math.floor(Math.random() * sp) - 2;
    }
    var sa = Math.floor(Math.random() * sp) - 2;
    document.querySelector("#a").value = sa;
    document.querySelector("#k").value = sk;
    var result = binhPhuongVoiNhan(sa, alpha, sp);
    document.getElementById('beta').value = result;
});


function binhPhuongVoiNhan(num, x, y) {
    const tinh = num.toString(2);
    let p = 1;
    for(let i = 0; i < tinh.length; i++){
        p = (p * p) % y;
        if(tinh[i] == 1){
            p = p * x;
            p = p % y;
        }
    }
    return p;
};

//OCLIT
function oClit (k, p) {
    let ri = p;
    let rin = k;
    let tst = 0, ts = 1;
    let tin;
    let tmp;
    let gtmp;
    while(rin > 1){
        tin = tst - ts*Math.floor(ri / rin);
        tmp = rin;
        rin = ri - rin*Math.floor(ri / rin);
        ri = tmp;
        gtmp = ts;
        ts = tin;
        tst = gtmp;
    }
    if(tin < 0){
        tin = tin + p;
    }
    return tin;
};


ky.addEventListener('click', function () { 
    var m = document.querySelector("#inputky").value; 
    tinhXicma(m);
});

//TÍNH XICMA

function tinhXicma(x){

    const soAlpha = parseInt(document.querySelector("#anpha").value);
    const soA = parseInt(document.querySelector("#a").value);
    const soK = parseInt(document.querySelector("#k").value);
    const soP = parseInt(document.querySelector("#p").value);   

    const res = oClit(soK, (soP - 1)); 
    const gama = binhPhuongVoiNhan(soK, soAlpha, soP);

    document.querySelector("#gama").value = gama;
    var cky = [];
    const hash = CryptoJS.MD5(x).toString(CryptoJS.enc.Hex);
    document.querySelector("#vbBamKy").innerHTML = hash;
    var hash1 = [];
    let n = 0;
    for(let i = 0; i < 4; i++){
        hash1.push(hash.slice(n, n + 8));
        n += 8;
    }
    for(let i = 0; i< 4; i++){
        console.log(parseInt(hash1[i], 16));
    }
    for(let i = 0; i < hash1.length; i++){
        let res2 = (parseInt(hash1[i], 16) - soA * gama) % (soP - 1);
        let result = ((res2*res) % (soP - 1));
        if(result < 0){
            result = result + (soP - 1);
        };
        cky.push(result); 
    }
    var s = cky;
    var t = cky.map( item =>item.toString()).join(',');
    document.querySelector("#xicma").value = t;
    document.querySelector("#vanbanky").innerHTML = t;
    document.querySelector("#anky").innerHTML ="gama:" + gama + "\nxicma:" +  s;
};



ktra.addEventListener('click', function () {  
    var x = document.querySelector("#inputktra").value; 
    ktrak(x);
});


function ktrak(x) {
    const soAlpha = parseInt(document.querySelector("#anpha").value);
    const soA = parseInt(document.querySelector("#a").value);
    const soP = parseInt(document.querySelector("#p").value);

    const beta = binhPhuongVoiNhan(soA, soAlpha, soP);
    const gama = parseInt(document.querySelector("#gama").value);
    const xicma = document.querySelector("#vanbanktra").value;
    const ckyg = document.querySelector("#vanbanky").innerHTML;
    console.log(ckyg);
    console.log(xicma);
    var checkKy = false;
    if(ckyg == xicma){
        checkKy = true;
    };
    const vb = document.querySelector("#inputky").value;
    const hashky = CryptoJS.MD5(vb).toString(CryptoJS.enc.Hex);
    const hash = CryptoJS.MD5(x).toString(CryptoJS.enc.Hex);
    if(!checkKy){
        document.querySelector("#vbBamKtra").innerHTML = hash;
        document.querySelector("#thongbao").innerHTML = "chữ ký sai";
        if(hash ==hashky){
            document.querySelector("#thongbao").innerHTML += "\n-Văn bản chưa bị sửa đổi!";
        }
        else{
            document.querySelector("#thongbao").innerHTML += "\n-Văn bản đã bị sửa đổi!";
        }
        return;
    }

    var xicm = [];
    xicm = xicma.split(",");
    var end1= [];
    var end2= [];
    
    document.querySelector("#vbBamKtra").innerHTML = hash;
    var hash1 = [];
    let n = 0;
    for(let i = 0; i < 4; i++){
        hash1.push(hash.slice(n, n + 8));
        n += 8;
    }

    for(let i = 0; i < hash1.length; i++){
        var and1 = binhPhuongVoiNhan(gama, beta, soP);
        var and2 = binhPhuongVoiNhan(parseInt(xicm[i]), gama, soP);
        let v1 = (and1 * and2) % soP;
        end1.push(v1);
        let v2 = binhPhuongVoiNhan(parseInt(hash1[i], 16), soAlpha , soP);
        end2.push(v2);
    };

    let check = true;
    for(let i = 0; i < 4; i++){
        if(end1[i] != end2[i]){
            check = false;
        }
    }
    document.querySelector("#thongbao").innerHTML = "Chữ ký đúng";
    if(check){ 
        document.querySelector("#thongbao").innerHTML += "\n-Văn bản chưa bị sửa đổi";
    }
    else{
        document.querySelector("#thongbao").innerHTML += "\n-Văn bản đã bị sửa đổi"
    } 
};
