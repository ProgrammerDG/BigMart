// carousel

var carouselRightBtn = document.getElementById("carouselRightBtn");

carouselRightBtn.addEventListener("click", function () {
    var a = document.getElementById("carousel");
    var b = a.getAttribute("src");
    if (b == "images/carousel1.jpg") {
        a.setAttribute("src", "images/carousel2.jpg")
    } else if (b == "images/carousel2.jpg") {
        a.setAttribute("src", "images/carousel3.jpg")
    } else if (b == "images/carousel3.jpg") {
        a.setAttribute("src", "images/carousel4.jpg")
    } else if (b == "images/carousel4.jpg") {
        a.setAttribute("src", "images/carousel5.webp")
    } else if (b == "images/carousel5.webp") {
        a.setAttribute("src", "images/carousel6.png")
    } else {
        a.setAttribute("src", "images/carousel1.jpg")
    }
})

var carouselLefttBtn = document.getElementById("carouselLeftBtn");

carouselLeftBtn.addEventListener("click", function () {
    var a = document.getElementById("carousel");
    var b = a.getAttribute("src");
    if (b == "images/carousel1.jpg") {
        a.setAttribute("src", "images/carousel6.png")
    } else if (b == "images/carousel6.png") {
        a.setAttribute("src", "images/carousel5.webp")
    } else if (b == "images/carousel5.webp") {
        a.setAttribute("src", "images/carousel4.jpg")
    } else if (b == "images/carousel4.jpg") {
        a.setAttribute("src", "images/carousel3.jpg")
    } else if (b == "images/carousel3.jpg") {
        a.setAttribute("src", "images/carousel2.jpg")
    } else {
        a.setAttribute("src", "images/carousel1.jpg")
    }
})

// greetings

function greeting() {
    var a = document.getElementById("greetings");
    var b = new Date().getHours();
    if (b > 12 && b < 16) {
        a.innerText = "Good Afternoon!!";
    }
    else if (b > 15 && b <= 24) {
        a.innerText = "Good Evening!!";
    }
    else {
        a.innerText = "Good morning!!";
    }
    setTimeout(function () {
        document.getElementById("greetings").style.display = "none";
    }, 10000);
}

// cart section

function cartSection() {
    var a = document.getElementById("cartSection");
    if (a.style.display == "none") {
        a.style.display = "block";
    } else {
        a.style.display = "none";
    }
}

// game

document.getElementById("gameStartBtn").addEventListener("click", gameStart);

var discountPercent = 0;

function gameStart() {
    alert("Your game has been started. Good Luck!!")
    var card1 = document.getElementById("card1");
    var card2 = document.getElementById("card2");
    var card3 = document.getElementById("card3");

    var c1 = Math.round(1 + (12) * Math.random());
    var c2 = Math.round(1 + (12) * Math.random());
    var c3 = Math.round(1 + (12) * Math.random());
    var result = c1 + c2 + c3;
    if (result >= 20 && result <= 30) {
        discountPercent = 10;
        cartTotalDiscount = 10;
        document.getElementById("cartTotalDiscount").innerText = "Total Discount = " + discountPercent + "%";
    } else if (result > 30 && result < 39) {
        discountPercent = 15;
        cartTotalDiscount = 15;
        document.getElementById("cartTotalDiscount").innerText = "Total Discount = " + discountPercent + "%";
    } else if (result == 39) {
        discountPercent = 30;
        cartTotalDiscount = 30;
        document.getElementById("cartTotalDiscount").innerText = "Total Discount = " + discountPercent + "%";
    } else {
        discountPercent = 5;
        cartTotalDiscount = 5;
        document.getElementById("cartTotalDiscount").innerText = "Total Discount = " + discountPercent + "%";
    }

    card1.addEventListener("click", function () {
        card1.style.transform = "rotateY(180deg)";
        setTimeout(function () {
            card1.setAttribute("src", "images/card" + c1 + ".png");
        }, 1000)
        card1.removeEventListener("click");
    })
    card2.addEventListener("click", function () {
        card2.style.transform = "rotateY(180deg)";
        setTimeout(function () {
            card2.setAttribute("src", "images/card" + c2 + ".png");
        }, 1000)
        card2.removeEventListener("click");
    })
    card3.addEventListener("click", function () {
        card3.style.transform = "rotateY(180deg)";
        setTimeout(function () {
            card3.setAttribute("src", "images/card" + c3 + ".png");
        }, 1000)
        card3.removeEventListener("click");
    })

    document.getElementById("gameStartBtn").removeEventListener("click", gameStart);
    document.getElementById("gameStartBtnAbbr").setAttribute("title", "Already Played.")
}

// cart functunality

var cartTotalBill = 0;
var cartTotalDiscount = 0;
var cartTotalPayble = 0;

var cartList = [];
var cartCount = 0;

function cartAdd(name, price, pic) {
    var flag = true;
    for (var i of cartList) {
        if (i == name) {
            flag = false;
            alert("Already added to the cart.")
            break;
        }
    }
    if (flag) {
        var cartContainer = document.getElementById("cartContainer");
        cartList.push(name);
        cartCount++;
        document.getElementById("cartCount").innerText = cartCount;
        // alert(cartList);

        var a = document.createElement("div");
        a.setAttribute("class", "cartItems");
        a.setAttribute("id", name)

        var b = document.createElement("img");
        b.setAttribute("class", "cartImages");
        b.setAttribute("src", pic);
        a.appendChild(b);

        var c = document.createElement("p");
        var d = document.createTextNode(name);
        a.appendChild(d);
        a.appendChild(c);

        var e = document.createElement("p");
        var f = document.createTextNode(price);
        e.appendChild(f);
        a.appendChild(f);

        var g = document.createElement("button");
        var h = document.createTextNode("Remove");
        g.appendChild(h);
        g.setAttribute("class", "cartBtnStyles");
        g.onclick = function () {
            document.getElementById(name).remove();
            cartTotalBill = cartTotalBill - price;
            cartTotalPayble = Math.round(cartTotalBill - (cartTotalBill * cartTotalDiscount) / 100);
            cartTotalBillDiv.innerHTML = "Total Bill = &#8377; " + cartTotalBill;
            cartTotalPaybleDiv.innerHTML = "Please Pay = &#8377; " + cartTotalPayble;

            cartCount--;
            document.getElementById("cartCount").innerText = cartCount;

            for (var i = 0; i < cartList.length; i++) {
                if (cartList[i] == name) {
                    cartList.splice(i, 1);
                }
            }
            // alert(cartList);
        }
        a.appendChild(g);

        cartContainer.appendChild(a);

        cartTotalBill += price;
        cartTotalPayble = Math.round(cartTotalBill - (cartTotalBill * cartTotalDiscount) / 100);

        var cartTotalBillDiv = document.getElementById("cartTotalBill");
        var cartTotalPaybleDiv = document.getElementById("cartTotalPayble");

        cartTotalBillDiv.innerHTML = "Total Bill = &#8377; " + cartTotalBill;
        cartTotalPaybleDiv.innerHTML = "Please Pay = &#8377; " + cartTotalPayble;
    }
}
function cartRemoveAll() {
    var a = document.getElementById("cartContainer");
    a.innerHTML = "";
    cartTotalBill = 0;
    cartTotalPayble = 0;
    document.getElementById("cartTotalBill").innerHTML = "Total Bill = &#8377; " + cartTotalBill;
    document.getElementById("cartTotalPayble").innerHTML = "Please Pay = &#8377; " + cartTotalPayble;
    cartList.splice(0, cartList.length);

    cartCount = 0;
    document.getElementById("cartCount").innerText = cartCount;
    // alert(cartList);
}

function placeOrderFunc(){
    cartRemoveAll();
    alert("Your Order has been placed Successfully 👍. Thanks for Shopping with us 😁.")
}

// products sections hams

function electronicsHam() {
    var a = document.getElementById("eeNavbar");
    if (a.style.display == "none") {
        a.style.display = "block";
    } else {
        a.style.display = "none";
    }
}

function apparelsHam() {
    var a = document.getElementById("aaNavbar");
    if (a.style.display == "none") {
        a.style.display = "block";
    } else {
        a.style.display = "none";
    }
}

function footwearsHam() {
    var a = document.getElementById("ffNavbar");
    if (a.style.display == "none") {
        a.style.display = "block";
    } else {
        a.style.display = "none";
    }
}

function stationariesHam() {
    var a = document.getElementById("ssNavbar");
    if (a.style.display == "none") {
        a.style.display = "block";
    } else {
        a.style.display = "none";
    }
}

function accessoriesHam() {
    var a = document.getElementById("rrNavbar");
    if (a.style.display == "none") {
        a.style.display = "block";
    } else {
        a.style.display = "none";
    }
}

// dark mode

function darkMode(){
    var a = document.querySelector("body");
    var b = document.getElementById("linksToOtherPagesNames");
    var d = document.getElementById("gameTerms");
    if(a.style.backgroundColor=="white" && b.style.color=="black" && d.style.color=="black"){
        a.style.backgroundColor="#181818";
        b.style.color="white";
        d.style.color="aquamarine";
    }else{
        a.style.backgroundColor="white";
        b.style.color="black";
        d.style.color="black";
    }

}

// sections displays

function homeDisplay(){
    document.getElementById("homeSection").style.display="block";
    document.getElementById("electronicsSection").style.display="none";
    document.getElementById("apparelsSection").style.display="none";
    document.getElementById("footwearsSection").style.display="none";
    document.getElementById("stationariesSection").style.display="none";
    document.getElementById("accessoriesSection").style.display="none";
}

function electronicsDisplay(){
    document.getElementById("homeSection").style.display="none";
    document.getElementById("electronicsSection").style.display="block";
    document.getElementById("apparelsSection").style.display="none";
    document.getElementById("footwearsSection").style.display="none";
    document.getElementById("stationariesSection").style.display="none";
    document.getElementById("accessoriesSection").style.display="none";
}
function apparelsDisplay(){
    document.getElementById("homeSection").style.display="none";
    document.getElementById("electronicsSection").style.display="none";
    document.getElementById("apparelsSection").style.display="block";
    document.getElementById("footwearsSection").style.display="none";
    document.getElementById("stationariesSection").style.display="none";
    document.getElementById("accessoriesSection").style.display="none";
}
function footwearsDisplay(){
    document.getElementById("homeSection").style.display="none";
    document.getElementById("electronicsSection").style.display="none";
    document.getElementById("apparelsSection").style.display="none";
    document.getElementById("footwearsSection").style.display="block";
    document.getElementById("stationariesSection").style.display="none";
    document.getElementById("accessoriesSection").style.display="none";
}
function stationariesDisplay(){
    document.getElementById("homeSection").style.display="none";
    document.getElementById("electronicsSection").style.display="none";
    document.getElementById("apparelsSection").style.display="none";
    document.getElementById("footwearsSection").style.display="none";
    document.getElementById("stationariesSection").style.display="block";
    document.getElementById("accessoriesSection").style.display="none";
}
function accessoriesDisplay(){
    document.getElementById("homeSection").style.display="none";
    document.getElementById("electronicsSection").style.display="none";
    document.getElementById("apparelsSection").style.display="none";
    document.getElementById("footwearsSection").style.display="none";
    document.getElementById("stationariesSection").style.display="none";
    document.getElementById("accessoriesSection").style.display="block";
}
function allDisplay(){
    document.getElementById("homeSection").style.display="block";
    document.getElementById("electronicsSection").style.display="block";
    document.getElementById("apparelsSection").style.display="block";
    document.getElementById("footwearsSection").style.display="block";
    document.getElementById("stationariesSection").style.display="block";
    document.getElementById("accessoriesSection").style.display="block";
}

// search input functionality

document.getElementById("search").addEventListener("keyup", searchLowerCase);
document.getElementById("search").addEventListener("click", searchClear);


function searchLowerCase(){
    var a = document.getElementById("search");
    a.value = a.value.toLowerCase();
}

function searchClear(){
    var a = document.getElementById("search");
    a.value="";
    a.style.color="black";
}

// search button functionality

function searchBtnAction(){
    var a = document.getElementById("search");
    if(a.value=="electronics" || a.value=="mobiles" || a.value=="laptops" || a.value=="televisions" || a.value=="watches" || a.value=="electronic" || a.value=="mobile" || a.value=="laptop" || a.value=="television" || a.value=="watch"){
        electronicsDisplay();
    }else if(a.value=="apparels" || a.value=="shirts" || a.value=="jeans" || a.value=="sweatshirts" || a.value=="tshirts" || a.value=="apparel" || a.value=="shirt" || a.value=="jean" || a.value=="sweatshirt" || a.value=="tshirt"){
        apparelsDisplay();
    }else if(a.value=="footwears" || a.value=="shoes" || a.value=="slippers" || a.value=="heels" || a.value=="sandals" || a.value=="footwear" || a.value=="shoe" || a.value=="slipper" || a.value=="heel" || a.value=="sandal"){
        footwearsDisplay();
    }else if(a.value=="stationaries" || a.value=="pens" || a.value=="books" || a.value=="registers" || a.value=="colors" || a.value=="stationary" || a.value=="pen" || a.value=="book" || a.value=="register" || a.value=="color"){
        stationariesDisplay();
    }else if(a.value=="accessories" || a.value=="belts" || a.value=="perfumes" || a.value=="wallets" || a.value=="bracelets" || a.value=="accessory" || a.value=="belt" || a.value=="perfume" || a.value=="wallet" || a.value=="bracelet"){
        accessoriesDisplay();
    }else{
        a.value = "No Match Found!";
        a.style.color="red";
    }
}