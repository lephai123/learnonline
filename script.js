const links = document.querySelectorAll("nav ul li a");

// Duyệt qua các link và thêm sự kiện click vào mỗi link
links.forEach((link) => {
  link.addEventListener("click", function () {
    // Loại bỏ class active từ tất cả các link
    links.forEach((link) => {
      link.classList.remove("active");
    });

    // Thêm class active vào link được click
    this.classList.add("active");
  });
});

// Thêm class active vào link đầu tiên khi trang được tải
links[0].classList.add("active");

function showpay() {
  var selectValue = document.getElementById("floatingSelect").value;
  if (selectValue == "1") {
    document.getElementById("pay_visa").style.display = "block";
  } else {
    document.getElementById("pay_visa").style.display = "none";
  }
  if (selectValue == "2") {
    document.getElementById("eBanking").style.display = "block";
  } else {
    document.getElementById("eBanking").style.display = "none";
  }
}

angular.module("app-route", ["ngRoute"]).config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "views/home.html",
      controller: "",
    })
    .when("/product", {
      templateUrl: "views/product.html",
      controller: "",
    })
    .when("/pay", {
      templateUrl: "views/pay.html",
      controller: payController,
    });
});
