window.payController = function ($scope, $http) {
    let apiUrl = "http://localhost:3000/ThanhToan";
    $scope.getData = function () {
        $http.get(apiUrl).then(function (response) {
            if (response.status == 200) {
                $scope.danhsach = response.data;
            }
        });
    };
    $scope.getData();
    $scope.onClose = function () {
        $scope.inputValue = {
            name: "",
            birth: "",
            cccd: "",
            phone: "",
            email: "",
        };
        $scope.editId = 0;
    };

    $scope.thanhToan = function () {
        $scope.submitted = true;
        if (!$scope.inputValue || !$scope.inputValue.name) {
            document.getElementById("input-name").focus();
            return false;
        }
        if (
            !$scope.inputValue ||
            !$scope.inputValue.birth ||
            !/^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-9]{4}$/.test(
                $scope.inputValue.birth
            )
        ) {
            document.getElementById("date").focus();
            return false;
        }
        if (
            !$scope.inputValue ||
            !$scope.inputValue.cccd ||
            !/^[0-9]{12}$/.test($scope.inputValue.cccd)
        ) {
            document.getElementById("national_id").focus();
            return false;
        }

        if (
            !$scope.inputValue ||
            !$scope.inputValue.phone ||
            !/^[0-9]{10}$/.test($scope.inputValue.phone)
        ) {
            document.getElementById("phone").focus();
            return false;
        }
        if (
            !$scope.inputValue ||
            !$scope.inputValue.email ||
            !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
                $scope.inputValue.email
            )
        ) {
            document.getElementById("email").focus();
            return false;
        }
        if (!$scope.selectValue || !$scope.selectValue.pay) {
            document.getElementById("floatingSelect").focus();
        }
        if ($scope.submitted) {
            let editId = $scope.editId;
            if (editId) {
                let updateItem = {
                    name: $scope.inputValue.name,
                    birth: $scope.inputValue.birth,
                    cccd: $scope.inputValue.cccd,
                    phone: $scope.inputValue.phone,
                    email: $scope.inputValue.email,
                    pay: $scope.selectValue.pay,
                };
                $http
                    .put(
                        `${apiUrl}/${editId}`, //đường dẫn url sửa theo id
                        updateItem //
                    )
                    .then(function (response) {
                        if (response.status == 200) {
                            //gọi lại hàm getData để call lại dữ liệu mới nhất
                            // từ json server về
                            $scope.getData();
                        }
                    });
                $scope.onClose();
                return;
            }
            let newItem = {
                // id: newId, API sẽ tự tăng id
                name: $scope.inputValue.name,
                birth: $scope.inputValue.birth,
                cccd: $scope.inputValue.cccd,
                phone: $scope.inputValue.phone,
                email: $scope.inputValue.email,
                pay: $scope.selectValue.pay,
            };
            // xử lý thêm với api
            $http
                .post(
                    apiUrl, // đường dẫn API
                    newItem // dữ liệu thêm mới
                )
                .then(function (response) {
                    $scope.getData();
                });
            $scope.onClose();
            //sua
        }
    };

    $scope.onEdit = function (editId) {
        $scope.editId = editId;
        $http.get(`${apiUrl}/${editId}`).then(function (response) {
            if (response.status == 200) {
                $scope.inputValue = {
                    name: response.data.name,
                    birth: response.data.birth,
                    cccd: response.data.cccd,
                    phone: response.data.phone,
                    email: response.data.email,
                };
                $scope.selectValue = {
                    pay: response.data.pay,
                };
            }
        });
    };
    $scope.onDelete = function (deleteId) {
        let confirm = window.confirm("Bạn có muốn xóa không");
        if (confirm) {
            $scope.deleteId = deleteId;
            $http.delete(`${apiUrl}/${deleteId}`).then(function (response) {
                if (response.status == 200) {
                    $scope.getData();
                }
            });
        }
    };
};